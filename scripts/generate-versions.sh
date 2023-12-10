#!/bin/bash

# Define directories and files
MASTER_FILES_DIR="public/master-data/s/"
OUTPUT_FILENAME="src/features/shinryoukoui-master-versions/shinryoukoui-master-versions.json"

# Get version keys
versionKeys=()
for file in $(ls -r $MASTER_FILES_DIR | grep '.csv$'); do
	# file name format: s_ALL{yyyyMMdd}.csv
  key=$(echo $file | grep -oE '[0-9]{8}')
  if [ "$key" ]; then
    versionKeys+=($key)
  fi
done

# Write versions to JSON
echo "[" > $OUTPUT_FILENAME
for ((i=0; i<${#versionKeys[@]}; i++)); do
	if [ $i -eq $((${#versionKeys[@]}-1)) ]; then
		echo "\"${versionKeys[$i]}\"" >> $OUTPUT_FILENAME
	else
		echo "\"${versionKeys[$i]}\"," >> $OUTPUT_FILENAME
	fi
done
echo "]" >> $OUTPUT_FILENAME
