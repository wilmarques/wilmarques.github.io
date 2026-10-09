import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import PostAttributes from '../../post-attributes';
import { SeoService } from '../../seo';

@Component({
  selector: 'app-blog-post',
  imports: [AsyncPipe, MarkdownComponent, RouterLink],
  template: `
    @if (post$ | async; as post) {
    <article class="blog-post">
      <a routerLink="/blog" class="back-link">&larr; Back to Blog</a>

      @if (post.attributes.coverImage) {
        <div class="post-hero-image">
          <img [src]="post.attributes.coverImage" [alt]="post.attributes.title" />
        </div>
      }

      <header class="post-header">
        <h1 class="post-title">{{ post.attributes.title }}</h1>
      </header>

      <div class="post-content">
        <analog-markdown [content]="post.content" />
      </div>
    </article>
    }
  `,
  styleUrl: './[slug].page.css',
})
export default class BlogPostComponent {
  private readonly seo = inject(SeoService);
  readonly post$ = injectContent<PostAttributes>('slug').pipe(
    tap((post) => this.seo.setPost(post.attributes as PostAttributes))
  );
}
