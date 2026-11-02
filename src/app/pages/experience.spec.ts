import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import ExperiencePageComponent from './experience.page';

describe('ExperiencePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencePageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function renderPage(): HTMLElement {
    const fixture = TestBed.createComponent(ExperiencePageComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('leads with selected solutions and keeps career history available', () => {
    const page = renderPage();
    expect(page.querySelector('h1')?.textContent).toContain('AI Solutions Architect');
    expect(page.querySelectorAll('.solution-card')).toHaveLength(2);
    expect(page.textContent).not.toContain('Global AI Platform');
    const sections = Array.from(page.querySelectorAll('section'));
    expect(sections.indexOf(page.querySelector('#selected-solutions')!))
      .toBeLessThan(sections.indexOf(page.querySelector('.timeline')!));
    expect(page.querySelector('.timeline')?.textContent).toContain('Santander Group');
    expect(page.querySelectorAll('.role-title')).toHaveLength(8);
    expect(page.textContent).not.toContain('Colégio Singular');
    expect(page.textContent).not.toContain('IT Technician');
    expect(page.querySelector('details summary')?.textContent).toContain('2012–2018');
    expect(page.querySelector('details')?.textContent).toContain('Hexagon IT Solutions');
    expect(page.querySelector('.earlier-highlight')?.textContent).toContain('50 SAMU operators');
    expect(page.querySelector('.timeline')?.textContent).toContain('Sep 2024 - Present');
    expect(page.querySelector('.timeline')?.textContent).not.toMatch(/\d+ years? \d+ months?/);
  });

  it('describes language usage without inventing proficiency or undefined metrics', () => {
    const page = renderPage();
    const languages = page.querySelector('.company-header .company-languages')?.textContent;
    expect(languages).toContain('English and Spanish');
    expect(languages).not.toMatch(/almost daily|occasionally/);
    expect(languages).not.toMatch(/fluent|native|professional proficiency/i);
    expect(page.querySelector('.language-context')).toBeNull();
    expect(page.textContent).not.toMatch(/80%|90%/);
  });

  it('links to selected work and contact destinations without a public work section', () => {
    const page = renderPage();
    expect(page.querySelector('a[href="#selected-solutions"]')).toBeTruthy();
    expect(page.querySelector('.writing-section')).toBeNull();
    expect(page.textContent).not.toContain('Public work');
    expect(page.textContent).not.toContain('Experiments & technical writing');
    expect(page.querySelector('a[href^="/blog/"]')).toBeNull();
    expect(page.querySelector('.contact-section a')?.getAttribute('href'))
      .toBe('https://linkedin.com/in/wilmarquesdev');
  });
});
