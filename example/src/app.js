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
				summary: `Store ${value}${count? ` w/ count=${count}`: ''}`
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

const StorePropType = React.PropTypes.shape({
	value: React.PropTypes.string.isRequired,
	count: React.PropTypes.number
});

/*------------------------------------------------------------------------------------------------*/
//	--- Some Stores Component ---
/*------------------------------------------------------------------------------------------------*/
const SomeStoresComponent  = React.createClass({
	propTypes: {
		storeA: StorePropType.isRequired,
		storeB: StorePropType.isRequired
	},
	render(): ReactElement {
		//TODO
		console.log('SomeStoresComponent.props=', this.props);``
		return <div>SomeStoresComponent</div>;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- All Stores Component ---
/*------------------------------------------------------------------------------------------------*/
const AllStoresComponent  = React.createClass({
	propTypes: {
		summary: React.PropTypes.string.isRequired
	},
	render(): ReactElement {
		//TODO
		console.log('AllStoresComponent.props=', this.props);``
		return <div>AllStoresComponent</div>;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- Custom Props Component ---
/*------------------------------------------------------------------------------------------------*/
const CustomPropsComponent  = React.createClass({
	propTypes: {
		storeA: StorePropType.isRequired,
		storeB: StorePropType.isRequired,
		storeC: StorePropType.isRequired
	},
	render(): ReactElement {
		//TODO
		console.log('CustomPropsComponent.props=', this.props);``
		return <div>CustomPropsComponent</div>;
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- Dispatch Component ---
/*------------------------------------------------------------------------------------------------*/
const DispatchComponent  = React.createClass({
	propTypes: {
		dispatch: React.PropTypes.func.isRequired
	},
	render(): ReactElement {
		//TODO
		console.log('DispatchComponent.props=', this.props);``
		return <div>DispatchComponent</div>;
	}
});