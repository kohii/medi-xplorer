#!/bin/bash

set -euo pipefail

write_versions() {
	local master_files_dir="$1"
	local output_filename="$2"

	local versionKeys=()
	if [ -d "${master_files_dir}" ]; then
		for file in $(ls -r "${master_files_dir}" | grep '.csv$'); do
			# file name format: *_ALL{yyyyMMdd}.csv
			key=$(echo "${file}" | grep -oE '[0-9]{8}')
			if [ "${key}" ]; then
				versionKeys+=("${key}")
			fi
		done
	fi

	echo "[" > "${output_filename}"
	for ((i=0; i<${#versionKeys[@]}; i++)); do
		if [ $i -eq $((${#versionKeys[@]}-1)) ]; then
			echo "\"${versionKeys[$i]}\"" >> "${output_filename}"
		else
			echo "\"${versionKeys[$i]}\"," >> "${output_filename}"
		fi
	done
	echo "]" >> "${output_filename}"
}

write_versions "raw-master-data/s/" "src/features/shinryoukoui-master-versions/shinryoukoui-master-versions.json"
write_versions "raw-master-data/y/" "src/features/iyaku-master-versions/iyaku-master-versions.json"
