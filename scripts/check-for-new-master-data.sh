#!/bin/bash

# Exit if pull request already exists
if [ -n "$(hub pr list -h new-master-data-*)" ]; then
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

# Get latest update date from JSON
json_date=$(jq -r '.[-1]' src/features/shinryoukoui-master-versions/shinryoukoui-master-versions.json)

# Compare dates and download new data if available
if [ "$date" != "$json_date" ]; then
  curl -o s_ALL${date}.zip https://www.ssk.or.jp/seikyushiharai/tensuhyo/kihonmasta/kihonmasta_01.files/s_ALL${date}.zip
  unzip s_ALL${date}.zip -d public/master-data/s
  rm s_ALL${date}.zip

  # Insert latest update date into JSON
  jq --arg date "$date" '. += [$date]' src/features/shinryoukoui-master-versions/shinryoukoui-master-versions.json > tmp.json
  mv tmp.json src/features/shinryoukoui-master-versions/shinryoukoui-master-versions.json

  # git config --global user.email "github-actions[bot]@users.noreply.github.com"
  # git config --global user.name "github-actions[bot]"
  # git checkout -b "new-master-data-${date}"
  # git add .
  # git commit -m "Add new master data for $date"
  # git push origin "new-master-data-${date}"
  # hub pull-request -m "Add new master data for ${date}" -b master -h "new-master-data-${date}"
else
  echo "No new master data available."
fi
