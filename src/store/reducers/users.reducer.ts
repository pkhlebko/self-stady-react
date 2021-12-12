import {actionTypes} from '..';
import {ActionModel, UsersStateModel} from '../../models';
import {createReducer} from '../utils';

const usersState: UsersStateModel = {
  currentUser: undefined,
};

function setCurrentUser(state: UsersStateModel, action: ActionModel): UsersStateModel {
  return {...state, currentUser: action.payload.user};
}

export const usersReducer = createReducer(usersState, {
  [actionTypes.SET_CURRENT_USER]: setCurrentUser,
});
