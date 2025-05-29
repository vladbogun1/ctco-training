import { Routes } from '@angular/router';
import { BlogPostsComponent } from "./features/blog-posts/blog-posts.component";
import { HomeComponent } from "./features/home/home.component";
import { PostViewComponent } from "./features/post-view/post-view.component";
import {
  GuestBookListViewComponent
} from "./features/guest-book/views/guest-book-list-view/guest-book-list-view.component";
import {
  GuestBookFormViewComponent
} from "./features/guest-book/views/guest-book-form-view/guest-book-form-view.component";

// Enum to store the routes
export enum AppRoutes {
  Home = 'home',
  BlogPosts = 'posts',
  PostView = 'post',
  GuestBook = 'guest-book',
}

// Array of routes
export const appRoutes: Routes = [
  { path: '', redirectTo: AppRoutes.Home, pathMatch: 'full' },
  { path: AppRoutes.Home, component: HomeComponent },
  { path: AppRoutes.BlogPosts, component: BlogPostsComponent },
  { path: `${AppRoutes.PostView}/:id`, component: PostViewComponent },

  {
    path: AppRoutes.GuestBook,
    children: [
      {
        path: '',
        component: GuestBookListViewComponent
      },
      {
        path: 'new',
        component: GuestBookFormViewComponent
      },
      {
        path: ':id',
        component: GuestBookListViewComponent
      }
    ]
  },
];
