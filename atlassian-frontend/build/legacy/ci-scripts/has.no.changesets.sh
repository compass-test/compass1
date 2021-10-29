#!/bin/sh
package="${1:-.}"
if yarn changeset status | grep $package; then
    echo "Failing because found changesets on the branch"
    exit 1;
else
    exit 0;
fi
