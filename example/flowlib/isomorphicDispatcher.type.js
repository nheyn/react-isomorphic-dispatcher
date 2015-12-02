declare module 'isomorphic-dispatcher' {
	declare function createStore<S>(initialState: S): Store<S>

	declare function createDispatcher(
		stores: StoresObject
	): Dispatcher

	declare function createClientDispatcher(
		finishOnServer: DispatcherIsoFunc,
		stores: StoresObject
	): Dispatcher

	declare function createServerDispatcher(
		getOnServerArg: () => any | Promise<any>,
		stores: StoresObject
	): Dispatcher
}

type Action = {[key: string]: any};
type StartingPoint<S> = { state: S, index: number };
type Store<S> = any;	//TODO
type Dispatcher = any;	//TODO
type StoresObject = {[key: string]: Store<any>};
type DispatcherIsoFunc = (
	action: Action,
	pausePoints: {[key: string]: StartingPoint<any>}
) => Promise<{[key: string]: any}>;