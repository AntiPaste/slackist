import * as types from '../mutation-types';

const initialState = {
  messages: [],
  filter: null,
};

// mutations
const mutations = {
  [types.FILTER_SET](state, { filter }) {
    state.filter = filter;
  },

  [types.MESSAGES_RECEIVE_ALL](state, { messages }) {
    state.messages = messages.map((message) => {
      message.label = message.label || 'No label';
      return message;
    });
  },

  [types.MESSAGE_RECEIVE_ONE](state, { message }) {
    message.label = message.label || 'No label';
    state.messages.push(message);
  },

  [types.MESSAGE_DELETE_ONE](state, { message }) {
    state.messages = state.messages.filter(
      otherMessage => otherMessage.id !== message.id
    );
  },
};

export default {
  state: initialState,
  mutations,
};
