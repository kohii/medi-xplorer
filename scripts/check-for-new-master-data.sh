#!/bin/bash

# Exit if pull request already exists
if [ -n "$(gh pr list --search head:new-master-data --state open)" ]; then
  echo "Pull request already exists."
  exit 0
fi

# Get latest update date from website
content=$(curl https://www.ssk.or.jp/seikyushiharai/tensuhyo/kihonmasta/kihonmasta_01.html)
date=$(echo $content | grep -oE 'kihonmasta_01\.files/s_ALL[0-9]{8}\.zip' | grep -oE '[0-9]{8}')

if [ -z "$date" ]; then
  echo "Failed to get latest update date from website."
  exit 1
fi

file_name="s_ALL${date}.csv"

# Download latest master data if not exists
if [ ! -f "raw-master-data/s/$file_name" ]; then
  curl -o s_ALL${date}.zip https://www.ssk.or.jp/seikyushiharai/tensuhyo/kihonmasta/kihonmasta_01.files/s_ALL${date}.zip
  unzip s_ALL${date}.zip -d raw-master-data/s/
  rm s_ALL${date}.zip

  git config --global user.email "github-actions[bot]@users.noreply.github.com"
  git config --global user.name "github-actions[bot]"
  git checkout -b "new-master-data-${date}"
  git add .
  git commit -m "Add new master data for $date"
  git push origin "new-master-data-${date}"
  gh pr create --title "Add new master data for ${date}" --body "This PR was created automatically by GitHub Actions" -B main -H "new-master-data-${date}"
else
  echo "No new master data available."
fi
