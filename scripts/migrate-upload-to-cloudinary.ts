import fs from "fs";
import path from "path";

export default async ({ strapi }: { strapi: any }) => {
  const files = await strapi.db.query("plugin::upload.file").findMany({
    where: { provider: "local" },
  });

  console.log(`Found ${files.length} local files`);

  for (const file of files) {
    try {
      const absolutePath = path.join(
        strapi.dirs.static.public,
        file.url
      );

      if (!fs.existsSync(absolutePath)) {
        console.warn(`⚠️ Missing file on disk: ${absolutePath}`);
        continue;
      }

      const stream = fs.createReadStream(absolutePath);

      const uploaded = await strapi
        .plugin("upload")
        .service("upload")
        .upload({
          data: {
            fileInfo: {
              name: file.name,
              alternativeText: file.alternativeText,
              caption: file.caption,
            },
          },
          files: {
            file: stream,           // ✅ THIS IS THE KEY FIX
            name: file.name,
            type: file.mime,
            size: file.size,
          },
        });

      await strapi.db
        .query("plugin::upload.file")
        .delete({ where: { id: file.id } });

      console.log(`✅ Migrated: ${file.name}`);
    } catch (err) {
      console.error(`❌ Failed: ${file.name}`, err);
    }
  }

  console.log("🎉 Cloudinary migration completed");
};
