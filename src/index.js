/* @flow */
import React from "react";

type Dispatcher = any; //TODO
type DispatcherState = any;
type DispatcherStates = {[key: string]: DispatcherState};
type DispacherAction = any;

/*------------------------------------------------------------------------------------------------*/
//	--- Use Dispatcher Higher-Order Componet ---
/*------------------------------------------------------------------------------------------------*/
/**
 * Create a higher-order Componet that puts a dispatcher in the context.
 *
 * @param Componet		The Componet to start adding the dispatcher to the context at
 * @param dispatcher	The dispatcher to add to the context
 *
 * @return				The new Componet
 */
export function useDispatcher(
	Componet:	ReactClass<any, any, any>,
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
			return <Componet {...this.props} />;
		}
	});

	return UseDispatcher;
}

/**
 * Create a higher-order Componet that will add that state of the dispatcher (added with
 * 'useDispatcher') to the props of the given Componet.
 *
 * @param Componet			The Componet to add the states to
 * @param [storeNames]		The names of the stores to get the state of
 * @param [storesToProps]	A function that takes the states and returns the props to add
 * @param [loadActions]		Actions to dispatch when the componet is mounted
 *
 * @return					The Componet with the states added
 */
export function addStoreState(
	Componet:		ReactClass<any, any, any>,
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
			return <Componet {...this.state.storeStates} {...this.props} />;
		},
		getStoreStates(currStoreStates: any = {}): any {
			//Get states from the correct stores
			let states = {};
			if(storeNames) {
				storeNames.forEach((storeName) => {
					states[storeName] = this.context.dispatcher.getStatesFor(storeName);
				});
			}
			else {
				states = this.context.dispatcher.getStatesForAll();;
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
 * Create a higher-order Componet that will add that dispatch function of the dispatcher (added with
 * 'useDispatcher') to the props of the given Componet.
 *
 * @param Componet			The Componet to add the dispatch function to
 *
 * @return					The Componet with the dispatch function
 */
export function addDispatch(Componet: ReactClass<any, any, any>): ReactClass<any, any, any> {
	const AddDispatch = React.createClass({
		contextTypes: {
			dispatcher: React.PropTypes.object.isRequired
		},
		render(): ReactElement {
			return (
				<Componet
					dispatch={(action) => this.context.dispatcher.dispatch(action)}
					{...this.props}
				/>
			);
		}
	});

	return AddDispatch;
}
