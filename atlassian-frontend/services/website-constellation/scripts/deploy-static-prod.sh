set -ex
. ./scripts/build-redirect-lambda.sh
export PROXY_NAME=_sox/design-system-docs/$ZIP_NAME
echo 👉 $PROXY_NAME

# Upload the lambda to s3
echo 👉 Uploading $ZIP_LOCATION to s3
atlas micros resource lambda upload -s design-system-docs -f $ZIP_LOCATION -e prod-east --prgb

# Provision the static service
echo 👉 Provisioning design-system-docs with lambda $PROXY_NAME to prod-east
atlas micros static provision --file=design-system-docs.sd.yml --service=design-system-docs --env=prod-east

# Deploy the static service
echo 👉 Deploying design-systme-docs with lambda $PROXY_NAME to prod-east
atlas micros static deploy --file=design-system-docs.sd.yml --service=design-system-docs --env=prod-east
