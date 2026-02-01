import fs from "fs";
import path from "path";

export default async ({ strapi }) => {
  const cloudinaryAssets = JSON.parse(
    fs.readFileSync("./cloudinary-assets.json", "utf8")
  );

  const assetMap = new Map();

  // Build lookup: baseName -> asset
  for (const asset of cloudinaryAssets) {
    const base = asset.public_id.split("_")[0];
    assetMap.set(base, asset);
  }

  const files = await strapi.db.query("plugin::upload.file").findMany({
    where: { provider: "cloudinary" },
  });

  console.log(`Found ${files.length} Cloudinary files in Strapi`);

  for (const file of files) {
    const baseName = file.name.replace(/\.[^/.]+$/, "");

    const asset = assetMap.get(baseName);
    if (!asset) {
      console.warn(`⚠️ No Cloudinary match for ${file.name}`);
      continue;
    }

    await strapi.db.query("plugin::upload.file").update({
      where: { id: file.id },
      data: {
        url: asset.url,
        provider_metadata: {
          public_id: asset.public_id,
          resource_type: "image",
        },
      },
    });

    console.log(`✅ Fixed: ${file.name} → ${asset.public_id}`);
  }

  console.log("🎉 Cloudinary URLs fixed correctly");
};
