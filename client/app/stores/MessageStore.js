import { ReduceStore } from 'flux/utils';
import ActionTypes from '../actions/ActionTypes';

import Message from '../models/Message';


class MessageStore extends ReduceStore {

  constructor(dispatcher) {
    super(dispatcher);

    this._state = this.getInitialState();
  }

  getInitialState() {
    return {
      messages: [],
      filterLabel: null,
      getAllInProgress: false,
    };
  }

  reduce(state, action) {
    if (!this[action.type]) return state;

    this[action.type](state, action);
    return Object.assign({}, state);
  }

  [ActionTypes.MESSAGE_GET_ALL_START](state) {
    state.getAllInProgress = true;
  }

  [ActionTypes.MESSAGE_GET_ALL_SUCCESS](state, action) {
    state.messages = action.messages.map((message) => new Message(message));
    state.getAllInProgress = false;
  }

  [ActionTypes.MESSAGE_GET_ONE_SUCCESS](state, action) {
    state.messages.push(new Message(action.message));
  }

  [ActionTypes.MESSAGE_DELETE_ONE_SUCCESS](state, action) {
    state.messages = state.messages.filter((message) => (
      message.id !== action.message.id
    ));
  }

  [ActionTypes.MESSAGE_SET_FILTER_LABEL](state, action) {
    state.filterLabel = action.label;
  }

}

export default MessageStore;
