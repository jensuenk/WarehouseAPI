import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  constructor(private http: HttpClient, private user: UserService) { }

  checkEmail(email: string) {
      return this.http.get<IEmailResult>("https://apilayer.net/api/check?access_key=525da81dd224b2c58789a8fccd233181&email=" + email)
  }
}
export interface IEmailResult {
  email: string;
  did_you_mean: string;
  user: string;
  domain: string;
  format_valid: boolean;
  mx_found: boolean;
  smtp_check: boolean;
  catch_all: boolean;
  role: boolean;
  disposable: boolean;
  free: boolean;
  score: number;
}