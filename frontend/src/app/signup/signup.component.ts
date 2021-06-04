import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  loading: any;

  errorMessage: any;

  lastname: any;
  firstname: any;
  email: any;
  password: any;

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
    this.errorMessage = null;
    this.lastname = "";
    this.firstname = "";
    this.email = "";
    this.password = "";
  }

  signup(): void {
    this.loading = true;
    this.backend.signup(this.lastname, this.firstname, this.email, this.password).subscribe((result) => {
      this.loading = false;
      this.router.navigate(["/login"]);
    }, (error) => {
      this.loading = false;
      this.errorMessage = "Le mail sélectionné est déjà utilisé.";
    });
  }

  checkLastname(): boolean {
    const regularExL = /[a-zA-Z-]/
    if (regularExL.test(String(this.lastname).toLocaleLowerCase())) {
      document.getElementById("lastname").classList.remove("is-invalid");
      return true;
    } else {
      document.getElementById("lastname").classList.add("is-invalid");

    }
  }

  checkFirstname(): boolean {
    const regularExF = /[a-zA-Z-]/
    if (regularExF.test(String(this.firstname).toLocaleLowerCase())) {
      document.getElementById("firstname").classList.remove("is-invalid");
      return true;
    } else {
      document.getElementById("firstname").classList.add("is-invalid");

    }

  }

  checkEmail(): boolean {
    const regularEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regularEx.test(String(this.email).toLowerCase())) {
      document.getElementById("email").classList.remove("is-invalid");
      return true;
    } else {
      document.getElementById("email").classList.add("is-invalid");

    }
  }

  checkPassword(): boolean {
    const regularExP = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    if (regularExP.test(String(this.password).toLocaleLowerCase())) {
      document.getElementById("password").classList.remove("is-invalid");
      return true;
    } else {
      document.getElementById("password").classList.add("is-invalid");
    }

  }

  checkForm(): boolean {
    let value = true;
    value = this.checkLastname() && value;
    value = this.checkFirstname() && value;
    value = this.checkEmail() && value;
    value = this.checkPassword() && value;
    return value;
  }
}
