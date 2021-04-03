import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  posts : any;

  constructor() { }

  ngOnInit(): void {
    this.posts = [];
    this.fetchPosts();
    window.addEventListener("scroll", (event) => {
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.fetchPosts();
      }
    });
  }

  fetchPosts(): void {
    const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisl odio, tincidunt id imperdiet sit amet, ultricies quis metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit aliquet viverra. Aliquam ultrices tellus ut nunc rutrum ultricies. Fusce feugiat hendrerit risus, a lacinia lorem laoreet volutpat. Donec et porttitor justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse pulvinar rhoncus purus, vel posuere massa malesuada sit amet. Duis imperdiet volutpat risus eu mollis. Mauris vel placerat dui. Suspendisse nec nibh et ex egestas congue et id nulla.";
    const IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/303px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg";
    for(let i = 0; i < 10; ++i) {
      this.posts.push({
          title: "Mon titre de post",
          img: IMG,
          text: LOREM_IPSUM
        }
      );
    }
  }

}
