export const TodoDynamoDbTable = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
            {
                AttributeName: 'user',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'user',
                KeyType: 'HASH',
            },
            {
                AttributeName: 'id',
                KeyType: 'RANGE',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: '5',
            WriteCapacityUnits: '5',
        },
        TableName:
            '${self:custom.otherfile.environment.${self:provider.stage}.TODO_TABLE_NAME}',
    },
};
