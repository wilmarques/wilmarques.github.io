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
  description: string;
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
      <p class="experience-intro">
        Software Engineer specializing in Artificial Intelligence, Developer Experience, and
        scalable platform engineering. Strong experience leading AI-driven SDLC initiatives,
        architecting enterprise AI solutions, and building agentic workflows.
      </p>
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
                @if (role.description) {
                  <p class="role-description">{{ role.description }}</p>
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

    .experience-intro {
      font-size: 1.0625rem;
      line-height: 1.75;
      color: var(--color-text-secondary);
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

    .role-description {
      font-size: 0.9375rem;
      line-height: 1.7;
      color: var(--color-text-secondary);
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

    /* ===== Responsive ===== */
    @media (max-width: 640px) {
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
  companies: Company[] = [
    {
      name: 'F1RST Digital Services',
      note: 'Previously known as Santander Tecnologia Brasil.',
      totalDuration: '3 years 8 months',
      location: 'São Paulo, Brazil',
      roles: [
        {
          title: 'Developer Experience Lead',
          period: 'Sep 2024 - Present',
          duration: '1 year',
          location: 'São Paulo, Brazil',
          description: 'Leading the AI-driven Software Development Lifecycle (SDLC) initiative at Santander Brazil. Responsible for the technical implementation of GitHub Copilot, Devin (Cognition AI) and Windsurf across the organization — defining adoption strategies, integration with internal environments and development processes. Driving Specification Driven Development with AI using GitHub SpecKit, OpenSpec, BMAD Method and AWS AI-DLC workflows. Leveraging Markdown, MCPs and Agent Skills as the foundation for agentic workflows. Mission to implement the Artificial Intelligence Development Lifecycle (AI-DLC) across the Santander Group.',
          skills: ['GitHub Copilot', 'Devin', 'Agentic AI', 'MCP', 'Specification Driven Development', 'AI-DLC', 'SDLC Automation', 'Developer Experience', 'LLM', 'English'],
        },
        {
          title: 'AI Architect',
          period: 'Jan 2024 - Sep 2024',
          duration: '9 months',
          location: 'São Paulo, Brazil',
          description: 'Architected two enterprise-scale AI solutions for the Santander Group. Designed the Global AI Platform — a reusable foundation for all AI solutions across the Group, built with Python and Java, deployed on Azure. Built an intelligent technology upgrade solution that automates repository modernization (e.g., Angular 12 to 20), implementing a ReAct (Reasoning + Acting) agent architecture on AWS using Amazon Bedrock and DynamoDB.',
          skills: ['Python', 'Java', 'Azure', 'AWS', 'Amazon Bedrock', 'DynamoDB', 'ReAct Agents', 'LLM', 'AI Architecture', 'Cloud Computing', 'English'],
        },
        {
          title: 'Developer Experience Expert',
          period: 'Mar 2023 - Dec 2023',
          duration: '10 months',
          location: 'São Paulo, Brazil',
          description: 'Founded and ran engineering Chapters — internal communities focused on raising software quality and accelerating knowledge sharing across teams. Produced technical content, defined quality standards, and established feedback loops between developers and platform teams.',
          skills: ['Developer Experience', 'Technical Writing', 'Software Quality', 'Internal Tooling', 'Knowledge Management', 'Platform Engineering'],
        },
        {
          title: 'Front-end Architect',
          period: 'Feb 2018 - Feb 2023',
          duration: '5 years',
          location: 'São Paulo, Brazil',
          description: 'Designed and built an internal Angular-based framework adopted across the company. It standardized how web applications were structured, tested, and deployed — improving consistency and reducing onboarding time for new teams.',
          skills: ['Angular', 'Internal Platforms', 'JavaScript', 'Web Components', 'Scalable Architecture', 'Technical Writing', 'English'],
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
          description: 'Led a front-end team — handled coordination, onboarding, and training. Set coding standards and oversaw delivery of AngularJS and Angular projects.',
          skills: ['Angular', 'JavaScript', 'Leadership'],
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
          description: 'Built and maintained web applications using C#, Angular, and JavaScript.',
          skills: ['C#', 'Angular', 'JavaScript'],
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
          description: 'Worked across desktop, web, and mobile projects using C# and JavaScript.',
          skills: ['C#', 'JavaScript'],
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
          description: 'Full stack work covering .NET desktop apps and web applications built with ASP.NET MVC, JavaScript, jQuery, AngularJS, and KnockoutJS.',
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
          description: "Maintenance of computers, servers, and networks in the computer labs. Basic maintenance on the school's portal.",
          skills: ['IT Infrastructure', 'Networking'],
        },
      ],
    },
  ];
}
