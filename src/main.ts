import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {appRoutes} from './app/app-routes';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig} from "@angular/core";
import {provideStore} from "@ngrx/store";
import {postsReducer} from "./app/core/store/posts/posts.reducer";
import {provideEffects} from "@ngrx/effects";
import {PostsEffects} from "./app/core/store/posts/posts.effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideHttpClient(),
    provideStore({
      posts: postsReducer
    }),
    provideEffects([PostsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ]
};



bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
