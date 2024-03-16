source "https://rubygems.org"

gem "faraday-retry", "~> 2.2"
gem "jekyll", "~> 4.3.3"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-coffeescript", "~> 2.0"
  gem "jekyll-default-layout", "~> 0.1.5"
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-gist", "~> 1.3"
  gem "jekyll-github-metadata", "~> 2.16"
  gem "jekyll-include-cache", "~> 0.2.1"
  gem "jekyll-link-attributes", "~> 1.0"
  gem "jekyll-optional-front-matter", "~> 0.3.2"
  gem "jekyll-paginate-v2", "~> 3.0"
  gem "jekyll-pdf-embed", "~> 1.1"
  gem "jekyll-readme-index", "~> 0.3.0"
  gem "jekyll-relative-links", "~> 0.7.0"
  gem "jekyll-remote-theme", "~> 0.4.3"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-spaceship", "~> 0.10.2"
  gem "jekyll-titles-from-headings", "~> 0.5.3"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
