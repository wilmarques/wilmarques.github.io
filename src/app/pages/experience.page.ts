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
      <p class="experience-intro">
        Software Engineer with 12+ years in software development, the last 3+ years focused on
        Artificial Intelligence, Developer Experience, and Agentic AI. Experienced in leading
        AI-driven SDLC initiatives, architecting enterprise AI solutions and reusable platforms,
        and building agentic workflows on top of a solid background in front-end architecture and
        technical leadership. Strong track record of enabling teams, driving technology adoption,
        and acting as a trusted technical advisor to internal stakeholders.
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
          description: 'Leading the AI-driven SDLC initiative at Santander Brazil (and influencing the same direction at Group level). Drove adoption of GitHub Copilot and the later move to Devin, reaching over 80% adoption by setting up the foundations (environments, processes, and enablement). Defined how the organization should create agents and supporting content for Coding Agents — using Markdown, Agent Skills, and MCPs to keep lock-in low. Coordinated the teams involved, ran training and workshops, and aligned needs with stakeholders. Now working on moving from isolated copilots to AI connected across the full SDLC (ideation to production).',
          skills: ['GitHub Copilot', 'Devin', 'Windsurf', 'Agentic AI', 'MCP', 'Specification Driven Development', 'AI-DLC', 'SDLC Automation', 'Developer Experience', 'LLM', 'Adoption Enablement', 'English'],
        },
        {
          title: 'AI Architect',
          period: 'Jan 2024 - Sep 2024',
          duration: '9 months',
          location: 'São Paulo, Brazil',
          description: 'Architected two enterprise AI solutions for the Santander Group. Designed the Global AI Platform as a reusable base for building internal agents. Built a solution that automates repository modernization (started with Java upgrades using internal frameworks, later expanded to Angular and Python). Hit over 90% accuracy with a specification-driven approach before that became the usual way. Worked on needs discovery and key technical decisions. The solution was positioned for global rollout after strong results in Brazil.',
          skills: ['Python', 'Java', 'Azure', 'AWS', 'Amazon Bedrock', 'DynamoDB', 'ReAct Agents', 'LLM', 'AI Architecture', 'Cloud Computing', 'English'],
        },
        {
          title: 'Developer Experience Expert',
          period: 'Mar 2023 - Dec 2023',
          duration: '10 months',
          location: 'São Paulo, Brazil',
          description: 'Led the Front-end Chapter. Built an internal community focused on knowledge sharing and adopting better practices. Organized regular meetings and supported workshops from the platform teams. Helped different teams collaborate — for example, bringing people together to build a solid telemetry solution. Started a single internal knowledge portal where Chapters and CoEs publish docs in Markdown. It solved the usual problem of not knowing where to find internal standards, and today it’s widely used (and useful for AI agents).',
          skills: ['Developer Experience', 'Technical Writing', 'Software Quality', 'Internal Tooling', 'Knowledge Management', 'Platform Engineering', 'Community Building'],
        },
        {
          title: 'Front-end Architect',
          period: 'Feb 2018 - Feb 2023',
          duration: '5 years',
          location: 'São Paulo, Brazil',
          description: 'Led (with my team) the definition, governance, and adoption of Angular 2+ across Santander Brazil. Acted as an enabler for other squads building applications (branch managers, customer service, internet banking, and others). Ran frequent training sessions and workshops, created documentation and standards used by all teams, and turned internal needs into requirements for the platform team. Regularly aligned priorities with C-level stakeholders (including the CTO). The success of the implementations depended on understanding what the squads needed and helping them succeed with the accelerators and patterns we provided.',
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
          description: 'Worked as a consultant. Delivered AngularJS training to three groups (~15 people each) and helped select people for allocation at the client (Santander). Later allocated inside Santander as a third-party consultant, working in a Scrum squad implementing internal systems based on needs from the Product Owner. Became a technical reference, which helped with later internalization.',
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
          description: 'Developed web applications using C#, AngularJS, and JavaScript. Led the creation of a web system with AngularJS and delivered internal training on the technology. Became one of the main front-end references in the company, helping developers who came from other technology backgrounds.',
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
          description: 'Developed desktop (Windows Forms/WPF), web (ASP.NET, KnockoutJS, AngularJS), and mobile solutions in C# and JavaScript. Allocated directly inside client environments (SAMU, CET, and Polícia Civil de SP). Understood operational needs, implemented solutions on-site, managed small teams (2–3 people) during deployments, and trained end users. At SAMU, trained around 50 operators and supported a high-pressure one-day deployment of a mission-critical system. At CET, combined needs discovery, deployment management, and client satisfaction under operational continuity constraints.',
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
