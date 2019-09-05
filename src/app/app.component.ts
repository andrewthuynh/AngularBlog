import { Component } from '@angular/core';
import {PostService} from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Blog';

  addPost(post){
    window.alert('Your post has been uploaded.');
    this.postService.addPost(post);
  }

  constructor(
    private postService: PostService,
  ){ }
}
