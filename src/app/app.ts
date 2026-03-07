import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="site-header">
      <div class="header-inner">
        <a routerLink="/" class="logo">
          <span class="logo-bracket">&lt;</span>wil.marques<span class="logo-bracket">/&gt;</span>
        </a>
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/experience" routerLinkActive="active">Experience</a>
          <a routerLink="/blog" routerLinkActive="active">Blog</a>
          <a href="https://github.com/wilmarques" target="_blank" rel="noopener noreferrer" class="nav-icon" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://linkedin.com/in/wilmarques" target="_blank" rel="noopener noreferrer" class="nav-icon" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </nav>
      </div>
    </header>

    <main>
      <router-outlet />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <p>&copy; {{ currentYear }} Wiley (Wil) Marques. Built with <a href="https://analogjs.org" target="_blank" rel="noopener noreferrer">Analog</a>.</p>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* ===== Header ===== */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
    }

    .header-inner {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0.875rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      font-size: 1.125rem;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: -0.02em;
    }

    .logo:hover {
      color: #f1f5f9;
    }

    .logo-bracket {
      color: var(--color-accent);
      font-weight: 400;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.75rem;
    }

    .nav-links a {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      transition: color 0.2s ease;
      position: relative;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--color-accent);
    }

    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--color-accent);
      border-radius: 1px;
    }

    .nav-icon {
      display: flex;
      align-items: center;
    }

    .nav-icon::after {
      display: none !important;
    }

    /* ===== Main ===== */
    main {
      flex: 1;
      max-width: 1080px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      width: 100%;
    }

    /* ===== Footer ===== */
    .site-footer {
      border-top: 1px solid var(--color-border);
      margin-top: auto;
    }

    .footer-inner {
      max-width: 1080px;
      margin: 0 auto;
      padding: 1.5rem;
      text-align: center;
    }

    .footer-inner p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .footer-inner a {
      color: var(--color-text-secondary);
    }

    .footer-inner a:hover {
      color: var(--color-accent);
    }

    @media (max-width: 640px) {
      .nav-links {
        gap: 1rem;
      }
    }
  `,
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}
