# Editing the portfolio

This site is intentionally maintained with Markdown, HTML, YAML, CSS, and a small amount of JavaScript. Routine content changes do not require a framework or database.

## Before editing

1. Make changes on a branch, not directly on `main`.
2. Keep `_config.yml` set to:

   ```yaml
   url: "https://smrithilo.github.io"
   baseurl: "/smrithi.github.io"
   ```

3. Internal paths stored in YAML should begin with `/`. Templates must pass internal URLs through Jekyll's `relative_url` filter.
4. Do not add an academic transcript or private application documents to the public site.

## Preview changes locally

From the repository folder in PowerShell:

```powershell
$env:JEKYLL_ENV = "production"
bundle exec jekyll build --baseurl /smrithi.github.io
bundle exec jekyll serve --baseurl /smrithi.github.io
```

Open:

`http://127.0.0.1:4000/smrithi.github.io/`

After editing, refresh the browser. Stop the preview with `Ctrl+C`.

## Change the About section

Edit the paragraphs inside `id="about"` in `index.html`.

The availability sentence is the paragraph with `class="availability"`. Education, contact details, and sidebar facts are stored in `_data/profile.yml`.

## Change the profile photo

Replace:

`assets/images/profile/smrithi-lokesh.webp`

Keep the same filename to avoid changing any templates. Recommended preparation:

- crop to a square without stretching;
- auto-orient using the image's EXIF orientation;
- export as WebP;
- use approximately 1000–1400 pixels per side;
- aim for less than 300 KB when possible.

The visible crop is controlled by `.profile-panel__portrait` in `assets/css/main.css`.

## Change a project thumbnail

Each project image is stored under:

`assets/images/projects/<project-name>/thumbnail.webp`

Replace the existing WebP or create a new project folder. Preserve the image's framing and do not stretch it.

Then update the corresponding file in `_projects/`:

```yaml
thumbnail: "/assets/images/projects/example/thumbnail.webp"
thumbnail_alt: "A literal description of what is visibly present"
thumbnail_width: 1200
thumbnail_height: 800
```

Use the real pixel dimensions of the WebP. Alternative text must describe only visible content; do not infer results or technical claims from the image.

## Edit or add a homepage project

Each homepage project is one Markdown file in `_projects/`. Edit the YAML between the two `---` lines:

```yaml
---
title: "Project title"
order: 5
year: "2027"
organization: ""
institution: "University or organization"
context: "Course, lab, or project context"
summary: "A concise and factual homepage description."
thumbnail: "/assets/images/projects/example/thumbnail.webp"
thumbnail_alt: "Literal description of the image"
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

- `order` controls homepage order.
- Leave unavailable links as empty strings.
- Keep `detail_enabled: false` when the card should remain non-clickable.
- Add a new numbered Markdown file to create another project.

## Build a detailed project page

Project detail pages already use `_layouts/detail.html`; no new layout is needed.

1. Open the project's existing file in `_projects/`.
2. Change:

   ```yaml
   detail_enabled: true
   ```

3. Keep or set a unique permalink:

   ```yaml
   permalink: "/projects/example/"
   ```

4. Add Markdown below the closing `---`:

   ```markdown
   ## Overview

   Explain the problem, your role, and the project context.

   ## Approach

   Describe the methods and implementation without inventing results.

   ![Literal image description]({{ '/assets/images/projects/example/detail-image.webp' | relative_url }})

   ## Outcome

   State only outcomes supported by project records, a report, the CV, or the repository.
   ```

When `detail_enabled` is true, the homepage title and “View project” link automatically open the detail page. When it is false, project cards remain non-clickable.

## Edit publications, experience, and teaching

- Publications: edit files in `_publications/`.
- Experience: edit files in `_experiences/`.
- Teaching: edit `_data/teaching.yml`.

Keep dates, affiliations, author order, links, and claims factual. The complete field reference is in `docs/CONTENT_SCHEMA.md`.

## Modify the Photo Album

The page source is `photo-album.html`. Its image list is `_data/photo_album.yml`.

### Add a photograph

1. Put the original JPEG in:

   `assets/images/photo-album/originals/`

2. Read its exact pixel dimensions.
3. Add an entry to `_data/photo_album.yml`:

   ```yaml
   - file: "photograph.jpg"
     alt: "A literal description of what is visible"
     width: 6000
     height: 4000
   ```

4. Move the entry within the YAML file to change its position in the album.

The album uses the original JPEG without cropping or recompression. Clicking a photograph opens the same source-resolution file. Every file must remain below GitHub's 100 MB individual-file limit.

To hide a photograph, remove its YAML entry. Delete the original file only when it is no longer needed anywhere in the site.

To change the camera introduction, edit the paragraph near the top of `photo-album.html`.

## Modify the Travel page

The page layout is `travel.html`; travel history is stored in `_data/travel.yml`.

### Highlight another country

Add its map name under `visited_countries`:

```yaml
visited_countries:
  - "Country name"
```

### Add a city or region

```yaml
cities:
  - name: "Place name"
    country: "Country name"
    latitude: 0.0
    longitude: 0.0
    type: "visited"
    kind: "city"
```

- Use geographically accurate decimal coordinates.
- Set `type: "home"` for a place lived in or `type: "visited"` for a regular marker.
- Set `kind: "region"` when the marker represents a state, island group, or region rather than a city.
- Latitude must be between `-90` and `90`; longitude must be between `-180` and `180`.

The map, legend, and accessible place list update automatically during the next build.

## Build the “Art, RC planes, and other random things I do” page

The future destination is already listed in `_data/beyond.yml` with an empty URL, so it currently appears as non-clickable text.

Create a file such as `art-rc-and-other.html`:

```html
---
layout: default
title: "Art, RC planes, and other random things I do"
description: "Personal projects and creative work by Smrithi Lokesh."
permalink: "/art-rc-and-other/"
---
<section class="page-section" aria-labelledby="personal-work-title">
  <a href="{{ '/#beyond' | relative_url }}">Back to Beyond Robotics</a>
  <h1 id="personal-work-title">Art, RC planes, and other random things I do</h1>

  <!-- Add the page content here. -->
</section>
```

Then update `_data/beyond.yml`:

```yaml
- label: "Art, RC planes, and other random things I do"
  url: "/art-rc-and-other/"
```

An empty `url` produces safe non-clickable text. An internal path opens a page in this site. A complete `https://...` URL can link to a separately hosted portfolio.

## Change the Beyond Robotics links

All Beyond Robotics destinations are listed in `_data/beyond.yml`:

```yaml
- label: "Link text"
  url: "/internal-page/"
```

Reorder the YAML entries to change their display order. Do not add empty cards or placeholder pages.

## Validate before publishing

Run the production build:

```powershell
$env:JEKYLL_ENV = "production"
bundle exec jekyll build --baseurl /smrithi.github.io
```

Then verify:

- the homepage and every internal page load under `/smrithi.github.io/`;
- all images and documents load;
- image alt text is present and accurate;
- light and dark modes work with Cobalt, Forest, and Plum;
- no horizontal scrolling appears on mobile;
- project cards are clickable only when `detail_enabled: true`;
- there are no visible placeholders or browser-console errors.

Pull requests targeting `main` run the Jekyll build. Deployment runs only after a push to `main` or a manual workflow dispatch.
