type StrapiLike = {
  db: {
    query: (uid: string) => {
      count: () => Promise<number>;
      create: (params: { data: Record<string, unknown> }) => Promise<unknown>;
    };
  };
  log: {
    info: (message: string) => void;
    error: (message: string) => void;
  };
};

const caseStudies = [
  {
    title: 'Merchant Onboarding Revamp',
    role: 'Frontend Lead',
    duration: '12 weeks',
    problem: 'Merchants were dropping during a long onboarding flow with no progress visibility.',
    solution: 'Built a multi-step wizard with autosave, role-aware forms, and server-side validation for each stage.',
    outcome: 'Increased onboarding completion by 38% and reduced support tickets by 26%.',
    stack: 'Next.js, TypeScript, React Hook Form, SCSS',
    liveUrl: 'https://example.com/onboarding',
    repoUrl: 'https://github.com/Rajat-Chaturvedi/onboarding-revamp',
  },
  {
    title: 'Real-Time Sales Intelligence Dashboard',
    role: 'Fullstack Developer',
    duration: '10 weeks',
    problem: 'Leadership had delayed visibility into campaign performance and store-level trends.',
    solution: 'Implemented modular dashboard widgets with cached API aggregation, filter presets, and visual drilldowns.',
    outcome: 'Reduced reporting time from hours to minutes and improved weekly planning cadence.',
    stack: 'Next.js, Node.js, Chart.js, PostgreSQL',
    liveUrl: 'https://example.com/dashboard',
    repoUrl: 'https://github.com/Rajat-Chaturvedi/sales-dashboard',
  },
  {
    title: 'Headless Portfolio CMS Migration',
    role: 'Frontend Engineer',
    duration: '6 weeks',
    problem: 'Content updates required code deployments and slowed down profile freshness.',
    solution: 'Migrated static content to structured content models and created reusable mappers for UI components.',
    outcome: 'Enabled non-developers to update content in under 5 minutes without code changes.',
    stack: 'Next.js, Strapi, TypeScript, REST API',
    liveUrl: 'https://example.com/portfolio',
    repoUrl: 'https://github.com/Rajat-Chaturvedi/portfolio-cms',
  },
];

const ctas = [
  {
    label: 'Let us build something meaningful',
    url: 'https://cal.com/rajat',
    type: 'contact',
  },
];

const impactMetrics = [
  {
    metric: 'Projects Shipped',
    value: '30+',
    description: 'Across startup and enterprise use-cases',
  },
  {
    metric: 'Flow Completion Lift',
    value: '38%',
    description: 'From onboarding UX redesign',
  },
  {
    metric: 'Support Ticket Drop',
    value: '26%',
    description: 'After validation and UI improvements',
  },
  {
    metric: 'Production Uptime',
    value: '99.9%',
    description: 'For client-facing dashboard release',
  },
];

const nowItems = [
  {
    title: 'Now',
    description:
      'Focus: Building performant, content-driven frontend systems with Next.js and headless CMS integrations.\n' +
      'Learning: Deepening system design patterns for frontend architecture, caching strategy, and observability.\n' +
      'Building: A polished portfolio revamp with modular section architecture and CMS-first content pipelines.\n' +
      'Availability: Open to frontend and fullstack opportunities, consulting, and product collaborations.',
  },
];

const processes = [
  {
    step: '01 - Discover',
    description: 'Clarify business goals, user outcomes, and technical constraints before touching implementation.',
  },
  {
    step: '02 - Design',
    description: 'Draft information architecture, component contracts, and API boundaries for predictable delivery.',
  },
  {
    step: '03 - Build',
    description: 'Ship reusable components with focused state logic and maintainable data mappers.',
  },
  {
    step: '04 - Validate',
    description: 'Test edge cases, improve accessibility, and monitor performance before rollout.',
  },
];

const testimonials = [
  {
    author: 'Aarav Mehta',
    content:
      'Rajat consistently turns complex requirements into clean and scalable experiences. He improves both speed and quality.',
    role: 'Engineering Manager',
  },
  {
    author: 'Sana Kapoor',
    content:
      'One of the strongest frontend collaborators I have worked with. His implementation quality matches design intent with precision.',
    role: 'Product Designer',
  },
  {
    author: 'Dhruv Sethi',
    content:
      'Rajat brought ownership, speed, and thoughtful architecture decisions that helped us launch ahead of schedule.',
    role: 'Founder',
  },
];

const writings = [
  {
    title: 'Designing Frontend Components for CMS-Driven Products',
    content:
      'A practical blueprint for separating API shape, mapping logic, and display components in scalable UIs.',
    author: 'Rajat Chaturvedi',
  },
  {
    title: 'From Static Portfolio to Headless Content Workflow',
    content: 'How to migrate portfolio data to a headless CMS without rewriting all your components.',
    author: 'Rajat Chaturvedi',
  },
  {
    title: 'Reducing Form Friction in Multi-Step Flows',
    content:
      'Tactics that improved completion rates through better validation, progress feedback, and state persistence.',
    author: 'Rajat Chaturvedi',
  },
];

async function seedCollection(
  strapi: StrapiLike,
  uid: string,
  rows: Array<Record<string, unknown>>
): Promise<void> {
  const count = await strapi.db.query(uid).count();

  if (count > 0) {
    strapi.log.info(`[seed] Skip ${uid}; already has ${count} entries.`);
    return;
  }

  for (const row of rows) {
    await strapi.db.query(uid).create({
      data: {
        ...row,
        publishedAt: new Date(),
      },
    });
  }

  strapi.log.info(`[seed] Seeded ${rows.length} entries into ${uid}.`);
}

export async function seedReferenceContent(strapi: StrapiLike): Promise<void> {
  try {
    await seedCollection(strapi, 'api::case-study.case-study', caseStudies);
    await seedCollection(strapi, 'api::cta.cta', ctas);
    await seedCollection(strapi, 'api::impact-metric.impact-metric', impactMetrics);
    await seedCollection(strapi, 'api::now.now', nowItems);
    await seedCollection(strapi, 'api::process.process', processes);
    await seedCollection(strapi, 'api::testimonial.testimonial', testimonials);
    await seedCollection(strapi, 'api::writing.writing', writings);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    strapi.log.error(`[seed] Failed seeding reference content: ${message}`);
  }
}
