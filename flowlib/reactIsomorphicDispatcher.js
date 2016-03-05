declare module 'react-isomorphic-dispatcher' {
  declare function useDispatcher(
    Component:  ReactClass<any, any, any> | string,
    dispatcher:  Dispatcher
  ):        ReactClass<any, any, any>

  declare function addStoreState(
    Component:    ReactClass<any, any, any> | string,
    storeNames?:  ?Array<string>,
    storesToProps?:  ?(states: {[key: string]: any}) => any,
    loadActions?:  Array<Action>
  ):          ReactClass<any, any, any>

  declare function addDispatch(
    Component: ReactClass<any, any, any> | string
  ): ReactClass<any, any, any>
}