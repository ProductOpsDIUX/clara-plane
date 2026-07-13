#!/bin/bash
# Apply labels to the SKYPROTECT demo Knowledge Base pages.
#
# Setup:
#   1. Generate an Atlassian API token at https://id.atlassian.com/manage-profile/security/api-tokens
#   2. Export the three env vars below.
#   3. Run: ./apply-labels.sh
#
# Required env vars:
#   ATLASSIAN_SITE   e.g. yoursite.atlassian.net  (no protocol, no trailing slash)
#   ATLASSIAN_EMAIL  the Atlassian account email
#   ATLASSIAN_TOKEN  the API token from step 1
#
# Optional:
#   SPACE_KEY        defaults to SKYPROTECT — change if your space key differs

set -euo pipefail

: "${ATLASSIAN_SITE:?must be set}"
: "${ATLASSIAN_EMAIL:?must be set}"
: "${ATLASSIAN_TOKEN:?must be set}"
SPACE_KEY="${SPACE_KEY:-SKYPROTECT}"

BASE="https://${ATLASSIAN_SITE}/wiki/rest/api"
AUTH="-u ${ATLASSIAN_EMAIL}:${ATLASSIAN_TOKEN}"

# Pages that need labels: title => space-separated label list
declare -a PAGES=(
  "Counter-drone-systems|research prior-knowledge"
  "Research-synthesis|research synthesis"
  "Air-defence-commander|research artefact persona"
  "Console-operator|research artefact persona"
  "Engage-incoming-threat|research artefact journey-map"
  "Console-v1|research artefact prd"
  "Console-v1-usability-test|test artefact test-plan"
)

# Note: Research-synthesis exists twice (Programme-wide + Operator-console). The
# lookup below will find both; the script applies the same labels to each.

lookup_page_ids() {
  local title="$1"
  # Returns one ID per matching page, newline-separated
  curl -sf $AUTH \
    "${BASE}/content?spaceKey=${SPACE_KEY}&title=$(printf %s "$title" | sed 's/ /%20/g')&limit=25" \
    | python3 -c 'import sys, json; print("\n".join(r["id"] for r in json.load(sys.stdin).get("results", [])))'
}

add_label() {
  local page_id="$1" label="$2"
  curl -sf $AUTH -X POST \
    -H "Content-Type: application/json" \
    -d "[{\"prefix\":\"global\",\"name\":\"${label}\"}]" \
    "${BASE}/content/${page_id}/label" >/dev/null
}

for entry in "${PAGES[@]}"; do
  title="${entry%%|*}"
  labels="${entry##*|}"
  echo "→ ${title}"
  ids=$(lookup_page_ids "$title")
  if [[ -z "$ids" ]]; then
    echo "   (no page found — skipping)"
    continue
  fi
  for id in $ids; do
    for lbl in $labels; do
      add_label "$id" "$lbl"
      echo "   page ${id} ← ${lbl}"
    done
  done
done

echo "Done."
