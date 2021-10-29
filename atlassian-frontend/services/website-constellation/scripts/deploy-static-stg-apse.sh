set -ex
. ./scripts/build-redirect-lambda.sh
export PROXY_NAME=design-system-docs/$ZIP_NAME
echo 👉 $PROXY_NAME

# Upload the lambda to s3
echo 👉 Uploading $ZIP_LOCATION to s3
atlas micros resource lambda upload -s design-system-docs -f $ZIP_LOCATION -e stg-apse

# Provision the static service
echo 👉 Provisioning design-system-docs with lambda $PROXY_NAME to stg-apse
atlas micros static provision --file=design-system-docs.sd.yml --service=design-system-docs --env=stg-apse

# Deploy the static service
echo 👉 Deploying design-systme-docs with lambda $PROXY_NAME to stg-apse
atlas micros static deploy --file=design-system-docs.sd.yml --service=design-system-docs --env=stg-apse
