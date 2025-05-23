import { Routes } from '@angular/router';
import {BlogPostsComponent} from "./blog-posts/blog-posts.component";
import {HomeComponent} from "./home/home.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: BlogPostsComponent },
];
