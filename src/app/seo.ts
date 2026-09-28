import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://wil.marques.dev';
export const SITE_NAME = 'Wiley (Wil) Marques';

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  return SITE_URL + (pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`);
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  setPost(post: {
    title: string;
    slug: string;
    description: string;
    coverImage?: string;
  }): void {
    const url = absoluteUrl(`/blog/${post.slug}`);
    const image = post.coverImage ? absoluteUrl(post.coverImage) : undefined;
    const datePublished = post.slug.match(/^\d{4}-\d{2}-\d{2}/)?.[0];

    this.title.setTitle(`${post.title} - ${SITE_NAME}`);

    this.meta.updateTag({ name: 'description', content: post.description });
    this.meta.updateTag({ property: 'og:title', content: post.title });
    this.meta.updateTag({ property: 'og:description', content: post.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:image:alt', content: post.title });
    }
    if (datePublished) {
      this.meta.updateTag({
        property: 'article:published_time',
        content: datePublished,
      });
    }
    this.meta.updateTag({
      name: 'twitter:card',
      content: image ? 'summary_large_image' : 'summary',
    });
    this.meta.updateTag({ name: 'twitter:title', content: post.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: post.description,
    });
    if (image) {
      this.meta.updateTag({ name: 'twitter:image', content: image });
    }

    let canonical = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    this.document.head.querySelector('#post-jsonld')?.remove();
    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', 'post-jsonld');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: url,
      ...(image ? { image } : {}),
      ...(datePublished ? { datePublished } : {}),
      author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    });
    this.document.head.appendChild(script);
  }
}
