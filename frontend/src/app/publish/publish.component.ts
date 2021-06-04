import { Component, OnInit } from '@angular/core';
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
  file : any;

  constructor(private backend: BackendService, private user: UserService) { }

  ngOnInit(): void {
  }

  send(): void {
    window.alert("Nom: " + this.name + "\nTexte: " + this.text + "\nFichier: " + this.file);
    /*let fileInput = document.getElementById("fileInput");
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.
    return;
    this.backend.addPost(this.user.getToken(), this.name, this.text, this.file).subscribe((result) => {
      console.log(result);
    }, error => {
      console.log(error);
      document.getElementById("test").innerHTML = error.error;
    })*/
  }

}
