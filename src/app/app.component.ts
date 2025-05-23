
import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavHeaderComponent} from "./layout/nav-header/nav-header.component";
import {NavFooterComponent} from "./layout/nav-footer/nav-footer.component";
import {IconService} from "./core/services/icon-service/icon.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavHeaderComponent, NavFooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-template';

  constructor(
    readonly  iconService: IconService
  ) {}


  ngOnInit(): void {
    this.iconService.registerIcons();
  }
}
