import { Component, OnInit, Inject } from '@angular/core';
import { PostService } from '../post.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
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
export class PostListComponent implements OnInit {

  posts;
  subscription;
  pageNumber: number = 1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5,10,20];

  constructor(
    private postService: PostService,
    public dialog: MatDialog,
    private router: Router
  ) { 
    this.subscription = postService.postChange.subscribe((value) => { 
      this.posts = postService.getPostsPaginated(this.pageSize, this.pageNumber)
    });
  }

  editPost(postId){
    this.router.navigate(['edit', postId]);
  }

  openDialog(postId, postTitle) {
    
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '250px';
    
    dialogConfig.data = {
      id: postId,
      title: postTitle
    };

    this.dialog.open(DeleteDialogModalComponent, dialogConfig);
  }

  ngOnInit() {
    this.posts = this.postService.getPostsPaginated(this.pageSize, this.pageNumber);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPageEvent(event:PageEvent){
    this.pageNumber = event.pageIndex+1;
    this.pageSize = event.pageSize;
    this.posts = this.postService.getPostsPaginated(this.pageSize, this.pageNumber);
  }

}

@Component({
  selector: 'app-delete-dialog-modal',
  templateUrl: './delete-dialog-modal.component.html',
})
export class DeleteDialogModalComponent {

  id: number;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private postService: PostService,
  ) { 
    this.id = data.id;
    this.title = data.title;
  }

  deletePost(id) {
    console.log(this.postService.deletePost(id));
  }

}

