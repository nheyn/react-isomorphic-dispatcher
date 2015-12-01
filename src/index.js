/* @flow */
import React from "react";

type Dispatcher = any; //TODO

/*------------------------------------------------------------------------------------------------*/
//	--- Use Dispatcher Higher-Order Componet ---
/*------------------------------------------------------------------------------------------------*/
/**
 * //TODO
 */
export function useDispatcher(
	Componet:	ReactClass<any, any, any>,
	dispatcher:	Dispatcher
):				ReactClass<any, any, any> {
	const UseDispatcher = React.createClass({
		render(): ReactElement {
			//TODO
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
