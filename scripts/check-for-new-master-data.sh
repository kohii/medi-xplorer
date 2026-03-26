#!/bin/bash

set -euo pipefail

create_pr() {
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
  local branch_name="new-master-data-${master_id}-${date}"

  if [ -n "$(gh pr list --search "head:${branch_name}" --state open)" ]; then
    echo "Pull request already exists for ${branch_name}."
    return 0
  fi

  mkdir -p "${files_dir}"

  if [ ! -f "${files_dir}/${file_name}" ]; then
    local zip_name="${files_prefix}${date}.zip"
    curl -s -o "${zip_name}" "${page_url%.html}.files/${zip_name}"
    unzip -o "${zip_name}" -d "${files_dir}/"
    rm "${zip_name}"

    git config --global user.email "github-actions[bot]@users.noreply.github.com"
    git config --global user.name "github-actions[bot]"
    git checkout -b "${branch_name}"
    git add .
    git commit -m "Add new ${master_id} master data for ${date}"
    git push origin "${branch_name}"
    gh pr create --title "Add new ${master_id} master data for ${date}" --body "This PR was created automatically by GitHub Actions" -B main -H "${branch_name}"
  else
    echo "No new ${master_id} master data available."
  fi
}

create_pr "shinryoukoui" \
  "https://www.ssk.or.jp/seikyushiharai/tensuhyo/kihonmasta/r06/kihonmasta_01.html" \
  "s_ALL" \
  "raw-master-data/s" \
  "kihonmasta_01\\.files"

create_pr "iyaku" \
  "https://www.ssk.or.jp/seikyushiharai/tensuhyo/kihonmasta/r06/kihonmasta_04.html" \
  "y_ALL" \
  "raw-master-data/y" \
  "kihonmasta_04\\.files"
