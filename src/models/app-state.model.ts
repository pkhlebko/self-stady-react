import {CourseModel, UserModel} from '.';

export interface AppStateModel {
  courses: CourseModel[];
  coursesFound?: CourseModel[];
  currentPage: 0;
  currentUser?: UserModel;
  lastPage: boolean;
  searchString?: string;
}

export type CoursesPageDataType = Pick<
  AppStateModel,
  'courses' | 'coursesFound' | 'searchString' | 'currentPage' | 'lastPage'
>;
