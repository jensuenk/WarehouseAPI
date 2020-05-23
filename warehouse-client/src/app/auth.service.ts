import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientId: string = "985688512068-4u35dr2vh2rii5376bj07991jo3ffbr3.apps.googleusercontent.com";
  private clientSecret: string = "tsmtoXytEM84ZkVZsLHPHkFg";
  private redirectUrl: string = "http%3A%2F%2Flocalhost%3A4200%2Flogin";

  constructor(private http: HttpClient, private cookie: CookieService) { }

  postGoogle(code: string) {
    let postUrl = "https://www.googleapis.com/oauth2/v4/token?code=" + code + "&client_id=" + this.clientId + "&client_secret=" + this.clientSecret + "&redirect_uri=" + this.redirectUrl + "&grant_type=authorization_code";
    return this.http.post<IResponse>(postUrl, "");
  }
  
  getUserInfo() {
    let url = "https://www.googleapis.com/userinfo/v2/me"
    return this.http.get<IProfileInfo>(url, {
      headers:{
        "Authorization": "Bearer " + this.cookie.get("accessToken")
      }
    });
  }
}

export interface IResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string,
  id_token: string;
}
export interface IProfileInfo {
  id: number;
  name: string;
  family_name: string;
  given_name: string;
  picture: string;
  locale: string;
}
