import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = "https://warehouseapi20200528053515.azurewebsites.net/api/v1/user";

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getUsers(args: string): Observable<IUser> {
    console.log(this.url + args);
    return this.http.get<IUser>(this.url + args, {
      headers: {
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    })
  }

  getUserById(id: number): Observable<IUser> {
    console.log(this.url + "/" + id);
    return this.http.get<IUser>(this.url + "/" + id, {
      headers: {
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    })
  }

  createUser(user: IUser) {
    let body = JSON.stringify(user);
    delete body['id'];
    return this.http.post(this.url, body, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    });
  }

  updateUser(user: IUser) {
    let body = JSON.stringify(user);
    delete body['id'];
    return this.http.put(this.url, body, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    });
  }

  deleteUser(user: IUser) {
    return this.http.delete(this.url + "/" + user.id, {
      headers: {
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    })
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