source "https://rubygems.org"

gem "jekyll", "~> 3.9.2"
gem "bundler"
gem "bundle-audit"
gem "faraday-retry"

# If you want to use GitHub Pages, remove the 'gem "jekyll"' above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-remote-theme"
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-coffeescript"
  gem "jekyll-default-layout"
  gem "jekyll-gist"
  gem "jekyll-github-metadata"
  gem "jekyll-optional-front-matter"
  gem "jekyll-paginate-v2"
  gem "jekyll-readme-index"
  gem "jekyll-titles-from-headings"
  gem "jekyll-relative-links"
  gem "jekyll-spaceship"
  gem "jekyll-include-cache"
  gem "jekyll-pdf-embed"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", :install_if => Gem.win_platform?

# kramdown v2 ships without the gfm parser by default. If you"re using
# kramdown v1, comment out this line.
gem "kramdown-parser-gfm"
