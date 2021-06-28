# todo-management-serverless

This is sample application of serverless framework.

## Setup

#### Serveless setup
- Install aws-cli
```sh
$ brew install awscli
```
- Setup your credential
```sh
$ aws configure
```
- Install serverless framework
```sh
$ yarn global add serverless

# After install, check version
$ sls --version
```

#### Install npm packages
- Install package
```sh
$ cd todo-management-serverless
$ yarn
```

#### Local setup
- Install JDK
```sh
$ brew install adoptopenjdk8 --cask
```
- Copy env yml 
```sh
$ cp .env.example.yml .env.local.yml
```
- Install dynamodb local
```sh
$ sls dynamodb install
```
- Start dynamodb
```sh
$ sls dynamodb start --stage local
```
- Start serverless in a new tab
```sh
$ yarn run offline
```

<br>

## Deploy

#### Setup S3 bucket
- Create S3 bucket on your aws console
- Write your bucket name in serverless.ts
```typescript
const serverlessConfiguration: AWS = {
    service: 'todo-serverless',
    frameworkVersion: '2',
    custom: {
        ...
        
        'serverless-layers': {
            layersDeploymentBucket: 'your S3 bucket name',
```

#### Develop stage
- Copy and update env yml 
```sh
$ cp .env.example.yml .env.dev.yml
$ vi .env.dev.yml
# Update table name (e.g.: todo-dev)
```
- Deploy stage develop
```sh
yarn run deploy
```

#### Production stage
- Follow above steps and create env yml (Replace “dev” with "prod”)
- Deploy stage production
```sh
$ sls deploy --stage prod
```

#### Remove Deploy
```sh
$ yarn run remove
```
