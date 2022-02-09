import {actionTypes} from '.';
import {ActionModel, IntitalStateModels} from '../models';

export function createReducer(initialState: IntitalStateModels, handlers: {[key in actionTypes]?: Function}) {
  return function reducer(state = initialState, action: ActionModel) {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type]!(state, action) : state;
  };
}
