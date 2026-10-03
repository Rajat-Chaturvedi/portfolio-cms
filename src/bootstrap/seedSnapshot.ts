import snapshot from "../../data/portfolio-snapshot.json";

type StrapiLike = {
  db: {
    query: (uid: string) => {
      count: () => Promise<number>;
      create: (params: { data: Record<string, unknown> }) => Promise<unknown>;
    };
  };
  log: { info: (message: string) => void; error: (message: string) => void };
};

export async function seedSnapshotContent(strapi: StrapiLike): Promise<void> {
  const collections = [
    [
      "/api/case-studies",
      "api::case-study.case-study",
      [
        "title",
        "role",
        "duration",
        "problem",
        "solution",
        "outcome",
        "stack",
        "liveUrl",
        "repoUrl",
      ],
    ],
    [
      "/api/testimonials",
      "api::testimonial.testimonial",
      ["author", "content", "role", "company"],
    ],
    [
      "/api/nows",
      "api::now.now",
      ["title", "description", "focus", "learning", "building", "availability"],
    ],
    [
      "/api/writings",
      "api::writing.writing",
      ["title", "content", "author", "url", "publisher"],
    ],
  ] as const;

  for (const [endpoint, uid, fields] of collections) {
    const rows = snapshot[endpoint].data as Array<Record<string, unknown>>;
    if (!rows.length || (await strapi.db.query(uid).count()) > 0) continue;
    for (const row of rows) {
      const data: Record<string, unknown> = {};
      data.publishedAt = new Date();
      for (const field of fields) if (field in row) data[field] = row[field];
      await strapi.db.query(uid).create({ data });
    }
    strapi.log.info(
      `[seed] Seeded ${rows.length} JSON snapshot entries into ${uid}.`,
    );
  }
}
