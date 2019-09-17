import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import postSample from '../assets/postSample';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts = postSample;
  pageNumber: number = 1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20];

  index = this.posts.length;
  postChange: Subject<Object> = new Subject<Object>();

  loadPosts() {
    return this.http.get('/assets/posts.json');
  }

  addPost(post) {
    post.id = this.index;
    post.date = new Date();
    this.posts.push(post);
    this.index++;
  }

  putPost(post) {
    let postIndex = this.posts.findIndex(obj => obj.id == post.id);
    post.date = new Date();
    this.posts[postIndex] = post;
    console.log(postIndex);
    return this.posts;
    
  }

  deletePost(id) {
    this.posts = this.posts.filter(function (post) {
      return post.id !== id;
    });
    this.postChange.next(this.posts);
    return this.posts;
  }

  getPost(id) {
    return this.posts.find(post => post.id == id);
  }

  getPosts() {
    return this.posts;
  }

  getPostsPaginated(pageSize, pageNumber) {
    --pageNumber;
    return this.posts.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  }

  sortByDateDesc() {
    this.posts.sort(function (a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }
  sortByDateAsc() {
    this.posts.sort(function (a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }
  sortByTitleDesc() {
    this.posts.sort(function (a, b) {
      a = a.title;
      b = b.title;
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }
  sortByTitleAsc() {
    this.posts.sort(function (a, b) {
      a = a.title;
      b = b.title;
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  searchPostsByTitle(query) {
    this.posts = postSample.filter(function (post) {
      return post.title = query;
    });
    this.pageNumber = 1;
  }

  constructor(private http: HttpClient) { }
}
