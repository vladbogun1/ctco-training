import { Routes } from '@angular/router';
import {BlogPostsComponent} from "./features/blog-posts/blog-posts.component";
import {HomeComponent} from "./features/home/home.component";
import {PostViewComponent} from "./features/post-view/post-view.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: BlogPostsComponent },
  { path: 'post/:id', component: PostViewComponent },
];
