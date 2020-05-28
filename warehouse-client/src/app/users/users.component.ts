import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from '../user.service';
import { Observable } from 'rxjs';
import { EmailValidationService, IEmailResult } from '../email-validation.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users : IUser;
  errorMessage: string
  successfulSave: boolean;
  successMessage: string;
  errors: string[];


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
    this.errors = [];
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
          this.successfulSave = true
          return true;
        },error => {
          console.error("Error creating user!");
          this.successfulSave = false
          if (error.status === 400) {
            const validationErrors = error.error;
            Object.keys(validationErrors).forEach(prop => {
              console.log(validationErrors[prop])
              this.errors.push(validationErrors[prop])
            });
          }
        }
    );
  }
    
  updateUser(updatedUser) {
    this.svc.updateUser(updatedUser).subscribe(
        data => {
          // refresh the list
          this.getUsers();
          this.showSuccess("Successfully updated the user!")
          this.successfulSave = true
          return true;
        },
       error => {
        console.error("Error saving user!");
        this.successfulSave = false
        if (error.status === 400) {
          const validationErrors = error.error;
          Object.keys(validationErrors).forEach(prop => {
            console.log(validationErrors[prop])
            this.errors.push(validationErrors[prop])
          });
        }
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
    if (id == 0 || id == null) {
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
            }
          );
        },
        error => {
          console.error("Error while retreiving user!");
          this.showError(error.message)
        }
    );
  }
}