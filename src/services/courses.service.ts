import {CourseModel} from '../models';

const baseUrl = 'http://localhost:3000/';
const getJson = (resp: Response) => resp.json();
const dataToCourse = (course: any) => ({...course, date: new Date(course.date)} as CourseModel);

export class CoursesService {
  public static async getPageData(page: number) {
    return fetch(`${baseUrl}courses?_page=${page}`)
      .then(getJson)
      .then((data) => data.map(dataToCourse));
  }

  public static async getSearchData(searchText: string) {
    return fetch(`${baseUrl}courses?q=${searchText}`)
      .then(getJson)
      .then((data) => data.map(dataToCourse));
  }

  public static async getCoursesLastId(): Promise<number> {
    return fetch(`${baseUrl}courses`)
      .then(getJson)
      .then((data: CourseModel[]) => data.length);
  }

  public static async addCourse(course: Partial<CourseModel>) {
    const url = `${baseUrl}courses`;
    const method = 'POST';
    const headers = {'Content-Type': 'application/json'};
    const lastCourseId = await CoursesService.getCoursesLastId();
    const body = JSON.stringify({...course, id: lastCourseId + 1});

    return fetch(url, {method, headers, body});
  }

  public static async updateCourse(course: CourseModel) {
    const url = `${baseUrl}courses/${course.id}`;
    const method = 'PATCH';
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(course);

    return fetch(url, {method, headers, body});
  }
}
