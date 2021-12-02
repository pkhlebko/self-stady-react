import { AppStateModel } from "../models";

export function selectCourses(state: AppStateModel) {
  const {courses, coursesFound, searchString} = state;

  console.log(searchString, courses, coursesFound)

  return searchString ? coursesFound : courses;
}

export function selectCoursesFound(state: AppStateModel) {
  return state.coursesFound;
}

export function selectCurrentUser(state: AppStateModel) {
  return state.currentUser;
}

export function selectSearchString(state: AppStateModel) {
  return state.searchString;
}