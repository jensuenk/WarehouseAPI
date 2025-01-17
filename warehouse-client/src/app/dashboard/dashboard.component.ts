import { Component, OnInit } from '@angular/core';
import { IUser, AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  private user: IUser

  ngOnInit() {

    this.user = this.auth.currentUser;
    if (this.user == null) {
      this.router.navigate(['/login']);
    }
  }

}
