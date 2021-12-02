import {CourseModel} from '../models';

const baseUrl = 'http://localhost:3000/';
const getJson = (resp: Response) => resp.json();
const dataToCourse = (course: any) => ({...course, date: new Date(course.date)} as CourseModel);

export function getPageData(page: number) {
  return fetch(`${baseUrl}courses?_page=${page}`)
    .then(getJson)
    .then((data) => data.map(dataToCourse));
}

export function getSearchData(searchText: string) {
  return fetch(`${baseUrl}courses?q=${searchText}`)
    .then(getJson)
    .then((data) => data.map(dataToCourse));
}

export function getCoursesLastId(): Promise<number> {
  return fetch(`${baseUrl}courses`)
    .then(getJson)
    .then((data: CourseModel[]) => data.length);
}

export async function addCourse(course: CourseModel) {
  const url = `${baseUrl}courses`;
  const method = 'POST';
  const headers = {'Content-Type': 'application/json'};
  const lastCourseId = await getCoursesLastId();
  const body = JSON.stringify({...course, id: lastCourseId + 1});

  return fetch(url, {method, headers, body});
}