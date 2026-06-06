import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-content">
        <p class="hero-greeting">Hi, I'm</p>
        <h1 class="hero-name">Wiley <span class="gradient-text">(Wil)</span> Marques</h1>
        <p class="hero-title">Software Engineer &middot; AI Architect &middot; Developer Experience Lead (Agentic SDLC)</p>
        <p class="hero-description">
          I build innovative solutions at the intersection of <strong>Artificial Intelligence</strong>,
          <strong>Developer Experience</strong>, and <strong>Agentic AI</strong>. Currently leading the
          AI-driven SDLC initiative at F1RST Digital Services (Santander Group), implementing agentic
          workflows and AI-DLC across the organization.
        </p>
        <div class="hero-cta">
          <a routerLink="/experience" class="btn-primary">View Experience</a>
          <a routerLink="/blog" class="btn-outline">Read Blog</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="code-window">
          <div class="code-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <pre class="code-content"><span class="code-keyword">const</span> <span class="code-var">wil</span> = {{ '{' }}
  <span class="code-key">role</span>: <span class="code-string">"Developer Experience Lead (Agentic SDLC)"</span>,
  <span class="code-key">company</span>: <span class="code-string">"F1RST Digital Services"</span>,
  <span class="code-key">focus</span>: [
    <span class="code-string">"AI"</span>,
    <span class="code-string">"DevEx"</span>,
    <span class="code-string">"Agentic AI"</span>,
  ],
  <span class="code-key">passion</span>: <span class="code-string">"AI-driven developer workflows"</span>,
{{ '}' }};</pre>
        </div>
      </div>
    </section>

    <section class="skills-section">
      <h2 class="section-title">What I Do</h2>
      <div class="skills-grid">
        <div class="skill-card">
          <div class="skill-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h3>AI & Agentic Systems</h3>
          <p>Architecting enterprise AI platforms and agentic workflows using ReAct agents, LLMs, and multi-agent architectures to automate the full development lifecycle.</p>
        </div>
        <div class="skill-card">
          <div class="skill-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <h3>Front-end Architecture</h3>
          <p>Designing scalable Angular frameworks and component libraries used across enterprise-scale applications.</p>
        </div>
        <div class="skill-card">
          <div class="skill-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Developer Experience</h3>
          <p>Building engineering communities and driving software quality through knowledge sharing and technical advocacy.</p>
        </div>
      </div>
    </section>

    <section class="highlights-section">
      <h2 class="section-title">Career Highlights</h2>
      <div class="highlights-grid">
        <div class="highlight-item">
          <span class="highlight-number">12+</span>
          <span class="highlight-label">Years in Software</span>
        </div>
        <div class="highlight-item">
          <span class="highlight-number">3+</span>
          <span class="highlight-label">Years in AI & DevEx</span>
        </div>
        <div class="highlight-item">
          <span class="highlight-number">5+</span>
          <span class="highlight-label">Years as Architect</span>
        </div>
      </div>
    </section>
  `,
  styles: `
    /* ===== Hero Section ===== */
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      padding: 4rem 0 5rem;
    }

    .hero-greeting {
      font-size: 1.125rem;
      color: var(--color-accent);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .hero-name {
      font-size: 3.25rem;
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.1;
      margin-bottom: 0.75rem;
    }

    .hero-title {
      font-size: 1.125rem;
      color: var(--color-text-muted);
      font-weight: 500;
      margin-bottom: 1.5rem;
    }

    .hero-description {
      font-size: 1.0625rem;
      line-height: 1.75;
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
    }

    .hero-description strong {
      color: var(--color-text);
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      padding: 0.75rem 1.75rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.9375rem;
      background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
      color: #0f172a;
      transition: all 0.2s ease;
    }

    .btn-primary:hover {
      color: #0f172a;
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3);
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      padding: 0.75rem 1.75rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.9375rem;
      border: 1px solid var(--color-border);
      color: var(--color-text);
      transition: all 0.2s ease;
    }

    .btn-outline:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
      background: var(--color-accent-subtle);
    }

    /* ===== Code Window ===== */
    .code-window {
      background: #0d1117;
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    }

    .code-dots {
      display: flex;
      gap: 0.5rem;
      padding: 0.875rem 1rem;
      border-bottom: 1px solid var(--color-border);
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }

    .code-content {
      padding: 1.25rem;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.8125rem;
      line-height: 1.8;
      margin: 0;
      color: #e6edf3;
      overflow-x: auto;
    }

    .code-keyword { color: #ff7b72; }
    .code-var { color: #79c0ff; }
    .code-key { color: #d2a8ff; }
    .code-string { color: #a5d6ff; }

    /* ===== Skills Section ===== */
    .skills-section {
      padding: 4rem 0;
      border-top: 1px solid var(--color-border);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .skill-card {
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      padding: 1.75rem;
      transition: all 0.3s ease;
    }

    .skill-card:hover {
      border-color: var(--color-accent);
      box-shadow: 0 0 24px rgba(56, 189, 248, 0.08);
      transform: translateY(-3px);
    }

    .skill-icon {
      color: var(--color-accent);
      margin-bottom: 1rem;
    }

    .skill-card h3 {
      margin-bottom: 0.5rem;
    }

    .skill-card p {
      font-size: 0.9375rem;
      margin-bottom: 0;
      line-height: 1.65;
    }

    /* ===== Highlights Section ===== */
    .highlights-section {
      padding: 4rem 0;
      border-top: 1px solid var(--color-border);
    }

    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .highlight-item {
      text-align: center;
      padding: 2rem;
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
    }

    .highlight-number {
      display: block;
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
      margin-bottom: 0.25rem;
    }

    .highlight-label {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      font-weight: 500;
    }

    /* ===== Responsive ===== */
    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 2rem 0 3rem;
      }

      .hero-name {
        font-size: 2.25rem;
      }

      .hero-visual {
        order: -1;
      }

      .skills-grid,
      .highlights-grid {
        grid-template-columns: 1fr;
      }

      .hero-cta {
        flex-direction: column;
      }

      .btn-primary,
      .btn-outline {
        text-align: center;
        justify-content: center;
      }
    }
  `,
})
export default class HomePageComponent {}
