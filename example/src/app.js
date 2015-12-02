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
		const Wrapper = useDispatcher('div', this.props.dispatcher);
		const Title = addStoreState(SomeStoresComponent, ['storeA', 'storeB']);
		const Summary = addStoreState(CustomPropsComponent, ['storeC'], (states) => {
			const { value, count } = states.storeC;
			return {
				summary: `Store ${value} w/ count=${count}`
			};
		});
		const ClickCount = addStoreState(AllStoresComponent);
		const Clicker = addDispatch(DispatchComponent);

		return (
			<Wrapper>
				<Title />
				<Summary />
				<table>
					<tbody>
						<tr>
							<td><ClickCount /></td>
							<td><Clicker /></td>
						</tr>
					</tbody>
				</table>
			</Wrapper>
		);
	}
});

export default App;

/*------------------------------------------------------------------------------------------------*/
//	--- Some Stores Component ---
/*------------------------------------------------------------------------------------------------*/
const SomeStoresComponent  = React.createClass({
	render(): ReactElement {
		//TODO
		return <div>SomeStoresComponent</div>;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- All Stores Component ---
/*------------------------------------------------------------------------------------------------*/
const AllStoresComponent  = React.createClass({
	render(): ReactElement {
		//TODO
		return <div>AllStoresComponent</div>;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- Custom Props Component ---
/*------------------------------------------------------------------------------------------------*/
const CustomPropsComponent  = React.createClass({
	render(): ReactElement {
		//TODO
		return <div>CustomPropsComponent</div>;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- Dispatch Component ---
/*------------------------------------------------------------------------------------------------*/
const DispatchComponent  = React.createClass({
	render(): ReactElement {
		//TODO
		return <div>DispatchComponent</div>;
	}
});