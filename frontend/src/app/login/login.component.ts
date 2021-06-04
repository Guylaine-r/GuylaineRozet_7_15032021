import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading : any;
  errorMessage:  any
  email: String = '';
  password: String = '';

  // le formulaire
  loginForm;

  // On appelle le BackensService pour faire appel à sa fnt login()
  // On appelle le UserService pour faire appel à sa fnt setToken()
  constructor(private backend: BackendService, private user: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.loading = false;
    this.errorMessage = null;
  }

  // Bouton submit() evenement click
  submit() {
    this.loading = true;
    this.backend.login(this.email, this.password).subscribe((value) => {
        this.user.setToken(value.token);
        this.loading = false;
        this.router.navigate(["/"]);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = "Votre email et/ou mot de passe est incorrect(s). Veuillez réessayer.";
        console.log(error)
      }

    )
  }
}
