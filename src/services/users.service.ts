import {UserModel} from '../models';

const baseUrl = 'http://localhost:3000/';
const getJson = (resp: Response) => resp.json();

export class UserService {
  static async getUsers(): Promise<UserModel[]> {
    return fetch(`${baseUrl}users`).then(getJson);
  }

  static async getUserById(id: string): Promise<UserModel | null> {
    return fetch(`${baseUrl}users?id=${id}`)
      .then(getJson)
      .then((users: UserModel[]) => (users.length > 0 ? users[0] : null));
  }

  static async logUserIn(login: string, password: string): Promise<UserModel | null> {
    const user = await UserService.getUserById(login);

    return user?.password === password ? user : null;
  }

  static loadUserIdFromLocalStorage(): string | null {
    return localStorage.getItem('userId');
  }

  static saveUserIdToLocalStorage(user: UserModel): void {
    localStorage.setItem('userId', user.id);
  }

  static eraseUserIdFromLocalStorage(): void {
    localStorage.removeItem('userId');
  }

  static async getLoggedUser(): Promise<UserModel | null> {
    const userId = UserService.loadUserIdFromLocalStorage();

    return userId ? UserService.getUserById(userId) : Promise.resolve(null);
  }
}
