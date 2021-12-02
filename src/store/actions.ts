import {ActionModel, CourseModel, UserModel} from '../models';

export enum actionTypes {
  SET_COURSES_FOUND,
  SET_COURSES,
  SET_CURRENT_USER,
  SET_SEARCHSTRING,
}

function setCoursesFound(coursesFound: CourseModel[]): ActionModel {
  return {
    type: actionTypes.SET_COURSES,
    payload: {newCourses: coursesFound},
  };
}

function setCourses(newPage: number, newCourses: CourseModel[]): ActionModel {
  return {
    type: actionTypes.SET_COURSES,
    payload: {newPage, newCourses},
  };
}

function setCurrentUser(user: UserModel): ActionModel {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: {user},
  };
}

function setSearchString(searchString?: string): ActionModel {
  return {
    type: actionTypes.SET_SEARCHSTRING,
    payload: {searchString},
  };
}

export const actions = {
  setCourses,
  setCoursesFound,
  setCurrentUser,
  setSearchString,
};
