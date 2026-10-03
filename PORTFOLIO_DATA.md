# Portfolio Data Mirrors

`data/portfolio-snapshot.json` is the exact frontend API-shaped content snapshot.
`credentials.json` mirrors the frontend's education and certificate records,
including optional certificate URLs and image paths. Credentials currently stay
JSON-driven in the frontend; no credential CMS API is implied.

The root About, awards, experiences, projects and skills JSON files mirror the
same records with IDs and media URLs. `data reference` contains the optional
sections in their editable reference shapes. Empty collections are intentional.
`data/data.json` is the original Strapi demo dataset, not this portfolio backup.

Run from the sibling frontend repository after local content edits:

```sh
node scripts/sync-cms-data.mjs
node scripts/sync-cms-data.mjs --check
```

The export replaces corresponding local JSON files. Review existing edits first.
The check is read-only and fails on any semantic mismatch. Commit both repos.

## Before Restoring the Hosted CMS

1. Back up the hosted database before importing or updating content.
2. Deploy updated schemas for project role/challenge/approach/outcome and writing
   URL/publisher fields.
3. Compare existing records with the canonical snapshot; update or import them
   explicitly. Restarting Strapi does not replace populated collections.
4. Match media URLs to `plugin::upload.file` records and connect their IDs to
   project images, experience logos and skill icons. URL objects in JSON are not
   Strapi database relation IDs. Frontend snapshot IDs are not an import strategy.
5. Publish the reconciled records and verify API pagination, counts, optional
   fields and media against the frontend snapshot before removing local-only mode.

The reference bootstrap now reads the canonical JSON for empty case-study,
testimonial, Now and writing collections only. It skips populated collections
and intentionally does not seed empty CTA/metrics/process content. It does not
restore core portfolio records, upload relations, or credentials automatically.

Do not use the demo seed as a recovery tool. The snapshot does not include CMS
users, authentication secrets or every hosted draft; retain a full database dump
for complete recovery. Reference case studies/testimonials may contain sample
claims and URLs: verify before publishing as genuine work or endorsements.
