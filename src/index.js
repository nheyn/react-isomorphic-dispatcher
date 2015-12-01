/* @flow */
import React from "react";

type Dispatcher = any; //TODO
type DispatcherState = any;
type DispatcherStates = {[key: string]: DispatcherState};

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
 * @param [storesToProps]	A function that takes the states and returns the props to add
 *
 * @return					The Componet with the states added
 */
export function addStoreState(
	Componet:		ReactClass<any, any, any>,
	storesToProps?:	(states: DispatcherStates) => any
):					ReactClass<any, any, any> {
	const AddStoreState = React.createClass({
		contextTypes: {
			dispatcher: React.PropTypes.object.isRequired
		},
		render(): ReactElement {
			const storeStates = this.getStoreStates();	//TODO, change to state (to be updated)

			return <Componet {...storeStates} {...this.props} />;
		},
		getStoreStates(): any {
			const states = this.context.dispatcher.getStatesForAll();

			return storesToProps? storesToProps(states): states;
		}
	});

	return AddStoreState;
}

/**
 * //TODO
 */
export function addDispatch(Componet: ReactClass<any, any, any>): ReactClass<any, any, any> {
	const AddDispatch = React.createClass({
		render(): ReactElement {
			//TODO
			return <Componet {...this.props} />;
		}
	});

	return AddDispatch;
}
