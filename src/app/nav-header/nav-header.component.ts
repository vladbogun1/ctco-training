import {Component} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-nav-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    MatButton,
  ],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss'
})
export class NavHeaderComponent {

}
