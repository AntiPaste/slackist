import { ReduceStore } from 'flux/utils';
import ActionTypes from '../actions/ActionTypes';

class MessageStore extends ReduceStore {
  constructor(dispatcher) {
    super(dispatcher);

    this._state = this.getInitialState();
  }

  getInitialState() {
    return {
      messages: {},
      nextMessageID: 1,
    };
  }

  reduce(state, action) {
    if (!this[action.type]) return state;

    this[action.type](state, action);
    return Object.assign({}, state);
  }

  [ActionTypes.MESSAGES_ADD](state, action) {
    const { nextMessageID } = state;
    state.messages[nextMessageID] = action.message;
    state.nextMessageID++;
  }

  [ActionTypes.MESSAGES_CLEAR](state) {
    const { messages } = state;
    const newMessages = {};

    Object.keys(messages).forEach((key) => {
      const message = messages[key];
      if (!message.future) return;

      message.future = false;
      newMessages[key] = message;
    });

    state.messages = newMessages;
  }

  [ActionTypes.MESSAGES_EXPIRE](state, action) {
    const { messages } = state;
    const newMessages = {};

    Object.keys(messages).forEach((key) => {
      if (key !== action.id) newMessages[key] = messages[key];
    });

    state.messages = newMessages;
  }
}

export default MessageStore;
