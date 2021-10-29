#!/bin/sh

set -e

# set AWS / S3 variables
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY
export AWS_DEFAULT_REGION=ap-southeast-2
S3_BUCKET_NAME=atlaskit-artefacts
TRACE_DIR=traces/componentlab

# install deps
apt-get update
apt-get install -y pigz curl unzip rename
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && ./aws/install

# compress trace files to save space on S3
pigz --best $TRACE_DIR/*.json

# remove .gz extension so later we can download JSON and browser will handle decompression
rename "s/.json.gz$/.json/" $TRACE_DIR/*.json.gz

# upload to S3
aws s3 cp $TRACE_DIR s3://$S3_BUCKET_NAME/componentlab --recursive --content-type application/json --content-encoding gzip

echo -e "\n\nSuccessfully uploaded trace files to S3: "

for filePath in $TRACE_DIR/*
do
  fileName=`basename $filePath`
  echo "https://s3-$AWS_DEFAULT_REGION.amazonaws.com/$S3_BUCKET_NAME/componentlab/$fileName"
done