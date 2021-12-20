import {ActionModel, CourseModel, UserModel} from '../models';

export enum actionTypes {
  SET_COURSES_FOUND = 'SET_COURSES_FOUND',
  SET_COURSES = 'SET_COURSES',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_SEARCHSTRING = 'SET_SEARCHSTRING',
  UPDATE_COURSE = 'SET_COURSE',
}

function setCoursesFound(coursesFound: CourseModel[]): ActionModel {
  return {
    type: actionTypes.SET_COURSES_FOUND,
    payload: {coursesFound},
  };
}

function setCourses(newPage: number, newCourses: CourseModel[]): ActionModel {
  return {
    type: actionTypes.SET_COURSES,
    payload: {newPage, newCourses},
  };
}

function updateCourse(updatedCourse: CourseModel): ActionModel {
  return {
    type: actionTypes.UPDATE_COURSE,
    payload: {updatedCourse},
  };
}

function setCurrentUser(user: UserModel|undefined): ActionModel {
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
  updateCourse
};
