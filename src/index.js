/* @flow */
import React from "react";

type Dispatcher = any; //TODO
type DispatcherState = any;
type DispatcherStates = {[key: string]: DispatcherState};
type DispacherAction = any;

/*------------------------------------------------------------------------------------------------*/
//	--- Use Dispatcher Higher-Order Component ---
/*------------------------------------------------------------------------------------------------*/
/**
 * Create a higher-order Component that puts a dispatcher in the context.
 *
 * @param Component		The Component to start adding the dispatcher to the context at
 * @param dispatcher	The dispatcher to add to the context
 *
 * @return				The new Component
 */
export function useDispatcher(
	Component:	ReactClass<any, any, any>,
	dispatcher:	Dispatcher
):				ReactClass<any, any, any> {
	const UseDispatcher = React.createClass({
		childContextTypes: {
			dispatcher: React.PropTypes.object.isRequired
		},
		getChildContext(): any {
			return { dispatcher };
		},
		render(): ReactElement {
			return <Component {...this.props} />;
		}
	});

	return UseDispatcher;
}

/**
 * Create a higher-order Component that will add that state of the dispatcher (added with
 * 'useDispatcher') to the props of the given Component.
 *
 * @param Component			The Component to add the states to
 * @param [storeNames]		The names of the stores to get the state of
 * @param [storesToProps]	A function that takes the states and returns the props to add
 * @param [loadActions]		Actions to dispatch when the Component is mounted
 *
 * @return					The Component with the states added
 */
export function addStoreState(
	Component:		ReactClass<any, any, any>,
	storeNames?:	?Array<string>,
	storesToProps?:	?(states: DispatcherStates) => any,
	loadActions?:	Array<DispacherAction>
):					ReactClass<any, any, any> {
	const AddStoreState = React.createClass({
		contextTypes: {
			dispatcher: React.PropTypes.object.isRequired
		},
		getInitialState(): any {
			return {
				storeStates: this.getStoreStates()
			};
		},
		componentDidMount() {
			if(storeNames) {
				//Subscribe to given stores in the dispatcher
				let unsubscribeFuncs = [];
				storeNames.forEach((storeName) => {
					const unsubscribe = this.context.dispatcher.subscribeTo(storeName, () => {
						this.setState((currState) => {
							storeStates: this.getStoreStates(currState.storeStates)
						});
					});
					unsubscribeFuncs.push(unsubscribe);
				});

				this.setState({
					unsubscribe: () => unsubscribeFuncs.forEach((unsubscribe) => unsubscribe())
				});
			}
			else {
				// Subscribe to all of the stores
				const unsubscribe = this.context.dispatcher.subscribeToAll(() => {
					this.setState((currState) => {
						storeStates: this.getStoreStates(currState.storeStates)
					});
				});
				this.setState({ unsubscribe });
			}

			// Load data
			if(loadActions && loadActions.length >= 1) {
				loadActions.forEach((action) => {
					this.context.dispatcher.dispatch(action);
				});
			}
		},
		componentWillUnmount() {
			if(!this.state.unsubscribe) return;
			this.state.unsubscribe();

			this.setState({ unsubscribe: null })
		},
		render(): ReactElement {
			return <Component {...this.state.storeStates} {...this.props} />;
		},
		getStoreStates(currStoreStates: any = {}): any {
			//ERROR, this is the method that is (probably) not working
			//Get states from the correct stores
			let states = {};
			if(storeNames) {
				storeNames.forEach((storeName) => {
					states[storeName] = this.context.dispatcher.getStateFor(storeName);
				});
			}
			else {
				states = this.context.dispatcher.getStateForAll();;
			}

			// Compbine update
			return Object.assign({},
				currStoreStates,
				storesToProps? storesToProps(states): states
			);
		}
	});

	return AddStoreState;
}

/**
 * Create a higher-order Component that will add that dispatch function of the dispatcher (added
 * with 'useDispatcher') to the props of the given Component.
 *
 * @param Component			The Component to add the dispatch function to
 *
 * @return					The Component with the dispatch function
 */
export function addDispatch(Component: ReactClass<any, any, any>): ReactClass<any, any, any> {
	const AddDispatch = React.createClass({
		contextTypes: {
			dispatcher: React.PropTypes.object.isRequired
		},
		render(): ReactElement {
			return (
				<Component
					dispatch={(action) => this.context.dispatcher.dispatch(action)}
					{...this.props}
				/>
			);
		}
	});

	return AddDispatch;
}
