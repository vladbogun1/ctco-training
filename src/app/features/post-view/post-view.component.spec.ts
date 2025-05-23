import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewComponent } from './post-view.component';
import {ApiService} from "../../core/services/api-service/api.service";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {PostDto} from "../../core/models/post.model";

describe('PostViewComponent', () => {
  let component: PostViewComponent;
  let fixture: ComponentFixture<PostViewComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockPost: PostDto = {
    id: 1,
    userId: 1,
    title: 'Test Post',
    body: 'This is a test post'
  };


  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getFullPostById']);

    await TestBed.configureTestingModule({
      imports: [PostViewComponent],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    apiService.getFullPostById.and.returnValue(of(mockPost));

    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
