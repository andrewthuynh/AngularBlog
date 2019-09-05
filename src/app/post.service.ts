import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts = [
    //*
    {
      id: 0,
      title: "Post 1",
      date: "12:21:22 PM 8/30/19",
      author: "Andrew",
      body: "This is my 1st post."
    },
    {
      id: 1,
      title: "Post 2",
      date: "12:55:01 PM 8/30/19",
      author: "Sarah",
      body: "This is my 2nd post."
    },
    {
      id: 2,
      title: "Post 3",
      date: "1:52:15 PM 8/31/19",
      author: "John",
      body: "This is my 3rd post."
    },
    {
      id: 3,
      title: "Post 4",
      date: "2:37:12 PM 8/31/19",
      author: "Andrew",
      body: "This is my 4th post."
    },
    {
      id: 4,
      title: "Post 5",
      date: "12:21:22 PM 8/30/19",
      author: "Andrew",
      body: "This is my 5th post."
    },
    {
      id: 5,
      title: "Post 6",
      date: "12:55:01 PM 8/30/19",
      author: "Sarah",
      body: "This is my 6th post."
    },
    {
      id: 6,
      title: "Post 7",
      date: "1:52:15 PM 8/31/19",
      author: "John",
      body: "This is my 7th post."
    },
    {
      id: 7,
      title: "Post 8",
      date: "2:37:12 PM 8/31/19",
      author: "Andrew",
      body: "This is my 8th post."
    },
    {
      id: 8,
      title: "Post 9",
      date: "12:21:22 PM 8/30/19",
      author: "Andrew",
      body: "This is my 9th post."
    },
    {
      id: 9,
      title: "Post 10",
      date: "12:55:01 PM 8/30/19",
      author: "Sarah",
      body: "This is my 10th post."
    },
    {
      id: 10,
      title: "Post 11",
      date: "1:52:15 PM 8/31/19",
      author: "John",
      body: "This is my 11th post."
    },
    {
      id: 11,
      title: "Post 12",
      date: "2:37:12 PM 8/31/19",
      author: "Andrew",
      body: "This is my 12th post."
    },
    //*/
  ];
  index = this.posts.length;
  postChange: Subject<Object> = new Subject<Object>();

  addPost(post){
    post.id = this.index;
    post.date = new Date().toLocaleString();
    this.posts.push(post);
    this.index++;
  }

  putPost(post){
    let postIndex = this.posts.findIndex(obj => obj.id == post.id);
    this.posts[postIndex] = post;
    return this.posts;
  }

  deletePost(id){
    this.posts = this.posts.filter(function(post){
      return post.id !== id;
    });
    this.postChange.next(this.posts);
    return this.posts;
  }

  getPost(id){
    return this.posts.find(post => post.id == id);
  }

  getPosts(){
    return this.posts;
  }

  getPostsPaginated(pageSize, pageNumber){
    --pageNumber;
    return this.posts.slice(pageNumber*pageSize, (pageNumber+1)*pageSize);
  }

  constructor() { }
}
