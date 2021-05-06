const baseUrl = 'http://localhost:3000/';
const getJson = (resp: Response) => resp.json();

export function getPageData(page: number) {
  return fetch(`${baseUrl}courses?_page=${page}`).then(getJson);
}

export function getSearchData(searchText: string) {
  return fetch(`${baseUrl}courses?q=${searchText}`).then(getJson);
}
