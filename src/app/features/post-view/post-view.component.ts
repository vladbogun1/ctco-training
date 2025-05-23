import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api-service/api.service";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Params} from "@angular/router/router_module.d-BivBj8FC";
import {PostDto} from "../../core/models/post.model";
import {JsonPipe} from "@angular/common";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-post-view',
  imports: [
    JsonPipe
  ],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent implements OnInit, OnDestroy {
  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {}

  private post$!: Subscription;
  protected post!: PostDto;


  ngOnInit(): void {
    this.getParamAndFetchPost();
  }

  ngOnDestroy(): void {
    this.post$.unsubscribe();
  }

  getParamAndFetchPost(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        const postId: number = +params['id'];
        return this.apiService.getFullPostById(postId);
      })
    ).subscribe((post: PostDto) => this.post = post);
  }
}
