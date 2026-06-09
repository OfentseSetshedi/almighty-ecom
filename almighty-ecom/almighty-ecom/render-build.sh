#!/usr/bin/env bash

set -euo pipefail

readonly SITE_URL="${RENDER_EXTERNAL_URL:-https://almighty-ecom.onrender.com}"
readonly CLEAN_SITE_URL="${SITE_URL%/}"
readonly TODAY="$(date -u +%F)"
readonly OUTPUT_DIR="dist"

readonly -a HTML_FILES=(
  "index.html"
  "shop.html"
  "price-list.html"
  "trade-in.html"
  "about.html"
  "contact.html"
  "404.html"
  "googleb4578414c948e172.html"
)

readonly -a STATIC_FILES=(
  "style.css"
  "script.js"
  "site.webmanifest"
)

rm -rf "${OUTPUT_DIR}"
mkdir -p "${OUTPUT_DIR}"

# Copy only the files required by the public website.
cp -R "assets" "${OUTPUT_DIR}/assets"
cp "${HTML_FILES[@]}" "${OUTPUT_DIR}/"
cp "${STATIC_FILES[@]}" "${OUTPUT_DIR}/"

cat > "${OUTPUT_DIR}/robots.txt" <<ROBOTS
User-agent: *
Allow: /

Sitemap: ${CLEAN_SITE_URL}/sitemap.xml
ROBOTS

cat > "${OUTPUT_DIR}/sitemap.xml" <<SITEMAP
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${CLEAN_SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${CLEAN_SITE_URL}/shop.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${CLEAN_SITE_URL}/price-list.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${CLEAN_SITE_URL}/trade-in.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${CLEAN_SITE_URL}/about.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${CLEAN_SITE_URL}/contact.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
SITEMAP

printf 'Render build complete for %s\n' "${CLEAN_SITE_URL}"
