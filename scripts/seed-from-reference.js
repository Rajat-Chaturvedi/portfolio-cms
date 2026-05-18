/**
 * Direct seed script for populating data from reference JSON files
 * Usage: node scripts/seed-from-reference.js (requires Strapi running in another terminal)
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const API_URL = "http://localhost:1337/api";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";
const dataReferencePath = path.join(process.cwd(), "data reference");

// Create axios instance with authorization header
const api = axios.create({
  baseURL: API_URL,
  headers: API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {},
});

async function seedData() {
  try {
    // Seed Case Studies
    console.log("\n📚 Seeding Case Studies...");
    const caseStudiesData = JSON.parse(
      fs.readFileSync(
        path.join(dataReferencePath, "caseStudies.json"),
        "utf-8",
      ),
    );
    for (const study of caseStudiesData) {
      await api.post(`/case-studies`, {
        data: {
          title: study.title,
          role: study.role,
          duration: study.duration,
          problem: study.problem,
          solution: study.solution,
          outcome: study.outcome,
          stack: study.stack.join(", "),
          liveUrl: study.liveUrl,
          repoUrl: study.repoUrl,
          publishedAt: new Date(),
        },
      });
    }
    console.log("✓ Case Studies seeded");

    // Seed CTA
    console.log("\n📢 Seeding CTA...");
    const ctaData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, "cta.json"), "utf-8"),
    );
    await api.post(`/ctas`, {
      data: {
        label: ctaData.headline,
        url: ctaData.calendarUrl,
        type: "contact",
        publishedAt: new Date(),
      },
    });
    console.log("✓ CTA seeded");

    // Seed Impact Metrics
    console.log("\n📊 Seeding Impact Metrics...");
    const metricsData = JSON.parse(
      fs.readFileSync(
        path.join(dataReferencePath, "impactMetrics.json"),
        "utf-8",
      ),
    );
    for (const metric of metricsData) {
      await api.post(`/impact-metrics`, {
        data: {
          metric: metric.label,
          value: metric.value,
          description: metric.note,
          publishedAt: new Date(),
        },
      });
    }
    console.log("✓ Impact Metrics seeded");

    // Seed Now
    console.log("\n📌 Seeding Now...");
    const nowData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, "now.json"), "utf-8"),
    );
    await api.post(`/nows`, {
      data: {
        title: nowData.title,
        description: `Focus: ${nowData.focus}\nLearning: ${nowData.learning}\nBuilding: ${nowData.building}\nAvailability: ${nowData.availability}`,
        publishedAt: new Date(),
      },
    });
    console.log("✓ Now seeded");

    // Seed Process
    console.log("\n🔄 Seeding Process...");
    const processData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, "process.json"), "utf-8"),
    );
    for (const proc of processData) {
      await api.post(`/processes`, {
        data: {
          step: `${proc.step} - ${proc.title}`,
          description: proc.description,
          publishedAt: new Date(),
        },
      });
    }
    console.log("✓ Process seeded");

    // Seed Testimonials
    console.log("\n💬 Seeding Testimonials...");
    const testimonialsData = JSON.parse(
      fs.readFileSync(
        path.join(dataReferencePath, "testimonials.json"),
        "utf-8",
      ),
    );
    for (const testimonial of testimonialsData) {
      await api.post(`/testimonials`, {
        data: {
          author: testimonial.name,
          content: testimonial.quote,
          role: testimonial.role,
          publishedAt: new Date(),
        },
      });
    }
    console.log("✓ Testimonials seeded");

    // Seed Writing
    console.log("\n✍️ Seeding Writing...");
    const writingData = JSON.parse(
      fs.readFileSync(path.join(dataReferencePath, "writing.json"), "utf-8"),
    );
    for (const article of writingData) {
      await api.post(`/writings`, {
        data: {
          title: article.title,
          content: article.summary,
          author: "Rajat Chaturvedi",
          publishedAt: new Date(),
        },
      });
    }
    console.log("✓ Writing seeded");

    console.log("\n🎉 All data successfully seeded!");
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
    if (error.response) {
      console.error("Response:", error.response.data);
    }
    process.exit(1);
  }
}

seedData();
