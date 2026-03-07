import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouterLink } from '@angular/router';

import PostAttributes from '../../post-attributes';

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
        @if (post.attributes.description) {
          <p class="post-subtitle">{{ post.attributes.description }}</p>
        }
      </header>

      <div class="post-content">
        <analog-markdown [content]="post.content" />
      </div>
    </article>
    }
  `,
  styles: `
    .blog-post {
      max-width: 720px;
      margin: 0 auto;
      padding: 2rem 0 4rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
      color: var(--color-text-muted);
      margin-bottom: 2rem;
      transition: color 0.2s ease;
    }

    .back-link:hover {
      color: var(--color-accent);
    }

    .post-hero-image {
      border-radius: 0.75rem;
      overflow: hidden;
      margin-bottom: 2rem;
      border: 1px solid var(--color-border);
    }

    .post-hero-image img {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      display: block;
    }

    .post-header {
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-border);
    }

    .post-title {
      font-size: 2.25rem;
      line-height: 1.2;
      margin-bottom: 0.75rem;
    }

    .post-subtitle {
      font-size: 1.125rem;
      color: var(--color-text-muted);
      line-height: 1.6;
    }

    .post-content {
      font-size: 1.0625rem;
      line-height: 1.8;
    }

    @media (max-width: 640px) {
      .post-title {
        font-size: 1.75rem;
      }
    }
  `,
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>('slug');
}
