import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { FormBuilder } from '@angular/forms';
import { Post } from '../post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  model = new Post('', '', '');
  temp;

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {

  }

  onSubmit() {
    if (this.router.url.substring(0, 5) === '/edit') {
      this.postService.putPost(this.model);
    }
    else {
      this.postService.addPost(this.model);
    }
    this.router.navigateByUrl('');
  }

  getPost(id) {
    //this.model = this.postService.getPost(id);
    this.temp = this.postService.getPost(id);
    this.model = new Post(this.temp.title, this.temp.author, this.temp.body, this.temp.id);
  }

  ngOnInit() {
    if (this.router.url.substring(0, 5) === '/edit') {
      this.getPost(this.router.url.substring(6));
    }
  }

}
