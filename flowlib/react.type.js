declare module 'react-dom' {
  declare function render<DefaultProps, Props, State>(
    element:  ReactElement<DefaultProps, Props, State>,
     container:  any
  ):        ReactComponent<DefaultProps, Props, State>;
}

declare module 'react-dom/server' {
  declare function renderToString(element: ReactElement<any, any, any> ): string;
  declare function renderToStaticMarkup(element: ReactElement<any, any, any>): string;
}