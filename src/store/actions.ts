import {ActionModel, CourseModel, UserModel} from '../models';
import {getPageData, getSearchData} from '../services/courses.service';

export enum actionTypes {
  SET_COURSES_FOUND,
  SET_COURSES,
  SET_CURRENT_USER,
  SET_SEARCHSTRING,
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

function fetchPageData(currentPage: number) {
  return async (dispatch: any) => {
    const nextPage = currentPage + 1;
    console.log('nextPage', nextPage);
    dispatch(actions.setCourses(nextPage, await getPageData(nextPage)));
  };
}

function fetchSearchResults(searchString?: string) {
  return async (dispatch: any) => {
    let coursesFound: CourseModel[] = [];

    if (!searchString && searchString === '') {
      searchString = undefined;
    } else {
      coursesFound = await getSearchData(searchString as string);
    }

    dispatch(setCoursesFound(coursesFound));
  };
}

export const thunks = {
  fetchPageData,
  fetchSearchResults,
};
