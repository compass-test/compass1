#!/usr/bin/env bash
cd "$(dirname "$0")"

if ! [[ -x "$(command -v plantuml)" ]]; then
  echo 'Run "brew install plantuml" to install PlantUML.' >&2
  exit 1
fi

plantuml -Sdpi=150 -progress .
