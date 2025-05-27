import { Routes } from '@angular/router';
import {BlogPostsComponent} from "./features/blog-posts/blog-posts.component";
import {HomeComponent} from "./features/home/home.component";
import {PostViewComponent} from "./features/post-view/post-view.component";

// Enum to store the routes
export enum AppRoutes {
  Home = 'home',
  BlogPosts = 'posts',
  PostView = 'post',
}

// Array of routes
export const appRoutes: Routes = [
  { path: '', redirectTo: AppRoutes.Home, pathMatch: 'full' },
  { path: AppRoutes.Home, component: HomeComponent },
  { path: AppRoutes.BlogPosts, component: BlogPostsComponent },
  { path: `${AppRoutes.PostView}/:id`, component: PostViewComponent },
];
