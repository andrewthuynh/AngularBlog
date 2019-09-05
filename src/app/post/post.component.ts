import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post;

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    let id = this.router.url.substring(6);
    this.post = this.postService.getPost(id);
  }

}
