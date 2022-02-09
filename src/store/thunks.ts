import {actions} from '.';
import {CourseModel} from '../models';
import {CoursesService} from '../services';

function fetchCoursesPage(currentPage: number) {
  return async (dispatch: any) => {
    const nextPage = currentPage + 1;

    dispatch(actions.setCourses(nextPage, await CoursesService.getPageData(nextPage)));
  };
}

function fetchSearchResults(searchString?: string) {
  return async (dispatch: any) => {
    let coursesFound: CourseModel[] = [];

    if (!searchString && searchString === '') {
      searchString = undefined;
    } else {
      coursesFound = await CoursesService.getSearchData(searchString as string);
    }

    dispatch(actions.setCoursesFound(coursesFound));
  };
}

function updateCourse(course: CourseModel) {
  return async (dispatch: any) => {
    await CoursesService.updateCourse(course);

    dispatch(actions.updateCourse(course));
  };
}

export const thunks = {
  fetchCoursesPage,
  fetchSearchResults,
  updateCourse,
};
