import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconAnchor} from "@angular/material/button";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-nav-footer',
  imports: [
    MatToolbar,
    MatIconAnchor,
    MatIcon
  ],
  templateUrl: './nav-footer.component.html',
  styleUrl: './nav-footer.component.scss'
})
export class NavFooterComponent {
  readonly year = new Date().getFullYear();
}
