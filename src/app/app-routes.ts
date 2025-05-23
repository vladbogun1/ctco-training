import { Routes } from '@angular/router';
import {BlogPostsComponent} from "./blog-posts/blog-posts.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: BlogPostsComponent },
];
