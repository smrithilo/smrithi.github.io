# Portfolio content schema

This guide explains how to maintain structured portfolio content without editing layout code.

## Projects

Create one Markdown file in `_projects/`. Prefixing filenames with a two-digit number keeps the source tree readable; homepage order is controlled by `order`.

```yaml
---
title: "Project title"
order: 5
year: "2027"
organization: "Lab or company"
institution: "University"
context: "Course or other context"
summary: "One concise, factual homepage description."
thumbnail: "/assets/images/projects/example.webp"
thumbnail_alt: "Descriptive alternative text"
thumbnail_width: 1200
thumbnail_height: 800
topics:
  - "Topic one"
  - "Topic two"
links:
  paper: ""
  code: ""
  video: ""
detail_enabled: false
permalink: "/projects/example/"
---
```

Use empty strings for unavailable values. Do not invent a placeholder URL.

When `detail_enabled` is `false`, the homepage card is intentionally not clickable and exposes no detail link. To publish a detail page:

1. Add factual Markdown content below the front matter.
2. Set `detail_enabled: true`.
3. Keep the `permalink` stable.
4. Add supplied media beneath `assets/images/projects/`.
5. Run the production build and verify the page.

The `detail` layout supports normal Markdown headings, paragraphs, lists, images, video embeds, and diagrams. Suggested detail sections are Context, Methods, Personal Contributions, Results, and Limitations, but include only sections supported by supplied evidence.

## Publications

Create one file in `_publications/`:

```yaml
---
title: "Complete publication title"
order: 3
authors:
  - "First Author"
  - "Smrithi Lokesh"
venue: "Full venue name"
year: 2027
status: "Accurate publication status"
links:
  paper: ""
  doi: ""
  code: ""
  video: ""
related_project: ""
---
```

List every author in publication order. The template emphasizes any author value containing `Smrithi Lokesh`. Update status only from an authoritative supplied source.

For an internal related-project link, use a base-aware homepage fragment such as:

```yaml
related_project: "/#project-02-cuboid-macc"
```

## Experience

Create one file in `_experiences/`:

```yaml
---
order: 6
organization: "Organization"
organization_url: ""
role: "Role"
location: "City, Country"
dates: "Month Year–Month Year"
summary: "One factual sentence."
highlights:
  - "Specific contribution supported by a supplied source."
---
```

Avoid duplicating project-card wording. Experience entries should describe the role and contribution at the organization level.

## Teaching

Edit `_data/teaching.yml`. Each entry supports:

```yaml
- order: 1
  role: "Role"
  organization: "Organization"
  organization_url: ""
  dates: "Date range"
  summary: "Concise factual description."
```

The section is intentionally compact.

## Beyond Robotics

Edit `_data/beyond.yml`. Each group has a title, short introduction, and image list. Place optimized images in `assets/images/beyond/` and retain source-resolution files under `assets/images/beyond/originals/`.

Do not add empty cards, visible “TBD” text, or a country-by-country travel directory.

## Travel map

Edit `_data/travel.yml`. `visited_countries` contains country-name strings. Each `cities` entry contains:

```yaml
- name: "City name"
  country: "Country name"
  latitude: 0.0
  longitude: 0.0
  type: "visited"
  note: ""
```

Use decimal coordinates and set `type` to either `visited` or `home`. Do not infer travel history from education, employment, or profile locations.

## Photo album

Edit `_data/photo_album.yml`. Every entry contains:

- `file`: the exact original JPEG filename under `assets/images/photo-album/originals/`;
- `alt`: a literal description of the visible photograph;
- `width` and `height`: the source image dimensions in pixels.

The album displays original-resolution files without cropping or recompression. Clicking an image opens that same source JPEG. Preserve the dimensions and alt text when reordering entries.

## Documents and private materials

Public documents belong in `assets/documents/` and must be linked with `relative_url`. Do not add transcripts or other private application material. Store local-only private documents under `application-materials/`; Git ignores that directory.
