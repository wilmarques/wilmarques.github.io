import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'AI Solutions & Experience - Wiley (Wil) Marques',
  meta: [
    { name: 'description', content: 'Enterprise AI architecture, agentic SDLC and developer adoption. Explore Wiley Marques’ work at Santander and his customer-facing delivery experience.' },
    { property: 'og:title', content: 'AI Solutions & Experience - Wiley (Wil) Marques' },
    { property: 'og:description', content: 'Enterprise AI architecture, agentic SDLC and developer adoption. Explore Wiley Marques’ work at Santander and his customer-facing delivery experience.' },
  ],
};

interface Role {
  title: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

interface SkillGroup {
  name: string;
  skills: string[];
}

interface Company {
  name: string;
  note?: string;
  location?: string;
  roles: Role[];
}

@Component({
  selector: 'app-experience',
  imports: [NgTemplateOutlet, RouterLink],
  template: `
    <section class="experience-hero" aria-labelledby="experience-title">
      <p class="eyebrow">Wiley (Wil) Marques / Experience</p>
      <h1 id="experience-title">AI Solutions Architect<br>& <span class="gradient-text">Agentic SDLC Lead</span></h1>
      <div class="experience-intro">
        <p>
          I design enterprise AI solutions and agentic workflows, and help engineering teams adopt them.
          At F1RST Digital Services, part of Santander Group, I lead the AI-driven software development
          lifecycle initiative in Brazil.
        </p>
        <p class="hero-context">Software development since 2012. Architecture, hands-on delivery and developer enablement.</p>
      </div>
      <div class="experience-actions">
        <a class="btn primary-action" href="#selected-solutions">Explore selected solutions <span aria-hidden="true">↓</span></a>
        <a class="text-link" href="https://linkedin.com/in/wilmarquesdev">Connect on LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
      <ul class="evidence-strip" aria-label="Experience highlights">
        <li><strong>Enterprise AI</strong><span>Solutions architected for Santander Group</span></li>
        <li><strong>Agent adoption</strong><span>GitHub Copilot and Devin rollout and enablement</span></li>
        <li><strong>Modernization</strong><span>Repository upgrades across Java, Angular and Python</span></li>
      </ul>
    </section>

    <section id="selected-solutions" class="solutions-section" aria-labelledby="solutions-title">
      <p class="eyebrow">Selected work / Santander</p>
      <h2 id="solutions-title" class="section-title">Agentic solutions & adoption</h2>
      <div class="solutions-grid">
        @for (solution of solutions; track solution.title) {
          <article class="solution-card">
            <p class="solution-category">{{ solution.category }}</p>
            <h3>{{ solution.title }}</h3>
            <p>{{ solution.context }}</p>
            <dl>
              <dt>My contribution</dt>
              <dd>{{ solution.contribution }}</dd>
              <dt>Delivery & scope</dt>
              <dd>{{ solution.delivery }}</dd>
            </dl>
          </article>
        }
      </div>
    </section>

    <ng-template #companyRoles let-company>
      @for (role of company.roles; track role.title) {
        <article class="role-card">
          <div class="role-indicator" aria-hidden="true">
            <div class="role-dot"></div>
            @if (!$last) { <div class="role-line"></div> }
          </div>
          <div class="role-content">
            <h4 class="role-title">{{ role.title }}</h4>
            <div class="role-meta">
              <span>{{ role.period }}</span>
              <span class="meta-separator" aria-hidden="true">&middot;</span>
              <span>{{ role.location }}</span>
            </div>
            <ul class="role-description">
              @for (item of role.description; track $index) { <li>{{ item }}</li> }
            </ul>
            <div class="role-skills">
              @for (skill of role.skills; track skill) { <span class="skill-tag">{{ skill }}</span> }
            </div>
          </div>
        </article>
      }
    </ng-template>

    <section class="timeline" aria-labelledby="career-title">
      <div>
        <p class="eyebrow">Career</p>
        <h2 id="career-title" class="section-title">Architecture, delivery & enablement</h2>
      </div>
      <div class="timeline-company">
        <div class="company-header">
          <h3 class="company-name">{{ currentCompany.name }} <span class="company-group">/ Santander Group</span></h3>
          <p class="company-note">{{ currentCompany.note }}</p>
          <p class="company-meta">Feb 2018 – Present · {{ currentCompany.location }}</p>
          <p class="company-languages">Collaborating with international teams in English and Spanish.</p>
        </div>
        <ng-container [ngTemplateOutlet]="companyRoles" [ngTemplateOutletContext]="{ $implicit: currentCompany }" />
      </div>
      <div class="earlier-experience">
        <h3>Earlier customer-facing & engineering experience</h3>
        <p class="earlier-highlight">
          At Hexagon IT Solutions, I worked on site with SAMU, CET and Polícia Civil de SP,
          translating operational needs into systems, coordinating deployments and training users.
          This included training around 50 SAMU operators.
        </p>
        <details>
          <summary>View earlier roles <span>2010–2018</span></summary>
          @for (company of earlierCompanies; track company.name) {
            <div class="timeline-company">
              <h3 class="company-name">{{ company.name }}</h3>
              <ng-container [ngTemplateOutlet]="companyRoles" [ngTemplateOutletContext]="{ $implicit: company }" />
            </div>
          }
        </details>
      </div>
    </section>

    <section class="skills-section" aria-labelledby="skills-title">
      <h2 id="skills-title" class="section-title">Technical capabilities</h2>
      <div class="skills-grid">
        @for (group of skillGroups; track group.name) {
          <div class="skill-group">
            <h3>{{ group.name }}</h3>
            <div class="role-skills">
              @for (skill of group.skills; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
      </div>
    </section>

    <section class="writing-section" aria-labelledby="writing-title">
      <p class="eyebrow">Public work</p>
      <h2 id="writing-title" class="section-title">Experiments & technical writing</h2>
      <p>Personal experiments with coding agents, separate from my enterprise work.</p>
      <div class="writing-grid">
        <a class="writing-card" routerLink="/blog/2026-10-09-what-if-devin-had-a-chat-app">
          <span class="solution-category">Integration experiment</span>
          <h3>Connecting a chat app to a coding agent <span aria-hidden="true">↗</span></h3>
          <p>Devin CLI, the Agent Client Protocol and a mobile chat interface.</p>
        </a>
        <a class="writing-card" routerLink="/blog/2026-09-27-what-if-devin-on-my-phone">
          <span class="solution-category">Developer environment experiment</span>
          <h3>Running a coding agent on Android <span aria-hidden="true">↗</span></h3>
          <p>Exploring a local agent workflow with Termux and Linux on a phone.</p>
        </a>
      </div>
    </section>

    <section class="contact-section" aria-labelledby="contact-title">
      <div>
        <p class="eyebrow">Work together</p>
        <h2 id="contact-title">Let’s talk about agentic solutions.</h2>
        <p>Enterprise AI architecture, developer workflows and technical adoption.</p>
        <a class="btn primary-action" href="https://linkedin.com/in/wilmarquesdev">Connect on LinkedIn <span aria-hidden="true">↗</span></a>
        <a class="text-link" href="https://github.com/wilmarques">Explore my GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    section[id] {
      scroll-margin-top: 6rem;
    }

    a:focus-visible,
    summary:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 5px;
      border-radius: 0.25rem;
    }

    .eyebrow,
    .solution-category {
      color: var(--color-accent);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .experience-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.25rem;
      margin-top: 1.75rem;
    }

    .primary-action {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-bg);
      font-weight: 600;
    }

    .primary-action:hover {
      background: var(--color-accent-hover);
      color: var(--color-bg);
    }

    .text-link {
      font-size: 0.875rem;
      font-weight: 500;
      display: inline-block;
    }

    .evidence-strip {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      padding: 1.5rem 0;
      margin: 2.5rem 0 0;
      list-style: none;
      border-block: 1px solid var(--color-border);
      gap: 1.5rem;
    }

    .evidence-strip strong,
    .evidence-strip span {
      display: block;
    }

    .evidence-strip strong {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .evidence-strip span {
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }

    .solutions-section,
    .writing-section {
      padding: 1rem 0 4rem;
    }

    .solutions-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .solution-card,
    .writing-card {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      background: var(--color-bg-card);
    }

    .solution-card h3 {
      font-size: 1.125rem;
    }

    .solution-card p:not(.solution-category),
    .solution-card dd,
    .writing-card p {
      font-size: 0.9375rem;
      line-height: 1.65;
    }

    .solution-card dl,
    .writing-card p {
      margin-bottom: 0;
    }

    .solution-card dt {
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 1.25rem;
      margin-bottom: 0.375rem;
      color: var(--color-text);
    }

    .solution-card dd {
      margin: 0;
      color: #cbd5e1;
    }

    .company-group {
      color: var(--color-text-secondary);
      font-weight: 400;
    }

    .earlier-experience {
      padding-top: 0.5rem;
    }

    .earlier-highlight {
      max-width: 800px;
    }

    details {
      border-block: 1px solid var(--color-border);
    }

    summary {
      padding: 1rem 0;
      cursor: pointer;
      color: var(--color-accent);
      font-weight: 500;
    }

    summary span {
      margin-left: 0.75rem;
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }

    details .timeline-company {
      margin: 1rem 0 2rem;
    }

    details .company-name {
      font-size: 1.125rem;
    }

    .writing-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .writing-card:hover {
      border-color: var(--color-accent);
    }

    .writing-card h3 {
      font-size: 1.125rem;
      margin-top: 0.75rem;
    }

    .contact-section {
      border-top: 1px solid var(--color-border);
      padding: 2.5rem 0;
    }

    .contact-section h2 {
      font-size: 1.5rem;
    }

    .contact-section .text-link {
      margin: 1rem 0 0 1rem;
    }

    /* ===== Experience Hero ===== */
    .experience-hero {
      padding: 2rem 0 3rem;
    }

    .experience-hero h1 {
      font-size: clamp(2rem, 4.5vw, 3.25rem);
      margin-bottom: 1.5rem;
      line-height: 1.15;
      max-width: 850px;
    }

    .experience-intro p {
      font-size: 1.0625rem;
      line-height: 1.75;
      color: var(--color-text-secondary);
      margin: 0 0 0.75rem;
      max-width: 740px;
    }

    .experience-intro .hero-context {
      font-size: 0.875rem;
    }

    .experience-intro p:last-child {
      margin-bottom: 0;
    }

    /* ===== Timeline ===== */
    .timeline {
      padding: 0 0 4rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    /* ===== Company ===== */
    .timeline-company {
      position: relative;
    }

    .company-header {
      margin-bottom: 1.5rem;
    }

    .company-name {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }

    .company-note {
      display: block;
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      font-style: italic;
      margin-bottom: 0.25rem;
    }

    .company-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      margin: 0;
    }

    .company-languages {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      margin: 0.25rem 0 0;
    }

    .meta-separator {
      color: var(--color-border);
    }

    /* ===== Role Card ===== */
    .role-card {
      display: flex;
      gap: 1.25rem;
      position: relative;
    }

    .role-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.375rem;
      flex-shrink: 0;
    }

    .role-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--color-accent);
      border: 2px solid var(--color-bg);
      box-shadow: 0 0 0 2px var(--color-accent);
      flex-shrink: 0;
    }

    .role-line {
      width: 2px;
      flex: 1;
      background: var(--color-border);
      margin: 0.5rem 0;
    }

    .role-content {
      flex: 1;
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
      transition: all 0.2s ease;
    }

    .role-content:hover {
      border-color: rgba(56, 189, 248, 0.3);
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.06);
    }

    .role-title {
      font-size: 1.125rem;
      margin-bottom: 0.375rem;
    }

    .role-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      margin-bottom: 0.75rem;
    }

    .role-description {
      margin: 0 0 1rem;
      padding-left: 1.1rem;
    }

    .role-description li {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: #cbd5e1;
      margin: 0 0 0.4rem;
    }

    .role-description li:last-child {
      margin-bottom: 0;
    }

    .role-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    }

    .skill-tag {
      display: inline-block;
      padding: 0.2rem 0.625rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      background: var(--color-accent-subtle);
      color: var(--color-accent);
      border: 1px solid rgba(56, 189, 248, 0.15);
    }

    /* ===== Key Skills ===== */
    .skills-section {
      padding: 0 0 4rem;
    }

    .section-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
    }

    .skill-group {
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      padding: 1.5rem;
    }

    .skill-group h3 {
      font-size: 1rem;
      margin-bottom: 0.875rem;
    }

    /* ===== Responsive ===== */
    @media (max-width: 900px) {
      .solutions-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .skills-grid,
      .evidence-strip,
      .writing-grid {
        grid-template-columns: 1fr;
      }

      .experience-hero {
        padding-top: 1rem;
      }

      .company-group {
        display: block;
        font-size: 1.125rem;
        margin-top: 0.25rem;
      }

      .role-card {
        gap: 0.75rem;
      }

      .role-content {
        min-width: 0;
        padding: 1.125rem;
      }

      .contact-section .text-link {
        display: block;
        margin-left: 0;
      }

      .role-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.125rem;
      }

      .role-meta .meta-separator {
        display: none;
      }
    }
  `,
})
export default class ExperiencePageComponent {
  solutions = [
    {
      category: 'Workflow adoption',
      title: 'Agentic SDLC rollout',
      context: 'Introducing AI coding tools into Santander Brazil’s development workflows.',
      contribution: 'Led the rollout of GitHub Copilot, then Devin, combining environment setup, processes, workshops and stakeholder alignment.',
      delivery: 'Defined shared practices for coding agents using Markdown, Agent Skills and MCP to limit vendor lock-in. The broader SDLC initiative is ongoing.',
    },
    {
      category: 'Applied AI engineering',
      title: 'Repository modernization',
      context: 'Using AI to upgrade repositories built on internal frameworks.',
      contribution: 'Built a specification-driven modernization solution, starting with Java upgrades and extending it to Angular and Python.',
      delivery: 'Handled needs discovery and key technical decisions. Results in Brazil positioned the solution for a global rollout.',
    },
  ];

