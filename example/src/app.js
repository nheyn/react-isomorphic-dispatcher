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
		return (
			<h2>
				Some Title
				[storeA.value={this.props.storeA.value}]
				[storeB.value={this.props.storeA.value}]
			</h2>
		);
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- All Stores Component ---
/*------------------------------------------------------------------------------------------------*/
const AllStoresComponent  = React.createClass({
	propTypes: {
		storeA: StorePropType.isRequired,
		storeB: StorePropType.isRequired,
		storeC: StorePropType.isRequired
	},
	render(): ReactElement {
		const counts = this.getCounts();
		return (
			<div>
			{counts.a?
				<div>
					<label>Store A</label>
					<span>{counts.a}</span>
				</div>:
				null
			}
			{counts.b?
				<div>
					<label>Store B</label>
					<span>{counts.b}</span>
				</div>:
				null
			}
			{counts.c?
				<div>
					<label>Store C</label>
					<span>{counts.c}</span>
				</div>:
				null
			}
			</div>
		);
	},
	getCounts(): { a: number, b: number, c: number } {
		return {
			a: this.props.storeA.count,
			b: this.props.storeB.count,
			c: this.props.storeC.count
		};
	}
});

/*------------------------------------------------------------------------------------------------*/
//	--- Custom Props Component ---
/*------------------------------------------------------------------------------------------------*/
const CustomPropsComponent  = React.createClass({
	propTypes: {
		summary: React.PropTypes.string.isRequired
	},
	render(): ReactElement {
		return <div>{this.props.summary}</div>;
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
		return (
			<div>
				<h4 onClick={() => this.onClick('a')}>A</h4>
				<h4 onClick={() => this.onClick('b')}>B</h4>
				<h4 onClick={() => this.onClick('c')}>C</h4>
			</div>
		);
	},
	onClick(storeChar: string) {
		let type = null;
		switch(storeChar) {
			case 'a':
				type = 'ADD_TO_A';
				break;
			case 'b':
				type = 'ADD_TO_B';
				break;
			case 'c':
				type = 'ADD_TO_C';
				break;
			default:
				return;
		}

		this.props.dispatch({ type });
	},
});