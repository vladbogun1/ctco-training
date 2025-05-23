import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {PostDto} from "../../../core/models/post.model";
import {RouterLink} from "@angular/router";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-blog-post-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './blog-post-card.component.html',
  styleUrls: ['./blog-post-card.component.scss']
})
export class BlogPostCardComponent {
  @Input() post!: PostDto;
}
