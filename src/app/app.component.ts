import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavHeaderComponent} from "./layout/nav-header/nav-header.component";
import {NavFooterComponent} from "./layout/nav-footer/nav-footer.component";
import {IconService} from "./core/services/icon-service/icon.service";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavHeaderComponent,
    NavFooterComponent,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-template';

  constructor(
    readonly iconService: IconService
  ) {}


  ngOnInit(): void {
    this.iconService.registerIcons();
  }
}
