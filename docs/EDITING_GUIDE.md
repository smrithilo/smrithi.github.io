# Editing the portfolio

The site content is intentionally stored in plain HTML, Markdown, and YAML. You do not need to edit the layouts or CSS for routine updates.

## About and availability

Edit the introductory paragraphs in `index.html`, inside the section marked `id="about"`.

Profile facts, contact links, education, coursework, the profile image, Resume, and Academic CV links are in `_data/profile.yml`.

## Projects

Each homepage project is one Markdown file in `_projects/`. Edit its quoted `summary`, dates, organization, topics, links, image path, or alternative text in the YAML block between the two `---` lines.

Homepage order comes from `order`. Keep `detail_enabled: false` when the card should remain non-clickable. See `docs/CONTENT_SCHEMA.md` for every supported field.

To replace the blank quadrotor thumbnail, overwrite:

`assets/images/projects/autonomous-quadrotor/thumbnail.webp`

Use a WebP image with a landscape composition; 1200 × 800 pixels is ideal. Then replace the placeholder `thumbnail_alt` in `_projects/03-vio-quadcopter.md` with a literal description of what is visibly present.

## Publications

Each publication is one Markdown file in `_publications/`. Edit the title, ordered author list, venue, year, status, and supplied links in its YAML block. Add a new numbered file to add a publication.

Do not guess publication status, author order, or links. Leave unavailable links as empty strings.

## Images and documents

- Profile image: `assets/images/profile/smrithi-lokesh.webp`
- Project thumbnails: `assets/images/projects/<project-name>/thumbnail.webp`
- Public PDFs: `assets/documents/`

Internal paths in content must begin with `/` and templates must pass them through Jekyll's `relative_url` filter so the project-site base URL continues to work.

## Preview changes locally

```powershell
$env:JEKYLL_ENV = "production"
bundle exec jekyll build --baseurl /smrithi.github.io
bundle exec jekyll serve --baseurl /smrithi.github.io
```

Open `http://127.0.0.1:4000/smrithi.github.io/` while the server is running.
