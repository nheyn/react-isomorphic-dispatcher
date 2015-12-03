/* @flow */
import { createStore } from 'isomorphic-dispatcher';

export let storeA = createStore({ value: 'a' });
storeA = storeA.register((state, action) => {
	if(action.type !== 'ADD_TO_A') return state;
	return Object.assign({},
		state,
		{ count: state.count? state.count+1: 1 }
	);
});

export let storeB = createStore({ value: 'b' });
storeB = storeB.register((state, action) => {
	if(action.type !== 'ADD_TO_B') return state;
	return Object.assign({},
		state,
		{ count: state.count? state.count+1: 1 }
	);
});

export let storeC = createStore({ value: 'c' });
storeC = storeC.register((state, action) => {
	if(action.type !== 'ADD_TO_C') return state;
	return Object.assign({},
		state,
		{ count: state.count? state.count+1: 1 }
	);
});
storeC = storeC.register((state, action) => {
	if(action.type !== 'WAIT') return state;

	return new Promise((resolve) => {
		setTimeout(() => resolve(state), 2000);
	});
});
