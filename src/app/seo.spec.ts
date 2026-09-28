import { TestBed } from '@angular/core/testing';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { absoluteUrl, SeoService, SITE_URL } from './seo';

describe('absoluteUrl', () => {
  it('prefixes relative paths with SITE_URL', () => {
    expect(absoluteUrl('/images/foo.png')).toBe(`${SITE_URL}/images/foo.png`);
  });

  it('returns https URLs unchanged', () => {
    const url = 'https://example.com/img.png';
    expect(absoluteUrl(url)).toBe(url);
  });
});

describe('SeoService', () => {
  let seo: SeoService;

  const post = {
    title: 'What If... Devin Ran on My Phone?',
    slug: '2026-09-27-what-if-devin-on-my-phone',
    description: 'Pocket Linux computer experiment.',
    coverImage: '/images/what-if-devin-on-my-phone.png',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    seo = TestBed.inject(SeoService);
  });

  it('sets title, meta, canonical, and JSON-LD for a post', () => {
    seo.setPost(post);

    const url = `${SITE_URL}/blog/${post.slug}`;
    const image = `${SITE_URL}/images/what-if-devin-on-my-phone.png`;

    expect(document.title).toBe(`${post.title} - Wiley (Wil) Marques`);
    expect(
      document.head.querySelector('meta[property="og:title"]')?.getAttribute('content')
    ).toBe(post.title);
    expect(
      document.head.querySelector('meta[property="og:description"]')?.getAttribute('content')
    ).toBe(post.description);
    expect(
      document.head.querySelector('meta[property="og:url"]')?.getAttribute('content')
    ).toBe(url);
    expect(
      document.head.querySelector('meta[property="og:type"]')?.getAttribute('content')
    ).toBe('article');
    expect(
      document.head.querySelector('meta[property="og:image"]')?.getAttribute('content')
    ).toBe(image);
    expect(
      document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content')
    ).toBe('summary_large_image');
    expect(
      document.head.querySelector('meta[name="twitter:image"]')?.getAttribute('content')
    ).toBe(image);
    expect(
      document.head
        .querySelector('meta[property="article:published_time"]')
        ?.getAttribute('content')
    ).toBe('2026-09-27');
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe(url);

    const jsonld = document.head.querySelector('script#post-jsonld');
    expect(jsonld).toBeTruthy();
    const data = JSON.parse(jsonld!.textContent!);
    expect(data['@type']).toBe('BlogPosting');
    expect(data.headline).toBe(post.title);
  });

  it('does not duplicate tags when called twice', () => {
    seo.setPost(post);
    seo.setPost({ ...post, title: 'Other Post' });

    expect(document.head.querySelectorAll('script#post-jsonld').length).toBe(1);
    expect(
      document.head.querySelectorAll('link[rel="canonical"]').length
    ).toBe(1);
    expect(
      document.head.querySelectorAll('meta[property="og:title"]').length
    ).toBe(1);
  });
});

describe('post cover images', () => {
  it('no content frontmatter coverImage uses SVG (social previews do not support SVG)', () => {
    const contentDir = resolve(process.cwd(), 'src/content');
    for (const file of readdirSync(contentDir).filter((f) => f.endsWith('.md'))) {
      const raw = readFileSync(resolve(contentDir, file), 'utf-8');
      const match = raw.match(/^coverImage:\s*(.+)$/m);
      if (match) {
        expect(
          match[1].trim().endsWith('.svg'),
          `${file}: social previews don't support SVG`
        ).toBe(false);
      }
    }
  });
});
