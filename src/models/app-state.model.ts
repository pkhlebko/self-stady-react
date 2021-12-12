import {CourseModel, UserModel} from '.';

export interface CoursesStateModel {
  courses: CourseModel[];
  coursesFound?: CourseModel[];
  currentPage: 0;
  lastPage: boolean;
  searchString?: string;
}

export interface UsersStateModel {
  currentUser?: UserModel;
}

export interface AppStateModel {
  coursesState: CoursesStateModel;
  usersState: UsersStateModel;
}

export type IntitalStateModels = CoursesStateModel | UsersStateModel;