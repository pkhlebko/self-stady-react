import {AppStateModel, CoursesStateModel} from '../models';

export function getCoursesPageContent(state: AppStateModel): CoursesStateModel {
  const {courses, coursesFound, searchString, currentPage, lastPage} = state.coursesState;

  return {courses, coursesFound, searchString, currentPage, lastPage};
}

export function selectCoursesFound(state: AppStateModel) {
  return state.coursesState.coursesFound;
}

export function selectCurrentUser(state: AppStateModel) {
  return state.usersState.currentUser;
}

export function selectSearchString(state: AppStateModel) {
  return state.coursesState.searchString;
}
