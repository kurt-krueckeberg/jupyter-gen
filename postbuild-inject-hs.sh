#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="_build/html"
JS_SOURCE="assets/js/enlarge-image.js"
DEST_REL="assets/js/enlarge-image.js"
DEST_PATH="$BUILD_DIR/$DEST_REL"

mkdir -p "$(dirname "$DEST_PATH")"
cp "$JS_SOURCE" "$DEST_PATH"

find "$BUILD_DIR" -type f -name '*.html' -print0 |
while IFS= read -r -d '' file; do
  rel="${file#$BUILD_DIR/}"
  rel_dir="$(dirname "$rel")"

  if [[ "$rel_dir" == "." ]]; then
    prefix=""
  else
    depth="$(awk -F/ '{print NF}' <<< "$rel_dir")"
    prefix=""
    for ((i=0; i<depth; i++)); do
      prefix+="../"
    done
  fi

  script_src="${prefix}${DEST_REL}"

  if ! grep -Fq "$DEST_REL" "$file"; then
    sed -i '/<\/body>/i\  <script src="'"$script_src"'"></script>' "$file"
  fi
done
