#!/bin/bash

set -euo pipefail

UPDATED_MASTER_IDS=()
UPDATED_DATES=()
UPDATED_FILES=()

has_open_pr_for_update() {
  local master_id="$1"
  local date="$2"

  gh pr list --state open --json headRefName --jq '.[].headRefName' | grep -Fq "${master_id}-${date}"
}

collect_master_update() {
  local master_id="$1"
  local page_url="$2"
  local files_prefix="$3"
  local files_dir="$4"
  local page_file_prefix="$5"

  local content
  content=$(curl -s "${page_url}")
  local date
  date=$(echo "${content}" | grep -oE "${page_file_prefix}/${files_prefix}[0-9]{8}\\.zip" | grep -oE '[0-9]{8}' | head -n 1)

  if [ -z "${date}" ]; then
    echo "Failed to get latest update date from website for ${master_id}."
    return 1
  fi

  local file_name="${files_prefix}${date}.csv"

  if has_open_pr_for_update "${master_id}" "${date}"; then
    echo "Open pull request already exists for ${master_id} ${date}."
    return 0
  fi

  mkdir -p "${files_dir}"

  if [ ! -f "${files_dir}/${file_name}" ]; then
    local zip_name="${files_prefix}${date}.zip"
    curl -s -o "${zip_name}" "${page_url%.html}.files/${zip_name}"
    unzip -o "${zip_name}" -d "${files_dir}/"
    rm "${zip_name}"
    UPDATED_MASTER_IDS+=("${master_id}")
    UPDATED_DATES+=("${date}")
    UPDATED_FILES+=("${files_dir}/${file_name}")
  else
    echo "No new ${master_id} master data available."
  fi
}

create_pr() {
  if [ "${#UPDATED_MASTER_IDS[@]}" -eq 0 ]; then
    echo "No new master data available."
    return 0
  fi

  local branch_name="new-master-data"
  local title_suffix=""
  local body="This PR was created automatically by GitHub Actions.

Updated master data:"
  local i
  for i in "${!UPDATED_MASTER_IDS[@]}"; do
    local master_id="${UPDATED_MASTER_IDS[$i]}"
    local date="${UPDATED_DATES[$i]}"

    branch_name="${branch_name}-${master_id}-${date}"
    if [ -n "${title_suffix}" ]; then
      title_suffix="${title_suffix}, "
    fi
    title_suffix="${title_suffix}${master_id} ${date}"
    body="${body}
- ${master_id}: ${date}"
  done

  git config --global user.email "github-actions[bot]@users.noreply.github.com"
  git config --global user.name "github-actions[bot]"
  git checkout -b "${branch_name}"
  git add "${UPDATED_FILES[@]}"
  git commit -m "Add new master data: ${title_suffix}"
  git push origin "${branch_name}"
  gh pr create --title "Add new master data: ${title_suffix}" --body "${body}" -B main -H "${branch_name}"
}

collect_master_update "shinryoukoui" \
  "https://www.ssk.or.jp/seikyushiharai/tensuhyo/kihonmasta/kihonmasta_01.html" \
  "s_ALL" \
  "raw-master-data/s" \
  "kihonmasta_01\\.files"

collect_master_update "iyakuhin" \
  "https://www.ssk.or.jp/seikyushiharai/tensuhyo/kihonmasta/kihonmasta_04.html" \
  "y_ALL" \
  "raw-master-data/y" \
  "kihonmasta_04\\.files"

create_pr
