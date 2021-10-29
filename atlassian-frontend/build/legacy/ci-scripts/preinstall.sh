#!/bin/bash

# The renovate job is shared so we can't control it's node version
# so we want to make sure we noop the node version check
# It's a slightly older 12.x.x version atm
#
# The DISABLE_PREINSTALL Flag is only used to use yarn on the repo
if [[ ! -z "${RENOVATE_REPOSITORIES}" || ! -z "${DISABLE_PREINSTALL}" ]]; then
  exit 0;
fi

# enforce node version is correct
RED='\033[31m'
NC='\033[0m'
NODE_VERSION=$(node -v)
NVM_NODE_VERSION=$(cat .nvmrc | xargs echo -n)

get_major() {
     tr -d 'v' | cut -d'.' -f1
}

# This file is a copy paste from Confluence-frontend except for the next line
# Confluence frontend does a less then check on major.
# I think in atlassian-frontend we probably want to check if they are not equal
if [ "$(node -v | get_major)" != "$(echo ${NVM_NODE_VERSION} | get_major)" ]; then
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}                                                                                            ${NC}"
  echo -e "${RED}             YOU ARE USING WRONG NODE VERSION ${NODE_VERSION}.                              ${NC}"
  echo -e "${RED}             EXPECTED NODE VERSION IS ${NVM_NODE_VERSION}.                                  ${NC}"
  echo -e "${RED}             PLEASE RUN "nvm use" TO LOAD CORRECT NODE VERSION FROM ".nvmrc" file.          ${NC}"
  echo -e "${RED}                                                                                            ${NC}"
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}############################################################################################${NC}"
  exit 1
fi

if [[ $npm_execpath != *bolt* && $bolt_config_user_agent != *bolt* ]]; then
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}                                                                                            ${NC}"
  echo -e "${RED}    ERROR: You must use Bolt to install, add dependencies and run atlassian-frontend        ${NC}"
  echo -e "${RED}    Example: $ bolt install / bolt add / bolt start                                         ${NC}"
  echo -e "${RED}                                                                                            ${NC}"
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}############################################################################################${NC}"
  echo -e "${RED}############################################################################################${NC}"
  exit 1
fi

node build/metrics/build-reporting/scripts/add-attribute.js boltInstallStart=$(date +%s)
