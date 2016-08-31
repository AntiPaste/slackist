import { ReduceStore } from 'flux/utils';
import ActionTypes from '../actions/ActionTypes';

import Label from '../models/Label';


class LabelStore extends ReduceStore {

  constructor(dispatcher) {
    super(dispatcher);

    this._state = this.getInitialState();
  }

  getInitialState() {
    return {
      labels: [],
      getAllInProgress: false,
    };
  }

  reduce(state, action) {
    if (!this[action.type]) return state;

    this[action.type](state, action);
    return Object.assign({}, state);
  }

  [ActionTypes.LABEL_GET_ALL_START](state) {
    state.getAllInProgress = true;
  }

  [ActionTypes.LABEL_GET_ALL_SUCCESS](state, action) {
    state.labels = action.labels.map((label) => new Label(label));
    state.getAllInProgress = false;
  }

  [ActionTypes.MESSAGE_GET_ONE_SUCCESS](state, action) {
    if (!action.message.label) return;

    const oldLabel = state.labels.find((label) => (
      label.value === action.message.label
    ));

    if (oldLabel) {
      oldLabel.count++;
    } else {
      const label = new Label({
        value: action.message.label,
        count: 1,
      });

      state.labels.push(label);
    }
  }

  [ActionTypes.MESSAGE_DELETE_ONE_SUCCESS](state, action) {
    if (!action.message.label) return;

    const currentLabel = state.labels.find((label) => (
      label.value === action.message.label
    ));

    if (currentLabel.count <= 1) {
      state.labels = state.labels.filter((label) => (
        label.value !== action.message.label
      ));
    } else {
      currentLabel.count--;
    }
  }

}

export default LabelStore;
