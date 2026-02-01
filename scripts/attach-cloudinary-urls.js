export default async ({ strapi }) => {
  const files = await strapi.db.query("plugin::upload.file").findMany();

  for (const file of files) {
    if (!file.name) continue;

    // 🔴 CHANGE THIS: map your filename to cloudinary public_id
    const publicId = file.name.replace(/\.[^/.]+$/, "");

    const cloudinaryUrl = `https://res.cloudinary.com/de7qiztkf/image/upload/${publicId}`;

    await strapi.db.query("plugin::upload.file").update({
      where: { id: file.id },
      data: {
        provider: "cloudinary",
        url: cloudinaryUrl,
        provider_metadata: {
          public_id: publicId,
          resource_type: "image",
        },
      },
    });

    console.log(`✅ Linked: ${file.name}`);
  }

  console.log("🎉 All images linked to Cloudinary");
};
