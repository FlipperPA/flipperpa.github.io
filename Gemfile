source "https://rubygems.org"

# Pins Jekyll and every plugin to the exact versions GitHub Pages uses, so the
# local build matches what is published. Bump with: bundle update github-pages
gem "github-pages", group: :jekyll_plugins

# Needed for `jekyll serve` on Ruby 3.0+ (no longer bundled with Ruby).
gem "webrick", "~> 1.8"

# Windows and JRuby do not include zoneinfo files.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", platforms: [:mingw, :x64_mingw, :mswin]
