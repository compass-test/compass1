#!/usr/bin/env bash

section() {
  printf "\n🏃💨 Running %s...\n" "$1"
}

msg() {
  if [ $# -eq 1 ]
  then
    level=1
    text=$1
  else
    level=$1
    text=$2
  fi
  indent=$((level*3 + 2))
  printf "%${indent}s"
  printf "%s\n" "$text"
}

finish() {
  printf "%5s"
  printf "🔚\n\n"
}

trap finish EXIT