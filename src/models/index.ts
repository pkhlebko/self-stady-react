export enum actionTypes {
  SET_COURSES,
  SET_CURRENT_USER
}
export interface CourseModel {
  id?: number;
  title: string;
  description: string;
  authorID: string;
  date: Date;
  rating?: number;
}

export interface UserModel {
  id: string;
  name: string;
  password: string;
}

export interface ActionModel {
  type: actionTypes;
  payload: ActionPayloadModel;
}

export interface ActionPayloadModel {
  [key:string]: any;
}

export interface AppStateModel {
  courses: CourseModel[];
  currentPage: 0;
  lastPage: boolean;
  currentUser?: UserModel;
}