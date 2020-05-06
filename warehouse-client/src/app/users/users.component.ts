import { Component, OnInit } from '@angular/core';
import { IUser, IUserWithoutId, UserService } from '../user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users : IUser;
  errorMessage: string
  successMessage: string

  constructor(private svc : UserService) { }

  ngOnInit() {
    this.getUsers();
    this.errorMessage = "";
    this.successMessage = "";
  }

  getUsers() {
    this.svc.getUsers().subscribe(
        result => {
          this.users = result
          return true;
        },
        error => {
          console.error("Error while retreiving users!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }

  createUser(name, firstName, address, email, tel) {
    let newUser: IUser = {
      id: 0,
      name: name,
      firstName: firstName,
      address: address,
      email: email,
      tel: tel
    }
    this.svc.createUser(newUser).subscribe(
        data => {
          // refresh the list
          this.getUsers();
          this.showSuccess("Successfully created a new user!")
          return true;
        },
        error => {
          console.error("Error creating user!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }
    
  updateUser(updatedUser) {
    this.svc.updateUser(updatedUser).subscribe(
        data => {
          // refresh the list
          this.getUsers();
          this.showSuccess("Successfully updated the user!")
          return true;
        },
        error => {
          console.error("Error saving product!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }
    
  deleteUser(user) {
    this.svc.deleteUser(user).subscribe(
        data => {
          // refresh the list
          this.getUsers();
          this.showSuccess("Successfully deleted the user!")
          return true;
        },
        error => {
          console.error("Error deleting user!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }

  showError(message: string) {
    this.errorMessage = message;
    this.successMessage = "";
  }
  showSuccess(message: string) {
    this.errorMessage = "";
    this.successMessage = message;
  }
}
