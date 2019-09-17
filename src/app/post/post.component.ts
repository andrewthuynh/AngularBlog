import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import {Router} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(750)),
    ]),
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
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
