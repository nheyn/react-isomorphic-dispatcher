import React from 'react';
import Immutable from 'immutable';
import { addStoreState, addDispatch } from 'react-isomorphic-dispatcher';

import TodoListHeader from './TodoListHeader';
import TodoListBody from './TodoListBody';

/**
 * React Component that render the entire app.
 */
const App = React.createClass({
  propTypes: {
    dispatcher: React.PropTypes.object.isRequired   // Isomorphic Dispatcher
  },
  renderHeader() {
    const ConnectedTodoListHeader = addDispatch(addStoreState(TodoListHeader, 'basicInfo'));

    return <ConnectedTodoListHeader />;
  },
  renderBody() {
    const ConnectedTodoListBody = addDispatch(addStoreState(TodoListBody, 'todoList', ({ todoList: state }) => {
      console.log({ state });
      return {
        items: state.items
      };
    }));

    return <ConnectedTodoListBody />;
  },
  render() {
    const { title } = this.props.dispatcher.getStateFor('pageTitle');

    return (
      <div>
        <h3>{title}</h3>
        <div>
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </div>
    );
  }
});
export default App;
