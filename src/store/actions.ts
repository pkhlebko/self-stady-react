import { ActionModel, actionTypes, CourseModel, UserModel } from "../models"

function setCourses(newPage: number, newCourses: CourseModel[]): ActionModel {
  return {
    type: actionTypes.SET_COURSES,
    payload: { newPage, newCourses }
  }
}

function setCurrentUser(user: UserModel): ActionModel {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: { user }
  }
}

export const actions = {
  setCourses,
  setCurrentUser
};