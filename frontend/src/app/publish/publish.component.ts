import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  name : any;
  text : any;
  data : any;

  constructor(private backend: BackendService, private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelect(event) {
    if(event.target.files.length != 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        this.data = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  send(): void {
    this.backend.createPost(this.name, this.text, this.data).subscribe(results => {
      this.router.navigate(["/" + results.id]);
    }, error => {
      console.log(error);
    })
  }

}
