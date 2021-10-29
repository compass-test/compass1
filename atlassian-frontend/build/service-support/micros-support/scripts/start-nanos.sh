#!/bin/sh

PROGNAME=$0

usage() {
  cat << EOF >&2
Usage: $PROGNAME -s <service-name>
  -s: service name to use for nanos deploy
EOF
  exit 1
}

service=""
while getopts s: c
do
  case $c in
    (s) service=$OPTARG;;
    (*) usage
  esac
done

echo $service

if [ -z "$service" ]
then
  echo "Error: service name is required."
  usage
fi

echo "Starting nano's this boots up all locally required resources (like dynamoDB)"
echo "Once nano's has booted, you can run your lambda using yarn jest with the package directory"
nanos service:deploy $service -v --foreground --skipBuild --writeEnvFile nanos-env.json
