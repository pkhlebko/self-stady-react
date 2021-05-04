export async function getPageData(page: number) {
  return await fetch(`http://localhost:3000/courses?_page=${page}`)
    .then((req) => req.json());
}