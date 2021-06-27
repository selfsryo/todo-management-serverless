import * as AWS from 'aws-sdk';

if (process.env.IS_OFFLINE) {
    AWS.config.update({
        // @ts-ignore
        endpoint: process.env.DYNAMODB_ENDPOINT
            ? process.env.DYNAMODB_ENDPOINT
            : 'http://localhost:8000',
    });
}
export default AWS;
