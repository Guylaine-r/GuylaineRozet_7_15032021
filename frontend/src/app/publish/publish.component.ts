import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  name : any;
  text : any;
  file : any;

  constructor() { }

  ngOnInit(): void {
  }

  send(): void {
    window.alert("Nom: " + this.name + "\nTexte: " + this.text + "\nFichier: " + this.file);
  }

}
