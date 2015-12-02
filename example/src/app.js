/* @flow */
import React from 'react';
import { useDispatcher, addStoreState, addDispatch } from 'react-isomorphic-dispatcher';

/*------------------------------------------------------------------------------------------------*/
//	--- App Component ---
/*------------------------------------------------------------------------------------------------*/
const App = React.createClass({
	propTypes: {
		dispatcher: React.PropTypes.object.isRequired
	},
	render(): ReactElement {
		const Div = useDispatcher('div', this.props.dispatcher);

		return <Div>App - NYI</Div>;
	}
});

export default App;

/*------------------------------------------------------------------------------------------------*/
//	--- Some Stores Component ---
/*------------------------------------------------------------------------------------------------*/
const SomeStoresComponent = React.createClass({
	render(): ReactElement {
		//TODO
		return <div />;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- All Stores Component ---
/*------------------------------------------------------------------------------------------------*/
const AllStoresComponent = React.createClass({
	render(): ReactElement {
		//TODO
		return <div />;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- Custom Props Component ---
/*------------------------------------------------------------------------------------------------*/
const CustomPropsComponent = React.createClass({
	render(): ReactElement {
		//TODO
		return <div />;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- Dispatch Component ---
/*------------------------------------------------------------------------------------------------*/
const DispatchComponent = React.createClass({
	render(): ReactElement {
		//TODO
		return <div />;
	}
});