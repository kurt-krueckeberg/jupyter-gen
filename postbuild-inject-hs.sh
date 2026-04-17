#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="_build/html"
JS_NAME="antora-self-link.js"
JS_SOURCE="assets/js/$JS_NAME"

cp "$JS_SOURCE" "$BUILD_DIR/$JS_NAME"

find "$BUILD_DIR" -name '*.html' -print0 |
while IFS= read -r -d '' file; do
  if ! grep -q "$JS_NAME" "$file"; then
    sed -i '/<\/head>/i\  <script src="'"$JS_NAME"'"></script>' "$file"
  fi
done
