import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogPostsComponent } from './blog-posts.component';
import { ApiService } from '../../core/services/api-service/api.service';
import { BlogPostCardComponent } from '../../shared/components/blog-post-card/blog-post-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';

describe('BlogPostsComponent', () => {
  let component: BlogPostsComponent;
  let fixture: ComponentFixture<BlogPostsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getAllPosts']);
    apiServiceSpy.getAllPosts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        BlogPostsComponent,
        BlogPostCardComponent,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (component['posts$']) {
      component['posts$'].unsubscribe();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
