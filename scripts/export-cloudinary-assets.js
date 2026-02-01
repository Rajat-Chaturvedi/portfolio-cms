import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "de7qiztkf",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const assets = [];

async function fetchAssets(nextCursor = null) {
  const res = await cloudinary.api.resources({
    type: "upload",
    resource_type: "image",
    max_results: 500,
    next_cursor: nextCursor,
  });

  res.resources.forEach((r) => {
    assets.push({
      public_id: r.public_id,
      url: r.secure_url,
      format: r.format,
      created_at: r.created_at,
    });
  });

  if (res.next_cursor) {
    await fetchAssets(res.next_cursor);
  }
}

(async () => {
  await fetchAssets();
  fs.writeFileSync(
    "cloudinary-assets.json",
    JSON.stringify(assets, null, 2)
  );
  console.log(`✅ Exported ${assets.length} images`);
})();
