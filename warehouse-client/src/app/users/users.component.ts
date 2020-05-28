import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from '../user.service';
import { Observable } from 'rxjs';
import { EmailValidationService, IEmailResult } from '../email-validation.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users : IUser;
  errorMessage: string
  successMessage: string

  emailId: number
  user: IUser
  emailResult: IEmailResult

  filterId: string = "";
  filterName: string = "";
  filterFirstName: string = "";
  filterAddress: string = "";
  filterEmail: string = "";
  filterTel: string = "";
  filterSort: string = "";
  filterPage: string = "";
  filterLength: string = "";
  filterDir: string = "";
  constructor(private svc : UserService, private emailValidation: EmailValidationService) { }


  ngOnInit() {
    this.getUsers();
    this.errorMessage = "";
    this.successMessage = "";
  }

  getUsers(urlArgs: string = "") {
    this.svc.getUsers(urlArgs).subscribe(
        result => {
          this.users = result;
          return true;
        },
        error => {
          console.error("Error while retreiving users!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }

  getUser(id: number) {
    this.svc.getUserById(id).subscribe(
        result => {
          this.user = result
          return true;
        },
        error => {
          console.error("Error while retreiving user!");
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

  filter() {
    var urlArgs: string = "?";
    if (this.filterId != "" && this.filterId != null) {
      urlArgs += "id=" + this.filterId + "&"
    }
    if (this.filterName != "") {
      urlArgs += "name=" + this.filterName + "&"
    }
    if (this.filterFirstName != "") {
      urlArgs += "firstName=" + this.filterFirstName + "&"
    }
    if (this.filterAddress != "") {
      urlArgs += "address=" + this.filterAddress + "&"
    }
    if (this.filterEmail != "") {
      urlArgs += "email=" + this.filterEmail + "&"
    }
    if (this.filterTel != "") {
      urlArgs += "tel=" + this.filterTel + "&"
    }
    if (this.filterSort != "") {
      urlArgs += "sort=" + this.filterSort + "&"
    }
    if (this.filterPage != "") {
      urlArgs += "page=" + this.filterPage + "&"
    }
    if (this.filterLength != "") {
      urlArgs += "length=" + this.filterLength + "&"
    }
    if (this.filterDir != "") {
      urlArgs += "dir=" + this.filterDir + "&"
    }
  
    urlArgs = urlArgs.substring(0, urlArgs.length - 1);
    this.getUsers(urlArgs);
    
  }

  checkEmail(id: number) {
    if (id == 0) {
      return
    }
    this.svc.getUserById(id).subscribe(
        result => {
          this.user = result
          console.log("Checking email")
          this.emailValidation.checkEmail(this.user.email).subscribe(
            result => {
              this.emailResult = result
              return true;
            },
            error => {
              console.error("Error while retreiving user!");
              this.showError(error.message)
              return Observable.throw(error);
            }
          );
        },
        error => {
          console.error("Error while retreiving user!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }
}