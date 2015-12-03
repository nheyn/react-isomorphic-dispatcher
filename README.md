# React Isomorphic Dispatcher
*React binding for isomorphic-dispatcher*

Contains Higher-order React Components that can bind an (isomorphic-dispatcher)[https://github.com/nheyn/isomorphic-dispatcher] Dispatcher to (react)[https://facebook.github.io/react/] Components.

### Features
* Save a dispatcher (in context) so that it doesn't need to be explicitly passed to each component that needs it.
* Add the state of a store, as props, to a Component.
	* Will send new props every time state of it stores are changed.
	* NOTE: currently sends every time 'dispatch' is called (waiting for update to (isomorphic-dispatcher)[https://github.com/nheyn/isomorphic-dispatcher])
* Add the dispatch method of a Dispatcher, as a prop, to a Component.

### Dependencies
* ES2015(ES6) Promises
	* Must include an ES2015 compatible Promises library, tested using node 4 Promises.

### Usage
#### useDispatcher(Component, dispatcher)
Used to give accesses to the dispatcher to the children of the returned component.
```
var dispatcher = IsomorphicDispatcher.createDispatcher( ... );
var SomeComponent = React.createClass({ ... });

var useDispatcher = require('react-isomorphic-dispatcher').useDispatcher;
var SomeComponentWithDispatcher = useDispatcher(SomeComponet, dispatcher);
```

#### addStoreState(Component, [storeNames], [storesToProps], [loadActions])
Adds store states, from the dispatcher, as props to the given Component.

The stores to use are given in the array, 'storeNames'.
If 'storeNames' is not given (or null), all stores are used.

A function, 'storesToProps', can be used to transform the store states into the correct props.
If 'storesToProps' is not given, the state is put in its storeName prop.

An array of actions, 'loadActions', can be given to be passed to dispatch on 'componentDidMount'.
```
var addStoreState = require('react-isomorphic-dispatcher').addStoreState;
var SomeComponentWithStoreState = addStoreState(
	SomeComponent,
	['storeA', 'storeB'],							// Gets storeA and storeB from dispatcher
	function(storeStates) {
		return { storeStates: stores };				// SomeComponet will have props, storeState
	},
	[{ type: 'ACTION_1' }, { type: 'ACTION_@' }]	// Two .dispatch calls will happen on mount
);

React.render(
	(
		<SomeComponentWithDispatcher>
			<SomeComponentWithStoreState />
		</SomeComponentWithDispatcher>
	),
	el
);
```

#### addDispatch(Component)
Adds the dispatch function (dispatcher.dispatch) to the props of the given Component.
```
var addDispatch = require('react-isomorphic-dispatcher').addDispatch;
var SomeComponetWithDispatch = addDispatch(SomeComponent); SomeComponet will have props, dispatch

React.render(
	(
		<SomeComponentWithDispatcher>
			<SomeComponetWithDispatch />
		</SomeComponentWithDispatcher>
	),
	el
);
```

### Example
An example website using these bindings can be started using docker.
```
docker build -t example <path to this repo>
docker run -it --rm -p <port>:80 example
```
To see the all react-isomorphic-dispatch functions in use, open 'example/src/app.js'.

### Documentation
Basic usage is given above. More detailed documentation is before class/function definitions within the code.
