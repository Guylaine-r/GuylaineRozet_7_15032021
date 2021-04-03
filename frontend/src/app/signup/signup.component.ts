import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email : any;
  password : any;
  lastname : any;
  firstname : any;

  constructor() { }

  ngOnInit(): void {
  }

  openPopup(): void {
    window.alert("Email: " + this.email + "\nNom: " + this.lastname + "\nPrénom: " + this.firstname);
  }

}
