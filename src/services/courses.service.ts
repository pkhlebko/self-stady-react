import {CourseModel} from '../models';

const baseUrl = 'http://localhost:3000/';
const getJson = (resp: Response) => resp.json();

export function getPageData(page: number) {
  return fetch(`${baseUrl}courses?_page=${page}`).then(getJson);
}

export function getSearchData(searchText: string) {
  return fetch(`${baseUrl}courses?q=${searchText}`).then(getJson);
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
