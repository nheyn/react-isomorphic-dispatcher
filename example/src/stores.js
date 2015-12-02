/* @flow */
import { createStore } from 'isomorphic-dispatcher';

let storeA = createStore({ value: 'a' });
storeA = storeA.register((state, action) => {
	if(action.type !== 'ADD_TO_A') return state;
	return {
		{...state}
		count: state.count + 1
	};
})
export storeA;

let storeB = createStore({ value: 'b' });
storeB = storeB.register((state, action) => {
	if(action.type !== 'ADD_TO_B') return state;
	return {
		{...state}
		count: state.count + 1
	};
})
export storeB;

let storeC = createStore({ value: 'c' });
storeC = storeC.register((state, action) => {
	if(action.type !== 'ADD_TO_C') return state;
	return {
		{...state}
		count: state.count + 1
	};
})
export storeC;
