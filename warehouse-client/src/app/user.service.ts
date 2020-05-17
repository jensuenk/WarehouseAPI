import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = "https://192.168.0.158:45455/api/v1/user";

  constructor(private http: HttpClient) { }

  getUsers(args: string): Observable<IUser> {
    console.log(this.url + args);
    return this.http.get<IUser>(this.url + args)
  }

  getUsersById(id: string): Observable<IUser> {
    console.log(this.url + "/" + id);
    return this.http.get<IUser>(this.url + "/" + id)
  }

  createUser(user: IUser) {
    let body = JSON.stringify(user);
    delete body['id'];
    return this.http.post(this.url, body, httpOptions);
  }

  updateUser(user: IUser) {
    let body = JSON.stringify(user);
    delete body['id'];
    return this.http.put(this.url, body, httpOptions);
  }

  deleteUser(user: IUser) {
    return this.http.delete(this.url + "/" + user.id);
  }

  user: IUser;
}

export interface IUser {
  id: number,
  name: string,
  firstName: string,
  address: string,
  email: string,
  tel: string
}