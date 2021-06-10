import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  posts : any;

  constructor(private backend : BackendService) { }

  ngOnInit(): void {
    this.posts = [];
    this.backend.getAllPosts().subscribe(results => {
      this.posts = results;
    });
    /*window.addEventListener("scroll", (event) => {
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Fetching posts
      }
    });*/
  }

}