  skillGroups: SkillGroup[] = [
    {
      name: 'AI & Agentic Systems',
      skills: ['ReAct Agents', 'Multi-agent Architectures', 'Amazon Bedrock', 'MCP', 'Agent Skills', 'Specification Driven Development'],
    },
    {
      name: 'Architecture & Platforms',
      skills: ['Enterprise AI Architecture', 'Azure', 'AWS', 'Python', 'Java', 'Angular'],
    },
    {
      name: 'Developer Experience',
      skills: ['GitHub Copilot', 'Devin', 'AI-DLC', 'SDLC Automation', 'Technical Writing', 'Adoption Enablement'],
    },
    {
      name: 'Engineering & Technical Leadership',
      skills: ['TypeScript', 'C# / .NET', 'Technical Leadership', 'Stakeholder Management', 'Customer Discovery', 'Deployment Management'],
    },
  ];

  companies: Company[] = [
    {
      name: 'F1RST Digital Services',
      note: 'Previously known as Santander Tecnologia Brasil.',
      location: 'São Paulo, Brazil',
      roles: [
        {
          title: 'Developer Experience Lead (Agentic SDLC)',
          period: 'Sep 2024 - Present',
          location: 'São Paulo, Brazil',
          description: [
            'Lead the AI-driven SDLC initiative in Brazil, aligned with the Santander Group direction.',
            'Drove adoption of GitHub Copilot, then Devin, through environment setup, rollout processes and developer enablement.',
            'Defined shared practices for coding agents and their content using Markdown, Agent Skills and MCP to limit vendor lock-in.',
            'Coordinate rollout teams, training and workshops, aligning stakeholders as the initiative extends across the development lifecycle.',
          ],
          skills: ['GitHub Copilot', 'Devin', 'MCP', 'Agent Skills', 'AI-DLC', 'Adoption Enablement'],
        },
        {
          title: 'AI Architect',
          period: 'Jan 2024 - Sep 2024',
          location: 'São Paulo, Brazil',
          description: [
            'Architected enterprise AI solutions for Santander Group, owning needs discovery and key technical decisions.',
            'Built specification-driven repository modernization, starting with Java upgrades on internal frameworks and expanding to Angular and Python.',
            'Positioned the modernization solution for a global rollout after results in Brazil.',
          ],
          skills: ['Python', 'Java', 'Azure', 'AWS', 'Amazon Bedrock', 'ReAct Agents'],
        },
        {
          title: 'Developer Experience Expert',
          period: 'Mar 2023 - Dec 2023',
          location: 'São Paulo, Brazil',
          description: [
            'Led the Front-end Chapter, connecting engineering teams through regular meetings and platform workshops.',
            'Brought teams together on a shared telemetry solution.',
            'Started a shared Markdown knowledge portal for Chapters and Centers of Excellence, now also used as a source for AI agents.',
          ],
          skills: ['Developer Experience', 'Technical Writing', 'Knowledge Management', 'Platform Engineering'],
        },
        {
          title: 'Front-end Architect',
          period: 'Feb 2018 - Feb 2023',
          location: 'São Paulo, Brazil',
          description: [
            'Led, with the team, Angular 2+ definition, governance and adoption across Santander Brazil.',
            'Enabled squads building branch, customer service and internet banking tools through workshops, documentation and shared standards.',
            'Translated internal needs into platform requirements and matched squads with relevant accelerators and patterns.',
            'Aligned priorities with C-level stakeholders, including the CTO.',
          ],
          skills: ['Angular', 'Internal Platforms', 'Technical Writing', 'Stakeholder Management', 'Enablement'],
        },
      ],
    },
    {
      name: 'Vector ITC Group',
      roles: [
        {
          title: 'Technical Lead',
          period: 'Jun 2017 - Feb 2018',
          location: 'São Paulo, Brazil',
          description: [
            'Trained three AngularJS groups of about 15 people each, and helped select who to allocate at Santander.',
            'Worked inside Santander as a consultant in a Scrum squad, building internal systems from the Product Owner\'s needs.',
            'Became a front-end reference there, which led to an internal role.',
          ],
          skills: ['Angular', 'JavaScript', 'Leadership', 'Training', 'Consulting'],
        },
      ],
    },
    {
      name: 'Prosoft Tecnologia',
      roles: [
        {
          title: 'Web Developer',
          period: 'Oct 2015 - Jun 2017',
          location: 'São Paulo, Brazil',
          description: [
            'Built web applications in C#, AngularJS and JavaScript.',
            'Led a web system in AngularJS and trained the team on it.',
            'Became a front-end reference for the company, including developers coming from other technologies.',
          ],
          skills: ['C#', 'Angular', 'JavaScript', 'Technical Mentoring'],
        },
      ],
    },
    {
      name: 'Hexagon IT Solutions',
      roles: [
        {
          title: 'Solutions Analyst',
          period: 'Feb 2014 - Oct 2015',
          location: 'São Paulo, Brazil',
          description: [
            'Built desktop (Windows Forms and WPF), web (ASP.NET, KnockoutJS and AngularJS) and mobile solutions in C# and JavaScript.',
            'Worked inside SAMU, CET and Polícia Civil de SP.',
            'Implemented on site from the operational needs, managed teams of 2 or 3 during deployments, and trained the end users.',
            'Trained around 50 SAMU operators and supported a one-day deployment of a system the operation depended on.',
            'At CET, handled needs discovery, deployment management and client satisfaction where the operation could not stop.',
          ],
          skills: ['C#', 'JavaScript', 'Client Implementation', 'User Training', 'Deployment Management'],
        },
      ],
    },
    {
      name: 'IHS Soluções em Software',
      roles: [
        {
          title: 'Full Stack Developer',
          period: 'Feb 2012 - Feb 2014',
          location: 'São Paulo, Brazil',
          description: [
            'Built .NET desktop apps and web applications with ASP.NET MVC, JavaScript, jQuery, AngularJS and KnockoutJS.',
          ],
          skills: ['C#', 'JavaScript', '.NET', 'AngularJS'],
        },
      ],
    },
    {
      name: 'Colégio Singular',
      roles: [
        {
          title: 'IT Technician',
          period: 'Jan 2010 - Jan 2012',
          location: 'Santo André, SP',
          description: [
            'Maintained computers, servers and networks in the computer labs.',
            "Did basic maintenance on the school's portal.",
          ],
          skills: ['IT Infrastructure', 'Networking'],
        },
      ],
    },
  ];

  currentCompany = this.companies[0];
  earlierCompanies = this.companies.slice(1);
}
