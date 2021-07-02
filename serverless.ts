import { TodoDynamoDbTable } from 'resources';
import {
    todoGet,
    todoGetList,
    todoPost,
    todoPut,
    todoDelete,
} from './src/functions';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
    service: 'todo-serverless',

    frameworkVersion: '2',

    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
        },
        defaultStage: 'local',
        'serverless-layers': {
            layersDeploymentBucket:
                '${self:custom.otherfile.environment.${self:provider.stage}.S3_BUCKET_NAME}',
            dependenciesPath: './package.json',
        },
        dynamodb: {
            stages: ['local'],
            start: {
                port: 8000,
                inMemory: true,
                migrate: true,
                seed: true,
            },
            seed: {
                development: {
                    sources: {
                        table: '${self:custom.otherfile.environment.${self:provider.stage}.TODO_TABLE_NAME}',
                        sources: ['./migrations/todo.json'],
                    },
                },
            },
        },
        otherfile: {
            environment: {
                local: '${file(.env.local.yml)}',
                dev: '${file(.env.dev.yml)}',
                prod: '${file(.env.prod.yml)}',
            },
        },
    },

    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        stage: '${opt:stage, self:custom.defaultStage}',
        region: 'ap-northeast-1',
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
        lambdaHashingVersion: '20201221',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: [
                            'dynamodb:Query',
                            'dynamodb:Scan',
                            'dynamodb:GetItem',
                            'dynamodb:PutItem',
                            'dynamodb:UpdateItem',
                            'dynamodb:DeleteItem',
                            'dynamodb:DescribeStream',
                            'dynamodb:GetRecords',
                            'dynamodb:GetShardIterator',
                            'dynamodb:ListStreams',
                        ],
                        Resource: ['*'],
                    },
                ],
            },
        },
    },

    package: {
        exclude: [
            '.git/**',
            'src/**',
            'docs/*]',
            'resources/**',
            '.*',
            'tsconfig.*',
            'package-lock.json',
            'yarn.lock',
            'README.md',
            'serverless.ts',
        ],
    },

    plugins: [
        'serverless-layers',
        'serverless-webpack',
        'serverless-dynamodb-local',
        'serverless-offline',
    ],

    functions: {
        todoGet,
        todoGetList,
        todoPost,
        todoPut,
        todoDelete,
    },

    resources: {
        Resources: {
            TodoDynamoDbTable,
        },
    },
};

module.exports = serverlessConfiguration;
