#!/bin/sh

# exit if any subcommand returns a non-zero status
set -e

find . -type f -name "*.js" -o -name "*.html" | xargs sed -i \
	-e "s|ENV_MODE|${MODE}|g"
exec "$@"
