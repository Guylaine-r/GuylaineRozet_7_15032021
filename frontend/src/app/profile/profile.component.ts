import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private user: UserService, private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteAccount(): void {
    this.backend.deleteAccount(this.user.getToken()).subscribe(results => {
      document.getElementsByClassName("modal-backdrop")[0].remove();
      this.user.disconnect();
      this.router.navigate(["/"]);
    }, error => {
      console.log(error);
    });
  }
}
