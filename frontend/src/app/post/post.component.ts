import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
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
  comments : any;
  moderator : boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, public user: UserService, public backend: BackendService) { }

  ngOnInit(): void {
    this.comments = [];
    this.route.params.subscribe(params => {
      this.postId = params.postId;
      this.backend.getPost(this.postId).subscribe(post => {
        this.post = post;
      });
      this.backend.getPostComments(this.postId).subscribe(comments => {
        this.comments = comments;
      })
      this.backend.isModerator().subscribe(results => {
        this.moderator = results.isModerator;
      });
    });
  }

  sendComment(): void {
    window.alert(this.comment);
  }

  deleteComment(id) {
    this.backend.deleteComment(id).subscribe(results => {
      window.alert("Commentaire supprimé avec succès!");
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  deletePost() {
    this.backend.deletePost(this.postId).subscribe(results => {
      this.router.navigate(["/"]);
    });
  }

}
