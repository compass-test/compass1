#!/bin/sh

serviceName="statuspage-chainlink"
serviceDescriptor="./static-service-descriptor.sd.yaml"
serviceEnvironment="ddev"

cd services/statuspage-chainlink
yarn run prod

atlas micros static provision -s $serviceName -e $SERVICE_ENV -f $serviceDescriptor

atlas micros static deploy -s $serviceName -e $SERVICE_ENV -f $serviceDescriptor
