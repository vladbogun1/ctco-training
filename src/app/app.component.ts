
import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavHeaderComponent} from "./nav-header/nav-header.component";
import {NavFooterComponent} from "./nav-footer/nav-footer.component";
import {IconService} from "./services/icon-service/icon.service";

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
