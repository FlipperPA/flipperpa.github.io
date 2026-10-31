# flipperpa.github.io

My GitHub Pages site: a [Jekyll](https://jekyllrb.com/) site built with the
[`github-pages`](https://github.com/github/pages-gem) gem, containing everything
migrated from [PyPhilly.org](https://pyphilly.org).

## What is where

| Path | Purpose |
|------|---------|
| `_posts/` | **Posts**, one Markdown file per post: `YYYY-MM-DD-slug.md`. Published at `/slug/`, the same URLs as the old PyPhilly.org. |
| `_projects/` | **Open Source Projects**, published at `/open-source-projects/<name>/`. The listing page is `open-source-projects/index.md`. |
| `about.md` | **About** |
| `index.html` | Home page: paginated list of posts (10 per page). |
| `tags.md` | Posts grouped by tag, at `/tags/`. |
| `_config.yml` | Site settings, plugins, permalinks. |
| `_data/navigation.yml` | The three menu items (Posts, Open Source Projects, About). |
| `_layouts/`, `_includes/` | Page templates and reusable snippets (header, footer, tags, `youtube.html`, `vimeo.html`, `figure.html`). |
| `assets/` | `css/main.css`, `css/syntax.css` (code highlighting), `js/main.js` (copy-code buttons), and `images/` (every image from the old site, so nothing depends on AWS S3). |
| `resume/`, `parking/`, `ice-cream/` | Plain static pages, published at `/resume/`, `/parking/` and `/ice-cream/`. They are deliberately **not** in the menu. |

## Viewing the site locally

Jekyll is a Ruby program. You need Ruby 3.x (with development headers), Bundler,
and a C compiler/`make` once to build a few gems. For example:

```bash
# Fedora / RHEL
sudo dnf install ruby ruby-devel gcc gcc-c++ make redhat-rpm-config
# Debian / Ubuntu
sudo apt install ruby-full build-essential zlib1g-dev
# macOS
brew install ruby   # then follow brew's note to put it on your PATH

gem install bundler
```

Then, from the root of this repository:

```bash
bundle install                    # first time only; installs Jekyll + the GitHub Pages gems
bundle exec jekyll serve --livereload
```

`bundle install` puts the gems in `vendor/bundle/` inside this repository (set by
the committed `.bundle/config`), so it needs no `sudo` and never touches the
system Ruby's gem directory. If you ever see
`Bundler::PermissionError ... /usr/share/gems/...`, that file is missing or
overridden; run `bundle config set --local path vendor/bundle` and try again.

Open <http://localhost:4000>. The site rebuilds and the browser refreshes whenever
you save a file, except for changes to `_config.yml`, which need a restart of the
server. Add `--drafts` to also preview files in a `_drafts/` directory.

To check that a build is clean without serving it: `bundle exec jekyll build`
(output goes to `_site/`, which is git-ignored).

To pick up newer GitHub Pages versions: `bundle update github-pages`.

## Writing content

### A new post

Create `_posts/2026-11-01-my-new-post.md`. The slug in the file name becomes the
URL (`/my-new-post/`):

```markdown
---
title: "My New Post"
tags: ["Python", "Django"]
description: "One or two sentences, used on the home page and in link previews."
---

Regular Markdown, with `inline code`...
```

Optionally add `hero: /assets/images/some-image.jpg` for a banner image. A new
project is the same, but lives in `_projects/my-project.md` (no date needed).

### Code and syntax highlighting

Use fenced code blocks with a language name; they are highlighted by Rouge, with
light and dark colour schemes that follow the reader's system setting:

````markdown
```python
def hello():
    return "world"
```
````

Valid language names include `python`, `bash`, `javascript`, `css`, `json`, `sql`,
`html`, `yaml`, `diff`; see `bundle exec rougify list` for all of them.

If code or text contains Liquid syntax such as `{{ variable }}` or
`{% url "name" %}` (Django and Wagtail templates do),
Jekyll will try to evaluate it. Wrap that part of the page in raw tags:

```text
{% raw %}
... content containing {{ braces }} and {% tags %} ...
{% endraw %}
```

### Videos

```liquid
{% include youtube.html id="L42AX0HrRFg" start="636" title="DjangoCon US 2018 - Lightning Talks Day 2" %}
{% include vimeo.html id="123456789" title="Optional title" %}
```

(`id` is the part after `v=` in a YouTube URL; `start` in seconds is optional.)
Both are responsive, 16:9, and lazy-loaded.

### Images

Put the file in `assets/images/`, then:

```liquid
{% include figure.html src="/assets/images/photo.jpg" alt="Describe it" caption="Optional caption" credit="Optional credit" %}
{% include figure.html src="/assets/images/photo.jpg" alt="..." align="right" width="420" %}
```

`align` is `center` (default), `left`, or `right`; left/right float beside the text.

## Publishing to GitHub

This repository is a *user site* (`flipperpa/flipperpa.github.io`), so GitHub
builds and publishes the Jekyll site itself whenever `main` is pushed. No build
step or `_site/` upload is needed.

One-time setup: on GitHub go to **Settings → Pages → Build and deployment** and
set **Source** to **Deploy from a branch**, with branch **`main`** and folder
**`/ (root)`**.

Each time you want to publish:

```bash
bundle exec jekyll build        # optional sanity check, should finish with no errors
git status                      # review what changed
git add -A
git commit -m "Describe the change"
git push origin main
```

The build takes about a minute; progress is shown under the repository's
**Actions** tab (the "pages build and deployment" workflow). Then check
<https://flipperpa.github.io>. If the build fails, the error is shown in that
workflow run and in **Settings → Pages**.

If your default branch is not `main`, use its name above.

## Moving pyphilly.org to this site

Test everything at <https://flipperpa.github.io> first: click through the menu,
a few posts with code samples and videos, `/about/`, `/resume/`, `/parking/`
and `/ice-cream/`. Then:

1. **Set the custom domain.** In **Settings → Pages → Custom domain** enter
   `pyphilly.org` and save. GitHub commits a `CNAME` file containing that name to
   the repository (run `git pull` afterwards). Do not add the `CNAME` file until
   you are ready: once it exists, `flipperpa.github.io` redirects to the custom domain.
2. **Update DNS** wherever pyphilly.org's DNS is hosted (e.g. Route 53). Replace
   the records that point at the AWS site with:
   - four `A` records for the apex `pyphilly.org`: `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - four `AAAA` records (optional): `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - a `CNAME` record `www` → `flipperpa.github.io`

   See [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
   for the current values.
3. **Wait** for DNS to propagate (minutes to hours), then tick **Enforce HTTPS**
   in **Settings → Pages** once GitHub has issued the certificate.
4. In `_config.yml`, change `url: "https://flipperpa.github.io"` to
   `url: "https://pyphilly.org"` (used for canonical links, the RSS feed and the
   sitemap), then commit and push.
5. Once <https://pyphilly.org> serves the new site, you can tear down the AWS
   (Lambda/Zappa) site and its S3 media bucket.

### Differences from the old site

- Old post, project and about URLs are unchanged. The old `?page=2` style
  pagination is now `/page2/`, and old `/category/...` URLs are now tags on `/tags/`.
- There is an RSS feed at `/feed.xml` and a sitemap at `/sitemap.xml`.
