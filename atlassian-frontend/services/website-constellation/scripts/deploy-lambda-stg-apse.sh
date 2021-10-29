set -ex
. ./scripts/build-lambda.sh
export ARTEFACT_NAME=design-system-docs-lambda/$ZIP_NAME
echo 👉 $ARTEFACT_NAME
export VERSION=$(git rev-parse --short HEAD)
echo 👉 $VERSION

# Upload the lambda to s3
echo 👉 Uploading $ZIP_LOCATION to s3
atlas micros resource lambda upload --service=design-system-docs-lambda --file=$ZIP_LOCATION --env=stg-apse

# Deploy the lambda
echo 👉 Deploying lambda $ARTEFACT_NAME to stg-apse
atlas micros service deploy --file=design-system-docs-lambda.sd.yml --service=design-system-docs-lambda --env=stg-apse
