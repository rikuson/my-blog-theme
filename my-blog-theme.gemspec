
Gem::Specification.new do |spec|
  spec.name          = "my-blog-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["Rikson"]
  spec.email         = ["noskir123@yahoo.co.jp"]

  spec.summary       = "Blog theme for my blog"
  spec.description   = "It's based on jekyll and bootstrap-4."
  spec.homepage      = "http://rikson.net"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"
  spec.add_development_dependency "bundler", "~> 1.16"
end
