import {actionTypes} from '../actions';
import {ActionModel, UsersStateModel} from '../../models';
import {createReducer} from '../utils';

const usersState: UsersStateModel = {
  currentUser: undefined,
};

function setCurrentUser(state: UsersStateModel, action: ActionModel): UsersStateModel {
  return {...state, currentUser: action.payload.user};
}

export function getUsersReducer() {
  return createReducer(usersState, {
    [actionTypes.SET_CURRENT_USER]: setCurrentUser,
  });
}
