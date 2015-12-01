/* @flow */
import React from "react";

type Dispatcher = any; //TODO

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
 * //TODO
 */
export function addStoreState(Componet: ReactClass<any, any, any>): ReactClass<any, any, any> {
	const AddStoreState = React.createClass({
		render(): ReactElement {
			//TODO
			return <Componet {...this.props} />;
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
