import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, IProfileInfo } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private cookie: CookieService, private auth: AuthService) { 
    this.route.queryParamMap.subscribe(par => {
      if (par.get("code") != null) {
        console.log("Code received");
        let code = par.get("code"); 
        console.log(code)
        this.auth.postGoogle(code).subscribe(response => {
          this.cookie.set("accessToken", response.access_token);
          this.cookie.set("idToken", response.id_token);
        })
      }
    })
  }

  private currentUser: IProfileInfo

  ngOnInit() {
    this.auth.getUserInfo().subscribe(user => {
      this.currentUser = user
    })
  }

  private clientId: string = "985688512068-4u35dr2vh2rii5376bj07991jo3ffbr3.apps.googleusercontent.com";
  private clientSecret: string = "tsmtoXytEM84ZkVZsLHPHkFg";
  private redirectUrl: string = "http%3A%2F%2Flocalhost%3A4200%2Flogin";

  googleRedirect() {
    document.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + this.clientId + "&redirect_uri=" + this.redirectUrl + "&scope=profile" + "&response_type=code"
  }
   
}
