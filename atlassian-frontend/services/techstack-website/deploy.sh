#!/bin/sh

serviceName="techstack-dev"
serviceDescriptor="./static-service-descriptor.sd.yaml"
serviceEnvironment="ddev"

cd services/techstack-website
yarn run prod

atlas micros static deploy -s $serviceName -e $serviceEnvironment -f $serviceDescriptor
