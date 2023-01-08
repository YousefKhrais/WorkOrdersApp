import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Role } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //Mock data
  users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'engineer@test.com',
      password: 'password',
      role: Role.SiteEngineer,
    },
    {
      id: 2,
      firstName: 'James',
      lastName: 'Watt',
      email: 'foremen@test.com',
      password: 'password',
      role: Role.Foremen,
    },
  ];

  isLoggedIn = false;
  currentUser?: User;

  constructor(private httpClient: HttpClient) {
    this.isLoggedIn = this.isAuthenticated();
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
  }

  //Mocking a login request
  loginUser(email: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      const user = this.users.find(u => u.email === email && u.password === password);
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user;
        observer.next(user);
      } else {
        observer.error({ message: 'Invalid email or password' });
      }
    });
  }
}