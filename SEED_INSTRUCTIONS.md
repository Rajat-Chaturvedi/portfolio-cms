// Run this code in Strapi console: yarn strapi console
// Then paste the following:

const fs = require('fs');
const path = require('path');

(async () => {
const dataReferencePath = path.join(process.cwd(), 'data reference');

try {
// Seed Case Studies
const caseStudiesData = JSON.parse(
fs.readFileSync(path.join(dataReferencePath, 'caseStudies.json'), 'utf-8')
);
for (const study of caseStudiesData) {
await strapi.entityService.create('api::case-study.case-study', {
data: {
title: study.title,
role: study.role,
duration: study.duration,
problem: study.problem,
solution: study.solution,
outcome: study.outcome,
stack: study.stack.join(', '),
liveUrl: study.liveUrl,
repoUrl: study.repoUrl,
publishedAt: new Date(),
},
});
}
console.log('✓ Case Studies seeded');

    // Seed CTA
    const ctaData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, 'cta.json'), 'utf-8')
    );
    await strapi.entityService.create('api::cta.cta', {
      data: {
        label: ctaData.headline,
        url: ctaData.calendarUrl,
        type: 'contact',
        publishedAt: new Date(),
      },
    });
    console.log('✓ CTA seeded');

    // Seed Impact Metrics
    const metricsData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, 'impactMetrics.json'), 'utf-8')
    );
    for (const metric of metricsData) {
      await strapi.entityService.create('api::impact-metric.impact-metric', {
        data: {
          metric: metric.label,
          value: metric.value,
          description: metric.note,
          publishedAt: new Date(),
        },
      });
    }
    console.log('✓ Impact Metrics seeded');

    // Seed Now
    const nowData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, 'now.json'), 'utf-8')
    );
    await strapi.entityService.create('api::now.now', {
      data: {
        title: nowData.title,
        description: `Focus: ${nowData.focus}\nLearning: ${nowData.learning}\nBuilding: ${nowData.building}\nAvailability: ${nowData.availability}`,
        publishedAt: new Date(),
      },
    });
    console.log('✓ Now seeded');

    // Seed Process
    const processData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, 'process.json'), 'utf-8')
    );
    for (const proc of processData) {
      await strapi.entityService.create('api::process.process', {
        data: {
          step: `${proc.step} - ${proc.title}`,
          description: proc.description,
          publishedAt: new Date(),
        },
      });
    }
    console.log('✓ Process seeded');

    // Seed Testimonials
    const testimonialsData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, 'testimonials.json'), 'utf-8')
    );
    for (const testimonial of testimonialsData) {
      await strapi.entityService.create('api::testimonial.testimonial', {
        data: {
          author: testimonial.name,
          content: testimonial.quote,
          role: testimonial.role,
          publishedAt: new Date(),
        },
      });
    }
    console.log('✓ Testimonials seeded');

    // Seed Writing
    const writingData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, 'writing.json'), 'utf-8')
    );
    for (const article of writingData) {
      await strapi.entityService.create('api::writing.writing', {
        data: {
          title: article.title,
          content: article.summary,
          author: 'Rajat Chaturvedi',
          publishedAt: new Date(),
        },
      });
    }
    console.log('✓ Writing seeded');

    console.log('\n✓ All data successfully seeded!');

} catch (error) {
console.error('Error seeding data:', error);
}
})();
