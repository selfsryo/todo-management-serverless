import { v4 as uuidv4 } from 'uuid';
import AWS from '@libs/aws';
import { TodoPostOptions, TodoPutOptions } from '@tables/options';

export default class TodoTable {
    private docClient: AWS.DynamoDB.DocumentClient;
    private tableName: string;

    /**
     * Constructor
     * @param tableName table name. default will be `todos`
     */
    constructor(tableName = 'todos') {
        this.docClient = new AWS.DynamoDB.DocumentClient({
            apiVersion: '2012-08-10',
        });
        this.tableName = tableName;
    }

    async get(
        user: string,
        id: string
    ): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
        const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: { user, id },
        };

        const data = await this.docClient.get(params).promise();

        if (!(data && data.Item)) {
            throw new Error('No todo registered.');
        }

        return data.Item;
    }

    async getList(user: string): Promise<AWS.DynamoDB.DocumentClient.ItemList> {
        const params: AWS.DynamoDB.DocumentClient.QueryInput = {
            TableName: this.tableName,
            ExpressionAttributeNames: { '#u': 'user' },
            ExpressionAttributeValues: { ':user': user },
            KeyConditionExpression: '#u = :user',
        };

        const data = await this.docClient.query(params).promise();

        if (!(data && data.Items && data.Items.length > 0)) {
            throw new Error('No todo registered.');
        }

        return data.Items;
    }

    async post(
        user: string,
        title: string,
        status: string,
        options?: TodoPostOptions
    ): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
        const now = new Date();
        const id = uuidv4();

        const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: {
                id,
                user,
                title,
                status,
                createdAt: now.getTime(),
            },
            ReturnValues: 'ALL_OLD',
        };

        if (options?.details) {
            params.Item.details = options.details;
        }

        await this.docClient.put(params).promise();

        return this.get(user, id);
    }

    async put(
        user: string,
        id: string,
        options?: TodoPutOptions
    ): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
        const now = new Date();

        const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: this.tableName,
            Key: { user, id },
            ExpressionAttributeNames: {
                '#t': 'title',
                '#s': 'status',
                '#d': 'details',
                '#u': 'updatedAt',
            },
            ExpressionAttributeValues: {
                ':newTitle': undefined,
                ':newStatus': undefined,
                ':newDetails': undefined,
                ':updatedAt': now.getTime(),
            },
            UpdateExpression: 'SET #u = :updatedAt',
        };

        const removeExpression = [];

        if (options && Object.prototype.hasOwnProperty.call(options, 'title')) {
            if (options && options.title) {
                params.ExpressionAttributeValues[':newTitle'] = options.title;
                params.UpdateExpression += ', #t = :newTitle';
            } else {
                delete params.ExpressionAttributeValues[':newTitle'];
                removeExpression.push('#t');
            }
        } else {
            delete params.ExpressionAttributeNames['#t'];
            delete params.ExpressionAttributeValues[':newTitle'];
        }

        if (options && Object.prototype.hasOwnProperty.call(options, 'status')) {
            if (options && options.status) {
                params.ExpressionAttributeValues[':newStatus'] = options.status;
                params.UpdateExpression += ', #s = :newStatus';
            } else {
                delete params.ExpressionAttributeValues[':newStatus'];
                removeExpression.push('#s');
            }
        } else {
            delete params.ExpressionAttributeNames['#s'];
            delete params.ExpressionAttributeValues[':newStatus'];
        }

        if (options && Object.prototype.hasOwnProperty.call(options, 'details')) {
            if (options && options.details) {
                params.ExpressionAttributeValues[':newDetails'] = options.details;
                params.UpdateExpression += ', #d = :newDetails';
            } else {
                delete params.ExpressionAttributeValues[':newDetails'];
                removeExpression.push('#d');
            }
        } else {
            delete params.ExpressionAttributeNames['#d'];
            delete params.ExpressionAttributeValues[':newDetails'];
        }

        if (removeExpression.length > 0) {
            params.UpdateExpression += ` REMOVE ${removeExpression.join(',')}`;
        }

        await this.docClient.update(params).promise();
        return this.get(user, id);
    }

    async delete(user: string, id: string): Promise<boolean> {
        const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: { user, id },
        };

        const data = await this.docClient.get(params).promise();

        if (!(data && data.Item)) {
            throw new Error('No todo registered.');
        }

        await this.docClient.delete(params).promise();
        return true;
    }
}
