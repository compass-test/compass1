set -ex
. ./scripts/build-lambda.sh
export ARTEFACT_NAME=_sox/design-system-docs-lambda/$ZIP_NAME
echo 👉 $ARTEFACT_NAME
export VERSION=$(git rev-parse --short HEAD)
echo 👉 $VERSION

# Upload the lambda to s3
echo 👉 Uploading $ZIP_LOCATION to s3
atlas micros resource lambda upload -s design-system-docs-lambda -f $ZIP_LOCATION -e prod-east --prgb

# Set the lambda
echo 👉 Setting lambda $ARTEFACT_NAME to prod-east
atlas micros service deploy --file=design-system-docs-lambda.sd.yml --service=design-system-docs-lambda --env=prod-east
