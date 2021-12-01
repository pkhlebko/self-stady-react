import { AppStateModel } from "../models";

export function selectCourses(state: AppStateModel) {
  return state.courses;
}

export function selectCurrentUser(state: AppStateModel) {
  return state.currentUser;
}