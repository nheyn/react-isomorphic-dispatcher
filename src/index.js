/* @flow */
import React from "react";

type DispatcherState = any;
type DispatcherStates = {[key: string]: DispatcherState};
type DispacherAction = any;

/*--------------------------------------------------------------------------------------------------------------------*/
//  --- Use Dispatcher Higher-Order Component ---
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Create a higher-order Component that puts a dispatcher in the context.
 *
 * @param Component    The Component to start adding the dispatcher to the context at
 * @param dispatcher  The dispatcher to add to the context
 *
 * @return        The new Component
 */
export function useDispatcher(Component: ReactClass, dispatcher: Dispatcher): ReactClass {
  const UseDispatcher = React.createClass({
    childContextTypes: {
      dispatcher: React.PropTypes.object.isRequired
    },
    getChildContext(): any {
      return { dispatcher };
    },
    render(): React.Element {
      return <Component {...this.props} />;
    }
  });

  return UseDispatcher;
}

/**
 * Create a higher-order Component that will add that state of the dispatcher (added with 'useDispatcher') to the props
 * of the given Component.
 *
 * @param Component      The Component to add the states to
 * @param [storeNames]    The names of the stores to get the state of
 * @param [storesToProps]  A function that takes the states and returns the props to add
 * @param [loadActions]    Actions to dispatch when the Component is mounted
 *
 * @return          The Component with the states added
 */
export function addStoreState(
  Component:      ReactClass,
  storeNameArg?:  ?(string | Array<string>),
  storesToProps?: ?(states: DispatcherStates) => any,
  loadActions?:   Array<DispacherAction>
):                ReactClass {
  // Get storeNameArg as an ?Array
  const storeNames = storeNameArg?
            (Array.isArray(storeNameArg)? storeNameArg: [storeNameArg]):
            null;

  const AddStoreState = React.createClass({
    contextTypes: {
      dispatcher: React.PropTypes.object.isRequired
    },
    getInitialState(): any {
      return { storeStates: this.getStoreStates() };
    },
    getStoreStates(): Object {
      const { dispatcher } = this.context;

      //Get states from the correct stores
      let states = {};
      if(storeNames) {
        storeNames.forEach((storeName) => {
          states[storeName] = dispatcher.getStateFor(storeName);
        });
      }
      else {
        states = dispatcher.getStateForAll();
      }

      // Combine update
      return storesToProps? storesToProps(states): states;
    },
    componentDidMount() {
      const { dispatcher } = this.context;

      if(storeNames) {
        //Subscribe to given stores in the dispatcher
        let unsubscribeFuncs = [];
        storeNames.forEach((storeName) => {
          const unsubscribe = dispatcher.subscribeTo(storeName, () => {
            this.setState({ storeStates: this.getStoreStates() });
          });
          unsubscribeFuncs.push(unsubscribe);
        });

        this.setState({
          unsubscribe: () => unsubscribeFuncs.forEach((unsubscribe) => unsubscribe())
        });
      }
      else {
        // Subscribe to all of the stores
        const unsubscribe = dispatcher.subscribeToAll(() => {
          this.setState({ storeStates: this.getStoreStates() });
        });
        this.setState({ unsubscribe });
      }

      // Load data
      if(loadActions && loadActions.length > 0) {
        // Perform each action in order (wait for last one to finish before next dispatch)
        loadActions.reduce(
          (currPromise, action) => currPromise.then(() => dispatcher.dispatch(action)),
          Promise.resolve(true)
        );
      }
    },
    componentWillUnmount() {
      if(!this.state.unsubscribe) return;
      this.state.unsubscribe();

      this.setState({ unsubscribe: null })
    },
    render(): React.Element {
      return <Component {...this.state.storeStates} {...this.props} />;
    }
  });

  return AddStoreState;
}

/**
 * Create a higher-order Component that will add that dispatch function of the to the props of the given Component.
 *
 * @param Component      The Component to add the dispatch function to
 *
 * @return          The Component with the dispatch function
 */
export function addDispatch(Component: ReactClass): ReactClass {
  const AddDispatch = React.createClass({
    contextTypes: {
      dispatcher: React.PropTypes.object.isRequired
    },
    render(): React.Element {
      return (
        <Component dispatch={(action) => this.context.dispatcher.dispatch(action)} {...this.props} />
      );
    }
  });

  return AddDispatch;
}
