import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService, IUser } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private cookie: CookieService, private auth: AuthService, private router: Router) { 
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

  ngOnInit() {
    this.auth.getUserInfo().subscribe(user => {
      this.auth.currentUser = user
      this.router.navigate(['/dashboard']);
    })
  }

  loginRedirect() {
    document.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + this.auth.clientId + "&redirect_uri=" + this.auth.redirectUrl + "&scope=profile" + "&response_type=code"
  }
   
}
