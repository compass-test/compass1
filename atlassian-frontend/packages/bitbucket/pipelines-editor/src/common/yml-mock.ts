export const config1 = `# This is a sample build configuration for Docker.
# Check our guides at https://confluence.atlassian.com/x/O1toN for more examples.
# Only use spaces to indent your .yml configuration.
# -----
# You can specify a custom docker image from Docker Hub as your build environment.
image: atlassian/default-image:2

pipelines:
  default:
    - step:
        services:
          - docker
        script: # Modify the commands below to build your repository.
          - docker build -t $IMAGE_NAME .
          # authenticate with the Docker Hub registry
          - docker login --username $DOCKER_HUB_USERNAME  
                         --password $DOCKER_HUB_PASSWORD
          # push the new Docker image to the Docker registry
          - docker push $IMAGE_NAME
`;

export const configWithBidi = `pipelines:
  default:
    - step:
        script:
          - strcmp(access_level, "user‮ ⁦// Check if admin⁩ ⁦"))
`;
