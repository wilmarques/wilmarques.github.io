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
        Software Engineer specializing in Front-end Development, Developer Experience, and
        Artificial Intelligence. Strong experience leading teams, architecting solutions,
        and back-end development.
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
          title: 'Developer Advocate Expert',
          period: 'Sep 2024 - Present',
          duration: '1 year',
          location: 'São Paulo, Brazil',
          description: 'Technical leading the Developer Advocate team, with a mission to enforce quality and productivity within all Software Delivery Lifecycle (SDLC) through an AI augmented DevEx. Leveraging tools like GitHub Copilot. Enhancing it in specific use cases and connecting it with other tools.',
          skills: ['GitHub', 'Developer Experience', 'Problem Solving', 'Technical Writing', 'AI', 'English'],
        },
        {
          title: 'AI Architect',
          period: 'Jan 2024 - Sep 2024',
          duration: '9 months',
          location: 'São Paulo, Brazil',
          description: 'Architecting internal tools for SDLC. Helping create a tool that transforms legacy code into modern code, using AI.',
          skills: ['Developer Experience', 'Problem Solving', 'JavaScript', 'Angular', 'Cloud Computing', 'R&D', 'AI', 'English'],
        },
        {
          title: 'Developer Experience Expert',
          period: 'Mar 2023 - Dec 2023',
          duration: '10 months',
          location: 'São Paulo, Brazil',
          description: 'Building engineering communities (Chapters) and creating content to drive software quality and knowledge sharing.',
          skills: ['Cloud Computing', 'Communication', 'Trust Building', 'Developer Experience', 'Strategic Thinking', 'Technical Writing', 'Teamwork'],
        },
        {
          title: 'Front-end Architect',
          period: 'Feb 2018 - Feb 2023',
          duration: '5 years',
          location: 'São Paulo, Brazil',
          description: 'As a Software Architect for web technologies, I led (alongside my team) the design and development of an internal Angular-based framework that elevated the quality, consistency, and scalability of web applications across the company.',
          skills: ['Angular', 'Agile Methodologies', 'Technical Writing', 'JavaScript', 'Web Components', 'English'],
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
          description: 'Coordination, training, and support for front-end team. New employees evaluation. Responsible for good practices and development on projects using AngularJS and Angular.',
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
          description: '',
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
          description: 'Development in general. Desktop, web and mobile.',
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
          description: 'Desktop development using the .NET platform. Web development with HTML, CSS, ASP.NET MVC, JavaScript, jQuery, AngularJS, and KnockoutJS.',
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
