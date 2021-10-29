import validateYaml from '../validator';

describe('validator util', () => {
  const valid = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        name: step1
        script:
          - echo "hello"
`;

  const invalidSpacing = `
image: ubuntu:16.04
pipelines:
default:
- step:
script:
- echo "hello"
`;

  const invalidEmptySection = `
pipelines:
  default:
    - step:
        name: step1
        script:
          -
`;

  const validGlobalMaxTime = `
options:
  max-time: 60
pipelines:
  default:
    - step:
        script:
          - echo "hello"
`;

  const invalidGlobalMaxTime = `
options:
  max-time: 0
pipelines:
  default:
    - step:
        script:
          - echo "hello"
`;

  const validStepMaxTime = `
pipelines:
  default:
    - step:
        max-time: 60
        script:
          - echo "hello"
`;

  const invalidStepMaxTime = `
pipelines:
  default:
    - step:
        max-time: 121
        script:
          - echo "hello"
`;

  const longrunningStepMaxTime = `
pipelines:
  default:
    - step:
        max-time: 240
        script:
          - echo "hello"
`;

  const validGlobalSize = `
options:
  size: 2x
pipelines:
  default:
    - step:
        script:
          - echo "hello"
`;

  const invalidGlobalSizeType = `
options:
  size: 2
pipelines:
  default:
   - step:
       script:
         - echo "hello"
`;

  const invalidGlobalSizeValue = `
options:
  size: 3x
pipelines:
  default:
    - step:
        script:
          - echo "hello"
`;

  const validStepSize = `
pipelines:
  default:
    - step:
        size: 2x
        script:
          - echo "hello"
`;

  const invalidStepSizeType = `
pipelines:
  default:
    - step:
        size: 2
        script:
          - echo "hello"
`;

  const invalidStepSizeValue = `
pipelines:
  default:
    - step:
        size: 3x
        script:
          - echo "hello"
`;

  const validStepCloneEnabled = `
pipelines:
  default:
    - step:
        clone:
          enabled: false
        script:
          - echo "hello"
`;

  const invalidStepCloneEnabled = `
pipelines:
  default:
    - step:
        clone:
          enabled: no
        script:
          - echo "hello"
`;
  const validConditionalChangesetStep = `
pipelines:
  default:
    - step:
        condition:
          changesets:
            includePaths:
               - xxx/*
        script:
          - echo "hello"
`;

  const invalidConditionalChangesetStep = `
pipelines:
  default:
    - step:
        condition:
          changesets:
             includePaths: xxx/*
        script:
          - echo "hello"
`;

  const validAws = `
image:
  name: 123.dkr.ecr.region-name.amazonaws.com/image:tag
  aws:
    access-key: granted
    secret-key: shhhh
pipelines:
  default:
    - step:
        script:
          - echo "hello"
`;

  const missingAwsProperty = `
image:
  name: 123.dkr.ecr.region-name.amazonaws.com/image:tag
  aws:
    access-key: granted
pipelines:
  default:
    - step:
        script:
          - echo "hello"
`;

  const validAwsOidc = `
image:
  name: 123.dkr.ecr.region-name.amazonaws.com/image:tag
  aws:
    oidc-role: role
pipelines:
  default:
    - step:
        script:
          - echo "hello"
`;

  const validMultipleSteps = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        name: step1
        artifacts:
          - target/**.jar
        script:
          - echo "step 1"
    - step:
        name: step2
        script:
          - echo "step 2"
`;

  const invalidFirstManualStep = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        trigger: "manual"
        name: step1
        script:
          - echo "step 1"
    - step:
        name: step2
        script:
          - echo "step 2"
`;

  const validManualStep = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        trigger: "automatic"
        name: step1
        script:
          - echo "step 1"
    - step:
        trigger: "manual"
        name: step1
        script:
          - echo "step 1"
`;

  const validEnvironmentStep = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        deployment: test
        script:
          - echo "step 1"
`;

  const validCustomEnvironmentStep = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        deployment: random
        script:
          - echo "step 1"
    - step:
        deployment: 123
        script:
          - echo "step 2"
`;

  const validParallelEnvironmentStep = `
image: ubuntu:16.04
pipelines:
  default:
    - parallel:
      - step:
          deployment: prod-east
          script:
            - echo "step 1"
      - step:
          deployment: prod-west
          script:
            - echo "step 1"
`;

  const invalidEnvironmentStep = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        deployment: rand$om
        script:
          - echo "step 1"
`;

  const validEnvironmentsPipeline = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        deployment: test
        script:
          - echo "step 1"
    - step:
        deployment: production
        script:
          - echo "step 2"
`;

  const validEnvironmentsPipelines = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        deployment: test
        script:
          - echo "step 1"
  branches:
    feature:
      - step:
          deployment: test
          script:
            - echo "step 2"
`;

  const invalidCacheName = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        deployment: test
        script:
          - echo "step 1"
definitions:
  caches:
    -Test/Cache-: test/location
`;

  const validCacheName = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        deployment: test
        script:
          - echo
definitions:
  caches:
    test-2: test/location
`;

  const validDefaultCacheName = `
pipelines:
  default:
    - step:
        script:
          - echo "hi"
        caches:
          - maven
          - gradle
          - node
          - pip
          - composer
          - dotnetcore
          - sbt
          - ivy2
`;

  const reservedCacheName = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        deployment: test
        script:
          - echo
definitions:
  caches:
    docker: foo
`;

  const validDockerCacheWithGlobalOption = `
options:
  docker: true
pipelines:
  default:
    - step:
        script:
          - echo "hi"
        caches:
          - docker
`;

  const validDockerCacheWithDockerService = `
pipelines:
  default:
    - step:
        script:
          - echo "hi"
        caches:
          - docker
        services:
          - docker
`;

  const invalidDockerCache = `
pipelines:
  default:
    - step:
        script:
          - echo "hi"
        caches:
          - docker
`;

  const invalidServiceDefinition = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        script:
          - echo
definitions:
  services:
    foo: 1
`;

  const invalidServiceDefinitionNoImage = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        script:
          - echo
definitions:
  services:
    foo:
`;

  const invalidServiceDefinitionEmptyImageDefinition = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        script:
          - echo
definitions:
  services:
    foo:
      image:
`;

  const referenceUndefinedCacheDefinition = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        script:
          - echo
        caches:
          - foo
          - baz
definitions:
  caches:
    foo: bar
`;

  const exceedServicesMemoryLimitDefault1x = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        script:
          - echo
        services:
          - foo
          - baz
          - bar
          - buz
definitions:
  services:
    foo:
      image: foo
    bar:
      image: bar
    baz:
      image: baz
    buz:
	  image: buz
`;

  const exceedServicesMemoryLimitCustom1x = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        script:
          - echo
        services:
          - foo
definitions:
  services:
    foo:
      image: foo
      memory: 5000
`;

  const exceedServicesMemoryLimitSize1x = `
options:
  size: 2x
image: ubuntu:16.04
pipelines:
  default:
    - step:
        size: 1x
        script:
          - echo
        services:
          - foo
          - baz
          - bar
          - buz
definitions:
  services:
    foo:
      image: foo
    bar:
      image: bar
    baz:
      image: baz
    buz:
      image: buz
`;

  const exceedServicesMemoryLimitCustom2x = `
image: ubuntu:16.04
pipelines:
  default:
    - step:
        size: 2x
        script:
          - echo
        services:
          - foo
definitions:
  services:
    foo:
      image: foo
	  memory: 100000
`;

  const exceedServicesMemoryLimitOverwriteSystemService = `
pipelines:
  default:
    - step:
        script:
          - echo "hi"
        services:
          - docker
definitions:
  services:
    docker:
      image: docker
      memory: 5000
`;

  const validServicesMemoryLimits = `
options:
  size: 2x
image: ubuntu:16.04
pipelines:
  default:
    - step:
        size: 1x
        script:
          - echo
        services:
          - foo
          - baz
          - bar
    - step:
        script:
          - echo
        services:
          - foo
          - baz
          - bar
          - buz
definitions:
  services:
    foo:
      image: foo
    bar:
      image: bar
    baz:
      image: baz
    buz:
      image: buz
`;

  const validServicesMemoryLimitOverwriteSystemService = `
pipelines:
  default:
    - step:
        script:
          - echo "hi"
        services:
          - docker
definitions:
  services:
    docker:
      memory: 3072
`;

  const validServicesDockerType = `
pipelines:
  default:
    - step:
        script:
          - echo "hi"
        services:
          - docker-system
definitions:
  services:
    docker-system:
      type: docker
      memory: 1024
`;

  const invalidServicesDockerType = `
pipelines:
  default:
    - step:
        script:
          - echo "hi"
        services:
          - docker-system
definitions:
  services:
    docker-system:
      type: dockerX
      memory: 1024
`;

  const validParallelSteps = `
pipelines:
  default:
    - step:
        script:
          - echo "Step0"
    - parallel:
      - step:
          caches:
            - maven
          script:
            - echo "ParallelStep0"
      - step:
          artifacts:
            - ~/.m2/**
          script:
            - echo "ParallelStep1"
    - step:
       script:
         - echo "Step1"
`;

  const validParallelStepsWithManualTrigger = `
pipelines:
  default:
    - parallel:
      - step:
          trigger: 'manual'
          script:
            - echo "ParallelStep0"
`;

  const invalidTooManySteps = `
pipelines:
  default:
    - step:
        script:
          - echo "Step0"
    - step:
        script:
          - echo "Step1"
    - step:
        script:
          - echo "Step2"
    - parallel:
      - step:
          script:
            - echo "ParallelStep3"
      - step:
          script:
            - echo "ParallelStep4"
        - step:
          script:
            - echo "ParallelStep5"
     - step:
        script:
          - echo "Step6"
    - step:
        script:
          - echo "Step7"
    - step:
        script:
          - echo "Step8"
    - parallel:
      - step:
          script:
            - echo "ParallelStep9"
      - step:
          script:
            - echo "ParallelStep10"
`;

  const validRootEntityClone = `
clone:
  depth: 10
  lfs: true
  enabled: false
pipelines:
  default:
    - step:
        script:
          - echo "clone"
`;

  const invalidRootEntityClone = `
clone:
  depth: 10
  lfs: true
  enabled: false
  skip-ssl-verify: true
pipelines:
  default:
    - step:
        script:
          - echo "clone"
`;

  const validCloudStepClone = `
pipelines:
  default:
    - step:
        clone:
          depth: 10
          lfs: true
          enabled: false
        script:
          - echo "clone"
`;

  const invalidCloudStepClone = `
pipelines:
  default:
    - step:
        clone:
          depth: 10
          lfs: true
          enabled: false
          skip-ssl-verify: true
        script:
          - echo "clone"
`;

  const validRunnerStepCloneWithInlineLabel = `
pipelines:
  default:
    - step:
        runs-on: self.hosted
        clone:
          depth: 10
          lfs: true
          enabled: false
          skip-ssl-verify: true
        script:
          - echo "clone"
`;

  const validRunnerStepCloneWithLabelList = `
pipelines:
  default:
    - step:
        runs-on:
          - self.hosted
        clone:
          depth: 10
          lfs: true
          enabled: false
          skip-ssl-verify: true
        script:
          - echo "clone"
`;

  const invalidRunnerStepCloneWithInlineLabel = `
pipelines:
  default:
    - step:
        runs-on: foo
        clone:
          depth: 10
          lfs: true
          enabled: false
          skip-ssl-verify: true
        script:
          - echo "clone"
`;

  const invalidRunnerStepCloneWithLabelList = `
pipelines:
  default:
    - step:
        runs-on: foo
        clone:
          depth: 10
          lfs: true
          enabled: false
          skip-ssl-verify: true
        script:
          - echo "clone"
`;

  const invalidRunnerSize = `
pipelines:
  default:
    - step:
        size: 10x
        runs-on:
          - self.hosted
        script:
          - echo "clone"
`;

  const validAnchor = `
image: openjdk:8
pipelines:
  default:
    - step: &buildSnapshot
        name: Build snapshot
        caches:
          - gradle
        script:
          - bash ./gradlew clean
          - bash ./gradlew build
  branches:
    develop:
      - step: *buildSnapshot
`;

  const validMinimalPipe = `
pipelines:
    default:
      - step:
          services:
            - docker
          script:
            - pipe: my-pipe
`;

  const validPipeWithEnvironment = `
pipelines:
  default:
    - step:
        services:
          - docker
        script:
          - pipe: my-pipe
            name: my special pipe
            environment:
              someKey: someValue
              anotherKey: anotherValue
`;

  const validPipeWithVariables = `
pipelines:
  default:
    - step:
        services:
          - docker
        script:
          - pipe: my-pipe
            name: my special pipe
            variables:
              someKey: 1
              anotherKey: anotherValue
`;

  const validPipeWithVariablesArray = `
pipelines:
  default:
    - step:
        services:
          - docker
        script:
          - pipe: my-pipe
            name: my special pipe
            variables:
              someKey: ['val1', 'val2', 'val3']
`;

  const validPipeWithVariablesAndVariablesArray = `
pipelines:
  default:
    - step:
        services:
          - docker
        script:
          - pipe: my-pipe
            name: my special pipe
            variables:
              someKey: ['val1', 'val2', 'val3']
              anotherKey: 'xxx'
              yetAnotherKey: ['foo']
`;

  const validCombinedScriptCommandsAndPipes = `
pipelines:
  default:
    - step:
        services:
          - docker
        script:
          - echo 'foo'
          - pipe: my-pipe-before
          - echo 'bar'
          - pipe: my-pipe-after
`;

  const validParallelStepWithPipes = `
pipelines:
  default:
    - parallel:
        - step:
            services:
              - docker
            script:
              - echo "ParallelStep0"
              - pipe: my-pipe
`;

  const pipeWithNoDockerService = `
pipelines:
  default:
    - step:
        script:
          - pipe: my-pipe
`;

  const validPullRequestSection = `
pipelines:
  pull-requests:
    feature/*:
        - step:
            script:
              - "my script"
`;

  const invalidPullRequestSection = `
pipelines:
  pull-requests:
    - step:
        script:
          - "my script"
`;
  const validAfterScriptSection = `
pipelines:
  default:
    - step:
        script:
          - "my script"
        after-script:
          - "my after script"
          - pipe: my pipe
`;

  const validServiceWithVariables = `
pipelines:
  default:
    - step:
        services:
          - redis
        script:
          - "my script"
definitions:
  services:
    redis:
      image: redis:latest
      variables:
        key1: val1
`;

  const validServiceWithEnvironment = `
pipelines:
  default:
    - step:
        services:
          - redis
        script:
          - "my script"
definitions:
  services:
    redis:
      image: redis:latest
      environment:
         key1: val1
`;

  const invalidServiceWithUnknownProperty = `
pipelines:
  default:
    - step:
        services:
          - redis
        script:
          - "my script"
definitions:
  services:
    redis:
      image: redis:latest
      foo:
        key1: val1
`;

  const validPipelineWithVariables = `
pipelines:
  custom:
    foo:
      - variables:
          - name: VAR1
          - name: VAR2
      - step:
          script:
             - echo $VAR1
             - echo $VAR2
`;

  const validPipelineWithDefaultVariableValues = `
pipelines:
  custom:
    foo:
      - variables:
          - name: VAR1
            default: val1
          - name: VAR2
            default: val2
      - step:
          script:
             - echo $VAR1
             - echo $VAR2
`;

  const invalidPipelineWithEmptyVariables = `
pipelines:
  custom:
    foo:
      - variables:
      - step:
          script:
             - echo $VAR1
             - echo $VAR2
`;

  const invalidPipelineWithVariablesAfterStep = `
pipelines:
  custom:
    foo:
      - step:
          script:
             - echo $VAR1
             - echo $VAR2
      - variables:
          - name: VAR1
          - name: VAR2
`;

  const invalidPipelineWithVariablesAfterParallelGroup = `
pipelines:
  custom:
    foo:
      - parallel:
          - step:
              script:
                 - echo $VAR1
                 - echo $VAR2
      - variables:
          - name: VAR1
          - name: VAR2
`;

  const invalidPipelineWithMultipleVariablesLists = `
pipelines:
  custom:
    foo:
      - variables:
          - name: VAR1
      - variables:
          - name: VAR2
      - step:
          script:
             - echo $VAR1
             - echo $VAR2
`;

  const invalidPipelineWithVariablesInDefault = `
pipelines:
  default:
    - variables:
        - name: VAR1
    - step:
        script:
           - echo $VAR1
           - echo $VAR2
`;

  const invalidPipelineWithVariablesInBranch = `
pipelines:
  branches:
    develop:
      - variables:
         - name: VAR1
      - step:
          script:
             - echo $VAR1
             - echo $VAR2
`;

  const invalidPipelineWithVariablesInTags = `
pipelines:
  tags:
    develop:
      - variables:
        - name: VAR1
      - step:
          script:
            - echo $VAR1
            - echo $VAR2
`;

  const invalidPipelineWithVariablesInPullRequests = `
pipelines:
  pull-requests:
    '**':
       - variables:
         - name: VAR1
       - step:
           script:
             - echo $VAR1
             - echo $VAR2
`;

  const invalidPipelineWithDuplicateVariables = `
pipelines:
  custom:
    foo:
      - variables:
          - name: VAR1
          - name: VAR1
          - name: VAR2
      - step:
          script:
             - echo $VAR1
`;

  const invalidPipelineWithLeadingNumericVariableName = `
pipelines:
  custom:
    foo:
      - variables:
          - name: 1VAR
      - step:
          script:
             - echo 'wrong'
`;

  const invalidPipelineWithNonAlphaNumericVariableName = `
pipelines:
  custom:
    foo:
      - variables:
          - name: VAR-1
      - step:
          script:
             - echo 'wrong'
`;

  const validPipelineWithListBasedArtifactsSection = `
pipelines:
  default:
    - step:
        script:
          - foo
        artifacts:
          - "*.jar"
          - "**/*.zip"
`;

  const validPipelineWithFullObjectBasedArtifactsSection = `
pipelines:
  default:
    - step:
        script:
          - foo
        artifacts:
          download: true
          paths:
            - "*.jar"
            - "**/*.zip"
`;

  const validPipelineWithObjectBasedArtifactsSectionNoPaths = `
pipelines:
  default:
    - step:
        script:
          - foo
        artifacts:
          download: true
`;

  const validPipelineWithObjectBasedArtifactsSectionNoDownload = `
pipelines:
  default:
    - step:
        script:
          - foo
        artifacts:
          paths:
            - "*.jar"
            - "**/*.zip"
`;

  const validPipelineWithListBasedArtifactsSectionInParallelGroup = `
pipelines:
  default:
    - parallel:
      - step:
          script:
            - foo
          artifacts:
            - "*.jar"
            - "**/*.zip"
`;

  const validPipelineWithFullObjectBasedArtifactsSectionInParallelGroup = `
pipelines:
  default:
    - parallel:
      - step:
          script:
            - foo
          artifacts:
            download: true
            paths:
              - "*.jar"
              - "**/*.zip"
`;

  const validPipelineWithObjectBasedArtifactsSectionNoPathsInParallelGroup = `
pipelines:
  default:
    - parallel:
      - step:
          script:
            - foo
          artifacts:
            download: true
`;

  const validPipelineWithObjectBasedArtifactsSectionNoDownloadInParallelGroup = `
pipelines:
  default:
    - parallel:
      - step:
          script:
            - foo
          artifacts:
            paths:
              - "*.jar"
              - "**/*.zip"
`;

  const invalidPipelineWithLargeNumberOfRunnerLabels = `
pipelines:
  custom:
    foo:
      - step:
          runs-on:
            - self.hosted
            - linux
            - test
            - test2
            - test3
            - test4
            - test5
            - test6
            - test7
            - test8
            - test9
            - test10
            - test11
            - test12
          script:
            - echo $VAR1
`;

  const validPipelineWithLargeNumberOfRunnerLabels = `
pipelines:
  custom:
    foo:
      - step:
          runs-on:
            - self.hosted
            - linux
            - test
            - test2
            - test3
            - test4
            - test5
            - test6
            - test7
            - test8
            - test9
            - test10
          script:
            - echo $VAR1
`;

  const invalidPipelineWithNonAlphaNumericRunnerLabel = `
pipelines:
  custom:
    foo:
      - step:
          runs-on:
            - testLAbel!
          script:
            - echo $VAR1
`;

  const invalidPipelineWithNonAlphaNumericRunnerLabelInline = `
pipelines:
  custom:
    foo:
      - step:
          runs-on: testLAbel!
          script:
            - echo $VAR1
`;

  const invalidPipelineWithRunnerLabelLengthExceedingLimit = `
pipelines:
  custom:
    foo:
      - step:
          runs-on: averylongrunnerlabelyouwouldnotbelievehowlongitiswow
          script:
            - echo $VAR1
`;

  const invalidPipelineWithIllegalNamespaceRunnerLabel = `
pipelines:
  custom:
    foo:
      - step:
          runs-on:
            - bitbucket.something
            - atlassian.blah
          script:
            - echo $VAR1
`;

  const invalidPipelineWithIllegalNamespaceRunnerLabelInline = `
pipelines:
  custom:
    foo:
      - step:
          runs-on: bitbucket.blah
          script:
            - echo $VAR1
`;

  const validPipelineWithRunnerLabelInline = `
pipelines:
  custom:
    foo:
      - step:
          runs-on: self.hosted
          script:
            - echo $VAR1
`;

  const validPipelineWithRunnerLabelList = `
pipelines:
  custom:
    foo:
      - step:
          runs-on:
            - label
            - other.label
          script:
            - echo $VAR1
`;

  const invalidPipelineWithMultipleRunnerSystemLabels = `
pipelines:
  custom:
    foo:
      - step:
          runs-on:
            - linux
            - windows
          script:
            - echo $VAR1
`;

  const validPipelineWithRunnerLabelListWithSingleItem = `
pipelines:
  custom:
    foo:
      - step:
          runs-on:
            - label
          script:
            - echo $VAR1
`;

  const validPipelineWithStepWithSimpleOidcConfig = `
pipelines:
  custom:
    foo:
      - step:
          oidc: true
          script:
            - echo $VAR1
`;

  const validPipelineWithParallelStepWithSimpleOidcConfig = `
pipelines:
  custom:
    foo:
      - parallel:
        - step:
            oidc: true
            script:
              - echo $VAR1
`;

  const validPipelineWithStepWithAdvancedOidcConfig = `
pipelines:
  custom:
    foo:
      - step:
          oidc:
            enable: true
          script:
            - echo $VAR1
`;

  const validPipelineWithParallelStepWithAdvancedOidcConfig = `
pipelines:
  custom:
    foo:
      - parallel:
        - step:
            oidc:
              enable: true
            script:
              - echo $VAR1
`;

  const invalidPipelineWithStepWithInvalidSimpleOidcConfig = `
pipelines:
  custom:
    foo:
      - step:
          oidc: "wrong string value"
          script:
            - echo $VAR1
`;

  const invalidPipelineWithParallelStepWithInvalidSimpleOidcConfig = `
pipelines:
  custom:
    foo:
      - parallel:
        - step:
            oidc: "wrong string value"
            script:
              - echo $VAR1
`;

  const invalidPipelineWithStepWithInvalidAdvancedOidcConfig = `
pipelines:
  custom:
    foo:
      - step:
          oidc:
            wrongProperty: true
          script:
            - echo $VAR1
`;

  const invalidPipelineWithParallelStepWithInvalidAdvancedOidcConfig = `
pipelines:
  custom:
    foo:
      - parallel:
        - step:
            oidc:
              wrongProperty: true
            script:
              - echo $VAR1
`;

  const invalidPipelineWithObjectBasedArtifactsSectionWithIncorrectDownloadType = `
pipelines:
  default:
    - parallel:
      - step:
          script:
            - foo
          artifacts:
            download: "true"
`;

  const invalidPipelineWithStringBasedArtifacts = `
pipelines:
  default:
    - parallel:
      - step:
          script:
            - foo
          artifacts: "incorrect"
`;

  it('should be invalid pipeline with multiple runner system labels', () => {
    const validationResults = validateYaml(
      invalidPipelineWithMultipleRunnerSystemLabels,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `There can only be 1 system label.`,
    );
  });

  it('should be invalid pipeline with large number of runner labels', () => {
    const validationResults = validateYaml(
      invalidPipelineWithLargeNumberOfRunnerLabels,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `You have reached the 10 custom label limit.`,
    );
  });

  it('should be valid pipeline with large number of runner labels', () => {
    const validationResults = validateYaml(
      validPipelineWithLargeNumberOfRunnerLabels,
    );
    expect(validationResults).toHaveLength(0);
  });

  it('should be invalid pipeline with non lowercase alphanumeric runner labels', () => {
    const validationResults = validateYaml(
      invalidPipelineWithNonAlphaNumericRunnerLabel,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Runner labels can only contain lowercase alphanumeric characters and dots that are not at the start or end of the label',
    );
  });

  it('should be invalid pipeline with non lowercase alphanumeric runner labels inline', () => {
    const validationResults = validateYaml(
      invalidPipelineWithNonAlphaNumericRunnerLabelInline,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Runner labels can only contain lowercase alphanumeric characters and dots that are not at the start or end of the label',
    );
  });

  it('should be invalid pipeline with length of runner label exceeding limit', () => {
    const validationResults = validateYaml(
      invalidPipelineWithRunnerLabelLengthExceedingLimit,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'You have reached the 50 character limit.',
    );
  });

  it('should be invalid pipeline with illegally namespaced runner labels', () => {
    const validationResults = validateYaml(
      invalidPipelineWithIllegalNamespaceRunnerLabel,
    );
    expect(validationResults).toHaveLength(2);
    expect(validationResults[0].message).toEqual(
      'Namespaces bitbucket.* and atlassian.* are reserved.',
    );
    expect(validationResults[1].message).toEqual(
      'Namespaces bitbucket.* and atlassian.* are reserved.',
    );
  });

  it('should be invalid pipeline with illegally namespaced runner labels inline', () => {
    const validationResults = validateYaml(
      invalidPipelineWithIllegalNamespaceRunnerLabelInline,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Namespaces bitbucket.* and atlassian.* are reserved.',
    );
  });

  it('should be valid with inline runner label', () => {
    expect(validateYaml(validPipelineWithRunnerLabelInline)).toEqual([]);
  });

  it('should be valid with list of runner labels', () => {
    expect(validateYaml(validPipelineWithRunnerLabelList)).toEqual([]);
  });

  it('should be valid with runner labels list with single item', () => {
    expect(
      validateYaml(validPipelineWithRunnerLabelListWithSingleItem),
    ).toEqual([]);
  });

  it('should be invalid runner size', () => {
    const validationResults = validateYaml(invalidRunnerSize);
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Use either 1x, 2x, 4x or 8x as the string',
    );
  });

  it('should be valid', () => {
    expect(validateYaml(valid)).toEqual([]);
  });

  it('should be error on space', () => {
    expect(validateYaml(invalidSpacing)).toHaveLength(3);
  });

  it('should be error on empty section', () => {
    expect(validateYaml(invalidEmptySection)).toHaveLength(1);
  });

  it('should be valid global max-time', () => {
    expect(validateYaml(validGlobalMaxTime)).toEqual([]);
  });

  it('should be invalid global max-time', () => {
    expect(validateYaml(invalidGlobalMaxTime)).toHaveLength(1);
  });

  it('should be valid step max-time', () => {
    expect(validateYaml(validStepMaxTime)).toEqual([]);
  });

  it('should be invalid step max-time', () => {
    expect(validateYaml(invalidStepMaxTime)).toHaveLength(1);
  });

  it('should be valid 121 minutes max-time with feature flag enabled', () => {
    const validationResults = validateYaml(invalidStepMaxTime, {
      maxStepDuration: 240,
    });
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `Values between 120 and 240 are only available to customers on Standard or Premium plans. Please consider upgrading.`,
    );
  });

  it('should be valid two hour step max-time with feature flag enabled', () => {
    const validationResults = validateYaml(longrunningStepMaxTime, {
      maxStepDuration: 240,
    });
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `Values between 120 and 240 are only available to customers on Standard or Premium plans. Please consider upgrading.`,
    );
  });

  it('should be invalid max-time if longer than feature flag enabled', () => {
    expect(
      validateYaml(longrunningStepMaxTime, { maxStepDuration: 239 }),
    ).toHaveLength(1);
  });

  it('should be valid global size', () => {
    expect(validateYaml(validGlobalSize)).toEqual([]);
  });

  it('should be invalid global size type', () => {
    const validationResults = validateYaml(invalidGlobalSizeType);
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Use either 1x or 2x as the string',
    );
  });

  it('should be invalid global size value', () => {
    expect(validateYaml(invalidGlobalSizeValue)).toHaveLength(1);
  });

  it('should be valid step size', () => {
    expect(validateYaml(validStepSize)).toEqual([]);
  });

  it('should be invalid step size type', () => {
    expect(validateYaml(invalidStepSizeType)).toHaveLength(1);
  });

  it('should be invalid step size value', () => {
    expect(validateYaml(invalidStepSizeValue)).toHaveLength(1);
  });

  it('should be valid step clone enabled', () => {
    expect(validateYaml(validStepCloneEnabled)).toEqual([]);
  });

  it('should be invalid step clone enabled type', () => {
    expect(validateYaml(invalidStepCloneEnabled)).toHaveLength(1);
  });

  it('should be valid conditional step', () => {
    expect(validateYaml(validConditionalChangesetStep)).toEqual([]);
  });

  it('should be invalid conditional step', () => {
    expect(validateYaml(invalidConditionalChangesetStep)).toHaveLength(1);
  });

  it('should be valid aws', () => {
    expect(validateYaml(validAws)).toEqual([]);
  });

  it('should be error on invalid AWS YAML', () => {
    expect(validateYaml(missingAwsProperty)).toHaveLength(1);
  });

  it('should be valid aws oidc', () => {
    expect(validateYaml(validAwsOidc)).toEqual([]);
  });

  it('should be valid multiple steps', () => {
    expect(validateYaml(validMultipleSteps)).toEqual([]);
  });

  it('should be invalid when first first is manual', () => {
    expect(validateYaml(invalidFirstManualStep)).toHaveLength(1);
  });

  it('should be valid manual step', () => {
    expect(validateYaml(validManualStep)).toEqual([]);
  });

  it('should be valid environment step', () => {
    expect(validateYaml(validEnvironmentStep)).toEqual([]);
  });

  it('should be invalid environment step', () => {
    expect(validateYaml(invalidEnvironmentStep)).toHaveLength(1);
  });

  it('should be valid environment step with allowed environments', () => {
    expect(
      validateYaml(validCustomEnvironmentStep, {
        environments: [['random', '123']],
      }),
    ).toHaveLength(0);
  });

  it('should be valid parallel step with allowed environments', () => {
    expect(
      validateYaml(validParallelEnvironmentStep, {
        environments: [['prod-east', 'prod-west']],
      }),
    ).toHaveLength(0);
  });

  it('should be valid environments pipeline', () => {
    expect(validateYaml(validEnvironmentsPipeline)).toEqual([]);
  });

  it('should be valid environments pipelines', () => {
    expect(validateYaml(validEnvironmentsPipelines)).toEqual([]);
  });

  it('should be invalid cache name', () => {
    expect(validateYaml(invalidCacheName)).toHaveLength(1);
  });

  it('should be valid cache name', () => {
    expect(validateYaml(validCacheName)).toEqual([]);
    expect(validateYaml(validDefaultCacheName)).toEqual([]);
  });

  it('should be invalid cache name', () => {
    expect(validateYaml(reservedCacheName)).toHaveLength(1);
  });

  it('should be valid docker cache', () => {
    expect(validateYaml(validDockerCacheWithGlobalOption)).toEqual([]);
    expect(validateYaml(validDockerCacheWithDockerService)).toEqual([]);
  });

  it('should be invalid docker cache', () => {
    expect(validateYaml(invalidDockerCache)).toHaveLength(1);
  });

  it('should be invalid reference of undefined cache definition', () => {
    expect(validateYaml(referenceUndefinedCacheDefinition)).toHaveLength(1);
  });

  it('should be invalid service memory', () => {
    expect(validateYaml(invalidServiceDefinition)).toHaveLength(2);
    expect(validateYaml(invalidServiceDefinitionNoImage)).toHaveLength(1);
    expect(
      validateYaml(invalidServiceDefinitionEmptyImageDefinition),
    ).toHaveLength(1);
  });

  it('should be invalid exceed services memory limits', () => {
    expect(validateYaml(exceedServicesMemoryLimitDefault1x)).toHaveLength(1);
    expect(validateYaml(exceedServicesMemoryLimitCustom1x)).toHaveLength(1);
    expect(validateYaml(exceedServicesMemoryLimitSize1x)).toHaveLength(1);
    expect(validateYaml(exceedServicesMemoryLimitCustom2x)).toHaveLength(1);
    expect(
      validateYaml(exceedServicesMemoryLimitOverwriteSystemService),
    ).toHaveLength(1);
  });

  it('should be valid services memory limits', () => {
    expect(validateYaml(validServicesMemoryLimits)).toEqual([]);
    expect(
      validateYaml(validServicesMemoryLimitOverwriteSystemService),
    ).toEqual([]);
  });

  it('should be valid services with docker type', () => {
    expect(validateYaml(validServicesDockerType)).toEqual([]);
  });

  it('should be invalid services with wrong type', () => {
    const validationResults = validateYaml(invalidServicesDockerType);
    expect(validationResults[0].message).toEqual('Use docker');
  });

  it('should be valid parallel steps', () => {
    expect(validateYaml(validParallelSteps)).toEqual([]);
  });

  it('should be a valid parallel steps with a manual trigger.', () => {
    expect(validateYaml(validParallelStepsWithManualTrigger)).toEqual([]);
  });

  it('should be invalid max number of steps', () => {
    expect(validateYaml(invalidTooManySteps)).toHaveLength(1);
  });

  it('should be valid root entity clone', () => {
    expect(validateYaml(validRootEntityClone)).toEqual([]);
  });

  it('should be invalid root entity clone', () => {
    expect(validateYaml(invalidRootEntityClone)).toHaveLength(1);
  });

  it('should be valid cloud step clone', () => {
    expect(validateYaml(validCloudStepClone)).toEqual([]);
  });

  it('should be invalid cloud step clone', () => {
    const validationResults = validateYaml(invalidCloudStepClone);
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `Skipping ssl certificate verification is only allowed on steps running on runners using the self.hosted label.`,
    );
  });

  it('should be valid runner step clone with inline label', () => {
    expect(validateYaml(validRunnerStepCloneWithInlineLabel)).toEqual([]);
  });

  it('should be valid runner step clone with label list', () => {
    expect(validateYaml(validRunnerStepCloneWithLabelList)).toEqual([]);
  });

  it('should be invalid runner step clone', () => {
    const validationResults = validateYaml(
      invalidRunnerStepCloneWithInlineLabel,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `Skipping ssl certificate verification is only allowed on steps running on runners using the self.hosted label.`,
    );
  });

  it('should be invalid runner step clone', () => {
    const validationResults = validateYaml(invalidRunnerStepCloneWithLabelList);
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `Skipping ssl certificate verification is only allowed on steps running on runners using the self.hosted label.`,
    );
  });

  it('should be valid anchor', () => {
    expect(validateYaml(validAnchor)).toEqual([]);
  });

  it('should be valid minimal pipe', () => {
    expect(validateYaml(validMinimalPipe)).toEqual([]);
  });

  it('should be valid pipe with variables', () => {
    expect(validateYaml(validPipeWithVariables)).toEqual([]);
  });

  it('should be valid pipe with variables array', () => {
    expect(validateYaml(validPipeWithVariablesArray)).toEqual([]);
  });

  it('should be valid pipe with variables and variables array', () => {
    expect(validateYaml(validPipeWithVariablesAndVariablesArray)).toEqual([]);
  });

  it('should be valid pipe with environment', () => {
    expect(validateYaml(validPipeWithEnvironment)).toEqual([]);
  });

  it('shoud be valid script with pipes and commands', () => {
    expect(validateYaml(validCombinedScriptCommandsAndPipes)).toEqual([]);
  });

  it('should be valid parallel steps with pipes', () => {
    expect(validateYaml(validParallelStepWithPipes)).toEqual([]);
  });

  it('should be valid pipe section with no docker service configured', () => {
    expect(validateYaml(pipeWithNoDockerService)).toEqual([]);
  });

  it('should be valid pull-request section', () => {
    expect(validateYaml(validPullRequestSection)).toEqual([]);
  });

  it('should be invalid pull-request section', () => {
    expect(validateYaml(invalidPullRequestSection)).toHaveLength(1);
  });

  it('should be valid after-script section', () => {
    expect(validateYaml(validAfterScriptSection)).toEqual([]);
  });

  it('should be valid service with variables', () => {
    expect(validateYaml(validServiceWithVariables)).toEqual([]);
  });

  it('should be valid service with environment', () => {
    expect(validateYaml(validServiceWithEnvironment)).toEqual([]);
  });

  it('should be invalid service with unknown property', () => {
    expect(validateYaml(invalidServiceWithUnknownProperty)).toHaveLength(1);
  });

  it('should be valid pipeline with variables', () => {
    expect(validateYaml(validPipelineWithVariables)).toEqual([]);
  });

  it('should be valid pipeline with default variable values', () => {
    expect(validateYaml(validPipelineWithDefaultVariableValues)).toEqual([]);
  });

  it('should be invalid pipeline with empty variables list', () => {
    const validationResults = validateYaml(invalidPipelineWithEmptyVariables);
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(`'variables' must be a list.`);
  });

  it('should be invalid pipeline with variables after steps', () => {
    const validationResults = validateYaml(
      invalidPipelineWithVariablesAfterStep,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `'variables' must appear before steps or parallel steps.`,
    );
  });

  it('should be invalid pipeline with variables after parallel group', () => {
    const validationResults = validateYaml(
      invalidPipelineWithVariablesAfterParallelGroup,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `'variables' must appear before steps or parallel steps.`,
    );
  });

  it('should be invalid pipeline with after steps', () => {
    const validationResults = validateYaml(
      invalidPipelineWithVariablesAfterStep,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `'variables' must appear before steps or parallel steps.`,
    );
  });

  it('should be invalid pipeline with multiple variables lists', () => {
    const validationResults = validateYaml(
      invalidPipelineWithMultipleVariablesLists,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `'variables' can only be defined once per pipeline.`,
    );
  });

  it('should be invalid pipeline with variables in default pipeline', () => {
    const validationResults = validateYaml(
      invalidPipelineWithVariablesInDefault,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `'variables' can only be defined in a custom pipeline.`,
    );
  });

  it('should be invalid pipeline with variables in tags', () => {
    const validationResults = validateYaml(invalidPipelineWithVariablesInTags);
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `'variables' can only be defined in a custom pipeline.`,
    );
  });

  it('should be invalid pipeline with variables in branch', () => {
    const validationResults = validateYaml(
      invalidPipelineWithVariablesInBranch,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `'variables' can only be defined in a custom pipeline.`,
    );
  });

  it('should be invalid pipeline with variables in pull requests', () => {
    const validationResults = validateYaml(
      invalidPipelineWithVariablesInPullRequests,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      `'variables' can only be defined in a custom pipeline.`,
    );
  });

  it('should be invalid pipeline with duplicate pipeline variables', () => {
    const validationResults = validateYaml(
      invalidPipelineWithDuplicateVariables,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'The same variable name is used more than once.',
    );
  });

  it('should be invalid pipeline with variable name with leading numeric character', () => {
    const validationResults = validateYaml(
      invalidPipelineWithLeadingNumericVariableName,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Variable name 1VAR is invalid. ' +
        'It should contain only alphanumeric characters and underscores and it should not begin with a number.',
    );
  });

  it('should be invalid pipeline with non alphanumberic variable name', () => {
    const validationResults = validateYaml(
      invalidPipelineWithNonAlphaNumericVariableName,
    );
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Variable name VAR-1 is invalid. ' +
        'It should contain only alphanumeric characters and underscores and it should not begin with a number.',
    );
  });

  it('should be valid pipeline with list-based artifacts section', () => {
    expect(validateYaml(validPipelineWithListBasedArtifactsSection)).toEqual(
      [],
    );
  });

  it('should be valid pipeline with object-based artifacts section', () => {
    expect(
      validateYaml(validPipelineWithFullObjectBasedArtifactsSection),
    ).toEqual([]);
  });

  it('should be valid pipeline with object-based artifacts section and no paths', () => {
    expect(
      validateYaml(validPipelineWithObjectBasedArtifactsSectionNoPaths),
    ).toEqual([]);
  });

  it('should be valid pipeline with object-based artifacts section and no download', () => {
    expect(
      validateYaml(validPipelineWithObjectBasedArtifactsSectionNoDownload),
    ).toEqual([]);
  });

  it('should be valid pipeline with list-based artifacts section in parallel group', () => {
    expect(
      validateYaml(validPipelineWithListBasedArtifactsSectionInParallelGroup),
    ).toEqual([]);
  });

  it('should be valid pipeline with object-based artifacts section in parallel group', () => {
    expect(
      validateYaml(
        validPipelineWithFullObjectBasedArtifactsSectionInParallelGroup,
      ),
    ).toEqual([]);
  });

  it('should be valid pipeline with object-based artifacts section and no paths in parallel group', () => {
    expect(
      validateYaml(
        validPipelineWithObjectBasedArtifactsSectionNoPathsInParallelGroup,
      ),
    ).toEqual([]);
  });

  it('should be valid pipeline with object-based artifacts section and no download in parallel group', () => {
    expect(
      validateYaml(
        validPipelineWithObjectBasedArtifactsSectionNoDownloadInParallelGroup,
      ),
    ).toEqual([]);
  });

  it('should be valid pipeline with step that enables OIDC token generation', () => {
    const ymlFiles = [
      validPipelineWithStepWithSimpleOidcConfig,
      validPipelineWithStepWithAdvancedOidcConfig,
      validPipelineWithParallelStepWithSimpleOidcConfig,
      validPipelineWithParallelStepWithAdvancedOidcConfig,
    ];
    ymlFiles.forEach((ymlFile) => {
      expect(validateYaml(ymlFile)).toEqual([]);
    });
  });

  it('should be invalid pipeline with step with invalid OIDC config', () => {
    const ymlFiles = [
      invalidPipelineWithStepWithInvalidSimpleOidcConfig,
      invalidPipelineWithStepWithInvalidAdvancedOidcConfig,
      invalidPipelineWithParallelStepWithInvalidSimpleOidcConfig,
      invalidPipelineWithParallelStepWithInvalidAdvancedOidcConfig,
    ];
    ymlFiles.forEach((ymlFile) => {
      const validationResults = validateYaml(ymlFile);
      expect(validationResults).toHaveLength(1);
      expect(validationResults[0].message).toEqual(
        'Use either a boolean or a section',
      );
    });
  });

  it('should be invalid pipeline with artifact object with invalid download config', () => {
    const ymlFile = invalidPipelineWithObjectBasedArtifactsSectionWithIncorrectDownloadType;
    const validationResults = validateYaml(ymlFile);
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Expected a boolean but found a scalar.',
    );
  });

  it('should be invalid pipeline with artifact list as a string', () => {
    const ymlFile = invalidPipelineWithStringBasedArtifacts;
    const validationResults = validateYaml(ymlFile);
    expect(validationResults).toHaveLength(1);
    expect(validationResults[0].message).toEqual(
      'Use either a list or a section',
    );
  });
});
