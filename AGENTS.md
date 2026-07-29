# Portfolio contributor guide

## Architecture

This is a GitHub Pages-compatible Jekyll site. The homepage is a continuous-scroll portfolio assembled from Liquid includes, collection documents, and YAML data.

- `index.html` controls homepage section order and introductory copy.
- `_layouts/default.html` provides the global document shell.
- `_layouts/detail.html` is the future project-detail layout.
- `_includes/` contains reusable sidebar and content-entry components.
- `_projects/`, `_publications/`, and `_experiences/` hold structured collection entries.
- `_data/profile.yml`, `_data/teaching.yml`, and `_data/beyond.yml` hold shared profile and non-collection content.
- `assets/css/main.css` contains the complete visual system.
- `assets/js/theme.js` contains the only client-side interaction.

The production site is a project site. `_config.yml` must retain:

```yaml
url: "https://smrithilo.github.io"
baseurl: "/smrithi.github.io"
```

Use Jekyll's `relative_url` filter for every internal page, image, script, stylesheet, and document URL. Do not introduce root-relative internal paths.

## Content schema

Follow `docs/CONTENT_SCHEMA.md`. Keep collection entries narrowly factual and use empty strings for links or fields that have not been supplied.

Do not invent or infer:

- research results, metrics, or claims;
- collaborators, affiliations, roles, or dates;
- publication decisions or statuses;
- paper, code, video, or profile links;
- project methods or personal contributions not present in a supplied source.

Never add an academic transcript. Private application documents belong under `application-materials/`, which is ignored by Git.

## Local build

```sh
bundle install
JEKYLL_ENV=production bundle exec jekyll build --baseurl /smrithi.github.io
bundle exec jekyll serve --baseurl /smrithi.github.io
```

On PowerShell:

```powershell
$env:JEKYLL_ENV = "production"
bundle exec jekyll build --baseurl /smrithi.github.io
```

The GitHub Actions workflow in `.github/workflows/pages.yml` builds and deploys `main` through GitHub Pages.

## Accessibility requirements

- Preserve semantic landmarks and a correct heading hierarchy.
- Every informative image needs useful alternative text.
- All controls and links must work with a keyboard.
- Preserve visible `:focus-visible` styles.
- Maintain sufficient contrast in both themes.
- Respect `prefers-color-scheme` and `prefers-reduced-motion`.
- The theme button must expose its current state and its available action.
- Test approximately 390 px, 430 px, 1024 px, and 1440 px wide.
- Finish with no missing internal assets or browser-console errors.

## Change discipline

Keep the site lightweight: HTML, Liquid, CSS, Markdown, YAML, and minimal JavaScript only. Do not add React, Next.js, Vue, Tailwind, Bootstrap, or a large theme. Preserve original media unless it is explicitly confirmed unused.
