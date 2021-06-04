import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postId : any;
  post : any;
  comment : any;

  constructor(private route: ActivatedRoute, public user: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params.post_id;
      this.loadPost();
    });
  }

  loadPost(): void {
    const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisl odio, tincidunt id imperdiet sit amet, ultricies quis metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit aliquet viverra. Aliquam ultrices tellus ut nunc rutrum ultricies. Fusce feugiat hendrerit risus, a lacinia lorem laoreet volutpat. Donec et porttitor justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse pulvinar rhoncus purus, vel posuere massa malesuada sit amet. Duis imperdiet volutpat risus eu mollis. Mauris vel placerat dui. Suspendisse nec nibh et ex egestas congue et id nulla.";
    const IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/303px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg";
    this.post = {
      id: this.postId,
      title: "Mon titre de post",
      img: IMG,
      text: LOREM_IPSUM,
      comments: [
        {
          author: "John Doe",
          text: LOREM_IPSUM
        },
        {
          author: "John Doe",
          text: LOREM_IPSUM
        },
        {
          author: "John Doe",
          text: LOREM_IPSUM
        }
      ]
    };
  }

  sendComment(): void {
    window.alert(this.comment);
  }

}
