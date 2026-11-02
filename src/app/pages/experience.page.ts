import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'Experience - Wiley (Wil) Marques',
  meta: [
    { name: 'description', content: "Wiley (Wil) Marques' professional experience" },
    { property: 'og:title', content: "Wiley (Wil) Marques' professional experience" },
  ],
};

interface Role {
  title: string;
  period: string;
  duration: string;
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
  totalDuration?: string;
  location?: string;
  roles: Role[];
}

@Component({
  selector: 'app-experience',
  template: `
    <section class="experience-hero">
      <h1>Professional <span class="gradient-text">Experience</span></h1>
      <div class="experience-intro">
        <p>
          Software Engineer with 12+ years in software development. The last 3+ years have been on
          Artificial Intelligence, Developer Experience and Agentic AI.
        </p>
        <p>
          I lead AI-driven SDLC work. I design enterprise AI solutions and reusable platforms, and
          I build agentic workflows.
        </p>
        <p>
          Before that, the work was front-end architecture and technical leadership. Day to day, I
          enable teams, drive adoption and advise internal stakeholders.
        </p>
      </div>
    </section>

    <section class="timeline">
      @for (company of companies; track company.name) {
        <div class="timeline-company">
          <div class="company-header">
            <h2 class="company-name">{{ company.name }}</h2>
            @if (company.note) {
              <span class="company-note">{{ company.note }}</span>
            }
            @if (company.totalDuration) {
              <div class="company-meta">
                <span class="meta-duration">{{ company.totalDuration }}</span>
                @if (company.location) {
                  <span class="meta-separator">&middot;</span>
                  <span class="meta-location">{{ company.location }}</span>
                }
              </div>
            }
          </div>

          @for (role of company.roles; track role.title) {
            <div class="role-card">
              <div class="role-indicator">
                <div class="role-dot"></div>
                @if (!$last) {
                  <div class="role-line"></div>
                }
              </div>
              <div class="role-content">
                <h3 class="role-title">{{ role.title }}</h3>
                <div class="role-meta">
                  <span>{{ role.period }}</span>
                  <span class="meta-separator">&middot;</span>
                  <span>{{ role.duration }}</span>
                  <span class="meta-separator">&middot;</span>
                  <span>{{ role.location }}</span>
                </div>
                @if (role.description.length) {
                  <div class="role-description">
                    @for (paragraph of role.description; track $index) {
                      <p>{{ paragraph }}</p>
                    }
                  </div>
                }
                <div class="role-skills">
                  @for (skill of role.skills; track skill) {
                    <span class="skill-tag">{{ skill }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }
    </section>

    <section class="skills-section">
      <h2 class="section-title">Key Skills</h2>
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
  `,
  styles: `
    /* ===== Experience Hero ===== */
    .experience-hero {
      padding: 3rem 0 2rem;
      max-width: 640px;
    }

    .experience-hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .experience-intro p {
      font-size: 1.0625rem;
      line-height: 1.75;
      color: var(--color-text-secondary);
      margin: 0 0 0.75rem;
    }

    .experience-intro p:last-child {
      margin-bottom: 0;
    }

    /* ===== Timeline ===== */
    .timeline {
      padding: 2rem 0 4rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
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
      color: var(--color-text-muted);
      font-style: italic;
      margin-bottom: 0.25rem;
    }

    .company-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--color-text-muted);
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
      color: var(--color-text-muted);
      margin-bottom: 0.75rem;
    }

    .role-description p {
      font-size: 0.9375rem;
      line-height: 1.7;
      color: var(--color-text-secondary);
      margin: 0 0 0.65rem;
    }

    .role-description p:last-child {
      margin-bottom: 1rem;
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
      font-size: 0.6875rem;
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
      grid-template-columns: repeat(2, 1fr);
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
    @media (max-width: 640px) {
      .skills-grid {
        grid-template-columns: 1fr;
      }

      .experience-hero h1 {
        font-size: 2rem;
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
  skillGroups: SkillGroup[] = [
    {
      name: 'AI & Agentic Systems',
      skills: ['ReAct Agents', 'Multi-agent Architectures', 'LLMs', 'Amazon Bedrock', 'GitHub Copilot', 'Devin', 'Windsurf', 'AI-DLC', 'Specification Driven Development', 'MCP', 'Agent Skills'],
    },
    {
      name: 'Architecture & Platforms',
      skills: ['Enterprise AI Platforms', 'Azure', 'AWS', 'Python', 'Java', 'Angular Frameworks', 'Component Libraries', 'Scalable Architecture'],
    },
    {
      name: 'Developer Experience',
      skills: ['Engineering Communities', 'Quality Standards', 'Technical Advocacy', 'SDLC Automation', 'Technical Content', 'Adoption Enablement'],
    },
    {
      name: 'Other',
      skills: ['TypeScript', 'JavaScript', 'C#', '.NET', 'Technical Leadership', 'Stakeholder Management'],
    },
  ];

  companies: Company[] = [
    {
      name: 'F1RST Digital Services',
      note: 'Previously known as Santander Tecnologia Brasil.',
      totalDuration: '8 years 6 months',
      location: 'São Paulo, Brazil',
      roles: [
        {
          title: 'Developer Experience Lead (Agentic SDLC)',
          period: 'Sep 2024 - Present',
          duration: '1 year 11 months',
          location: 'São Paulo, Brazil',
          description: [
            'I lead the AI-driven SDLC initiative at Santander Brazil. I also influence the same direction at Group level.',
            'I drove adoption of GitHub Copilot, and later the move to Devin. Adoption passed 80% after we set up the foundations: environments, processes and enablement.',
            'I defined how the organization should create agents, and the content those coding agents use. The base is Markdown, Agent Skills and MCPs, so lock-in stays low.',
            'I coordinated the teams involved. I ran training and workshops. I aligned needs with stakeholders.',
            'The current work is moving from isolated copilots to AI connected across the SDLC, from ideation to production.',
          ],
          skills: ['GitHub Copilot', 'Devin', 'Windsurf', 'Agentic AI', 'MCP', 'Specification Driven Development', 'AI-DLC', 'SDLC Automation', 'Developer Experience', 'LLM', 'Adoption Enablement', 'English'],
        },
        {
          title: 'AI Architect',
          period: 'Jan 2024 - Sep 2024',
          duration: '9 months',
          location: 'São Paulo, Brazil',
          description: [
            'I architected two enterprise AI solutions for the Santander Group.',
            'One is the Global AI Platform, a reusable base for building internal agents.',
            'The other automates repository modernization. It started with Java upgrades using internal frameworks, then expanded to Angular and Python.',
            'Accuracy was over 90%, with a specification-driven approach. That was before this became the usual way.',
            'I worked on needs discovery and the key technical decisions.',
            'After the results in Brazil, the solution was positioned for a global rollout.',
          ],
          skills: ['Python', 'Java', 'Azure', 'AWS', 'Amazon Bedrock', 'DynamoDB', 'ReAct Agents', 'LLM', 'AI Architecture', 'Cloud Computing', 'English'],
        },
        {
          title: 'Developer Experience Expert',
          period: 'Mar 2023 - Dec 2023',
          duration: '10 months',
          location: 'São Paulo, Brazil',
          description: [
            'I led the Front-end Chapter. The goal was an internal community for sharing knowledge and adopting better practices.',
            'We held regular meetings. I also supported workshops run by the platform teams.',
            'I helped different teams work together. One case was a telemetry solution built by more than one team.',
            'I started a single internal knowledge portal. Chapters and CoEs publish their docs there, in Markdown.',
            'Before that, it was hard to find internal standards. The portal is widely used now, and it is also useful for AI agents.',
          ],
          skills: ['Developer Experience', 'Technical Writing', 'Software Quality', 'Internal Tooling', 'Knowledge Management', 'Platform Engineering', 'Community Building'],
        },
        {
          title: 'Front-end Architect',
          period: 'Feb 2018 - Feb 2023',
          duration: '5 years',
          location: 'São Paulo, Brazil',
          description: [
            'I led, with my team, the definition, governance and adoption of Angular 2+ across Santander Brazil.',
            'Other squads used what we built. The applications included tools for branch managers, customer service, internet banking and others.',
            'I ran training and workshops often. I wrote the documentation and the standards the teams used.',
            'I turned internal needs into requirements for the platform team.',
            'I aligned priorities with C-level stakeholders, including the CTO.',
            'The implementations worked when we understood what each squad needed, and gave them the accelerators and patterns to get there.',
          ],
          skills: ['Angular', 'Internal Platforms', 'JavaScript', 'Web Components', 'Scalable Architecture', 'Technical Writing', 'Stakeholder Management', 'Enablement', 'English'],
        },
      ],
    },
    {
      name: 'Vector ITC Group',
      roles: [
        {
          title: 'Project Lead',
          period: 'Jun 2017 - Feb 2018',
          duration: '9 months',
          location: 'São Paulo, Brazil',
          description: [
            'I worked as a consultant.',
            'I delivered AngularJS training to three groups, about 15 people each. I also helped select people to allocate at the client, Santander.',
            'Later I was allocated inside Santander. I worked in a Scrum squad, implementing internal systems from the needs the Product Owner brought.',
            'I became a technical reference there. That helped with the later move to an internal role.',
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
          duration: '1 year 9 months',
          location: 'São Paulo, Brazil',
          description: [
            'I developed web applications with C#, AngularJS and JavaScript.',
            'I led the creation of a web system in AngularJS. I also gave internal training on it.',
            'I became one of the main front-end references in the company. I helped developers who came from other technologies.',
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
          duration: '1 year 9 months',
          location: 'São Paulo, Brazil',
          description: [
            'I developed desktop (Windows Forms and WPF), web (ASP.NET, KnockoutJS and AngularJS) and mobile solutions, in C# and JavaScript.',
            'I was allocated inside the clients: SAMU, CET and Polícia Civil de SP.',
            'I learned the operational needs and implemented the solutions on site. During deployments I managed small teams of 2 or 3 people, and I trained the end users.',
            'At SAMU I trained around 50 operators. The deployment was one day, on a system the operation depended on.',
            'At CET the work was needs discovery, deployment management and client satisfaction. The operation could not stop.',
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
          duration: '2 years 1 month',
          location: 'São Paulo, Brazil',
          description: [
            'Full stack work on .NET desktop apps and web applications.',
            'The web stack was ASP.NET MVC, JavaScript, jQuery, AngularJS and KnockoutJS.',
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
          duration: '2 years 1 month',
          location: 'Santo André, SP',
          description: [
            'Maintenance of computers, servers and networks in the computer labs.',
            "Basic maintenance on the school's portal.",
          ],
          skills: ['IT Infrastructure', 'Networking'],
        },
      ],
    },
  ];
}
