const baseUrl = 'http://localhost:3000/';
const getJson = (resp: Response) => resp.json();

export interface UserModel {
  id: string;
  name: string;
  password: string;
}

export async function getUsers(): Promise<UserModel[]> {
  return fetch(`${baseUrl}users`).then(getJson);
}

export async function getUserById(id: string): Promise<UserModel | null> {
  return fetch(`${baseUrl}users?id=${id}`)
    .then(getJson)
    .then((users: UserModel[]) => (users.length > 0 ? users[0] : null));
}

export async function logUserIn(login: string, password: string): Promise<UserModel | null> {
  const user = await getUserById(login);

  return user?.password === password ? user : null;
}

export function loadUserIdFromLocalStorage(): string | null {
  return localStorage.getItem('userId');
}

export function saveUserIdToLocalStorage(user: UserModel): void {
  localStorage.setItem('userId', user.id);
}

export function eraseUserIdFromLocalStorage(): void {
  localStorage.removeItem('userId');
}

export async function getLoggedUser(): Promise<UserModel | null> {
  const userId = loadUserIdFromLocalStorage();

  return userId ? getUserById(userId) : Promise.resolve(null);
}
