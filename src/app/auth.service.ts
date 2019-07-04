import { Injectable } from '@angular/core';

export const LOGIN_KEY = 'username';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  public register(username: string): void {
    localStorage.setItem(LOGIN_KEY, username);
  }

  public disconnect() {
    localStorage.removeItem(LOGIN_KEY);
  }

  public check(): boolean {
    return !!localStorage.getItem(LOGIN_KEY);
  }
}
