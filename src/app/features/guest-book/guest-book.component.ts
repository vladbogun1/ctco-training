import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-guest-book',
  standalone: true,
  imports: [
    RouterOutlet

  ],
  templateUrl: './guest-book.component.html',
  styleUrls: ['./guest-book.component.scss'],
})
export class GuestBookComponent{
  constructor() {}
}
