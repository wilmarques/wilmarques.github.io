import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import PostAttributes from '../../post-attributes';

export const routeMeta: RouteMeta = {
  title: 'Blog - Wiley (Wil) Marques',
  meta: [
    { name: 'description', content: 'Blog posts by Wiley (Wil) Marques' },
    { property: 'og:title', content: 'Blog - Wiley (Wil) Marques' },
  ],
};

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  template: `
    <section class="blog-hero">
      <h1>Blog <span class="gradient-text">Archive</span></h1>
      <p class="blog-intro">Thoughts on software engineering, AI, and developer experience.</p>
    </section>

    <section class="posts-grid">
      @for (post of posts; track post.attributes.slug) {
        <a [routerLink]="['/blog/', post.attributes.slug]" class="post-card">
          @if (post.attributes.coverImage) {
            <div class="post-cover">
              <img [src]="post.attributes.coverImage" [alt]="post.attributes.title" loading="lazy" />
            </div>
          }
          <div class="post-body">
            <h2 class="post-title">{{ post.attributes.title }}</h2>
            <p class="post-desc">{{ post.attributes.description }}</p>
            <span class="post-read-more">Read more &rarr;</span>
          </div>
        </a>
      }
    </section>
  `,
  styles: `
    .blog-hero {
      padding: 3rem 0 2rem;
    }

    .blog-hero h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .blog-intro {
      font-size: 1.0625rem;
      color: var(--color-text-secondary);
    }

    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
      padding-bottom: 4rem;
    }

    .post-card {
      display: flex;
      flex-direction: column;
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      overflow: hidden;
      transition: all 0.3s ease;
      color: inherit;
    }

    .post-card:hover {
      border-color: var(--color-accent);
      box-shadow: 0 0 24px rgba(56, 189, 248, 0.08);
      transform: translateY(-3px);
      color: inherit;
    }

    .post-cover {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .post-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .post-card:hover .post-cover img {
      transform: scale(1.05);
    }

    .post-body {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .post-title {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .post-desc {
      font-size: 0.9375rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
      flex: 1;
    }

    .post-read-more {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-accent);
      margin-top: 0.5rem;
    }

    .post-card:hover .post-read-more {
      color: var(--color-accent-hover);
    }

    @media (max-width: 640px) {
      .posts-grid {
        grid-template-columns: 1fr;
      }

      .blog-hero h1 {
        font-size: 2rem;
      }
    }
  `,
})
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>();
}
