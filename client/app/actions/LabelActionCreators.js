import CommonActionCreators from './CommonActionCreators';
import ActionTypes from './ActionTypes';


class LabelActionCreators extends CommonActionCreators {

  getAll() {
    this._dispatcher.dispatch({
      type: ActionTypes.LABEL_GET_ALL_START,
    });

    this._apiUtils.get('/labels')
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.LABEL_GET_ALL_SUCCESS,
          labels: response.labels,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

export default LabelActionCreators;
