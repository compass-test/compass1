source $(dirname "${BASH_SOURCE[0]}")/set-env-variables.sh

export LOCAL=true

nodemon -e ts,js -w /src/server/** -w /src/db/** -x ts-node -P scripts/tsconfig.json src/server/index.ts
