import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api-service/api.service";
import {Subscription} from "rxjs";
import {PostDto} from "../../core/models/post.model";
import {JsonPipe} from "@angular/common";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-blog-posts',
  imports: [
    JsonPipe
  ],
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss'
})
export class BlogPostsComponent implements OnInit, OnDestroy {
  constructor(readonly apiService: ApiService) { }

  posts$!: Subscription;
  posts: PostDto[] = [];

  ngOnInit(): void {
    this.posts$ = this.apiService.getAllPosts().subscribe(
      (posts) => this.posts = posts
    );
  }

  ngOnDestroy(): void {
    this.posts$.unsubscribe();
  }

}
