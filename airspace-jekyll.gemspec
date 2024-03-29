# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "airspace-jekyll"
  spec.version       = "0.1.1"
  spec.authors       = ["ndrewtl"]
  spec.email         = ["ndrewtl@users.noreply.github.com"]

  spec.summary       = %q{A port of ThemeFisher's Airspace theme. https://github.com/themefisher/airspace-free-html5-agency-template}
  spec.homepage      = "http://example.com"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(_layouts|_includes|_sass|LICENSE|README)/i}) }

  spec.add_development_dependency "jekyll", "~> 4.3.3"
  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
end
