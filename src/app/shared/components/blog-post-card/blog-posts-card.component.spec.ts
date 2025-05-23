import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogPostCardComponent } from "./blog-post-card.component";
import { PostDto } from "../../../core/models/post.model";

describe('BlogPostCardComponent', () => {
  let component: BlogPostCardComponent;
  let fixture: ComponentFixture<BlogPostCardComponent>;
  const mockPost: PostDto = {
    id: 1,
    userId: 1,
    title: 'Test Post',
    body: 'This is a test post'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostCardComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
