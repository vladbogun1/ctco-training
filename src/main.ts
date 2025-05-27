import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from "@angular/common/http";

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(
        appRoutes,
        withInMemoryScrolling({scrollPositionRestoration: 'top'})
      ),
      provideHttpClient()
    ]
})
  .catch(err => console.error(err));
