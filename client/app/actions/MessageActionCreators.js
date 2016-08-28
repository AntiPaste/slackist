import CommonActionCreators from './CommonActionCreators';
import ActionTypes from './ActionTypes';


class MessageActionCreators extends CommonActionCreators {

  getAll() {
    this._dispatcher.dispatch({
      type: ActionTypes.MESSAGE_GET_ALL_START,
    });

    this._apiUtils.get('/messages')
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.MESSAGE_GET_ALL_SUCCESS,
          messages: response.messages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  create(text) {
    this._apiUtils.post('/messages', { text })
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.MESSAGE_GET_ONE_SUCCESS,
          message: response.message,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  delete(identifier) {
    this._apiUtils.delete(`/messages/${identifier}`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.MESSAGE_DELETE_ONE_SUCCESS,
          message: response.message,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setFilterLabel(label) {
    this._dispatcher.dispatch({
      type: ActionTypes.MESSAGE_SET_FILTER_LABEL,
      label,
    });
  }

}

export default MessageActionCreators;
