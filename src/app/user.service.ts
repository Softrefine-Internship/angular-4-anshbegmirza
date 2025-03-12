import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = ` https://dummyjson.com/users`;
  private userData = [];
  constructor() {}

  async getUsers(): Promise<any[]> {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      // return data.users;
      this.userData = data.users;
      return this.userData.slice();
    } catch (err) {
      console.error(`Error getting users! Please try refreshing page.`, err);
      return [];
    }
  }
}
