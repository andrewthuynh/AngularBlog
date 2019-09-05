import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';
import {PostFormComponent} from './post-form/post-form.component';
import {PostComponent} from './post/post.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'new', component: PostFormComponent},
  {path: 'edit/:id,', component: PostFormComponent},
  {path: 'post/:id', component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
