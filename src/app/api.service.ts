import { Injectable } from '@angular/core';
import { USER } from './user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private users: USER[] = [{email:"poovarasan@gmail.com",password:"poo@123"},{email:"hr@tarkiz.info",password:"tarkizinfo"}];
  private currentUserSubject: BehaviorSubject<USER | null>;
  public currentUser: Observable<USER | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<USER | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

 public signup(data:USER): boolean {
    if (this.users.find(user => user.email === data.email)) {
      return false; 
    }
    this.users.push(data);
    console.log("after register",this.users)
    return true;
  }

 public login(data:USER): boolean {
    const user = this.users.find(user => user.email === data.email && user.password === data.password);
    if (user) {
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

 public logout(): void {
    this.currentUserSubject.next(null);
  }

 public getCurrentUser(): USER | null {
    return this.currentUserSubject.value;
  }
}
