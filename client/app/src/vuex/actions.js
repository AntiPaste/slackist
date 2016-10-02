import * as api from '../api';
import * as types from './mutation-types';

export const getAllMessages = ({ commit }) => {
  api.messages.get({ sort: 'asc' }).then((response) => {
    const { messages } = response.body;
    commit(types.MESSAGES_RECEIVE_ALL, { messages });
  });
};

export const createMessage = ({ commit }, payload) => {
  api.messages.save(payload).then((response) => {
    const { message } = response.body;
    commit(types.MESSAGE_RECEIVE_ONE, { message });
  });
};

export const deleteMessage = ({ commit }, id) => {
  api.messages.delete({ id }).then((response) => {
    const { message } = response.body;
    commit(types.MESSAGE_DELETE_ONE, { message });
  });
};
