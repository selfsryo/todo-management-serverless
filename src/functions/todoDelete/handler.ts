import 'source-map-support/register';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import TodoTable from '@tables/todoTable';

const TODO_TABLE_NAME = process.env.TODO_TABLE_NAME;

const handler: APIGatewayProxyHandlerV2 = async (event) => {
    const username = event.pathParameters.username;
    if (!username) {
        throw new Error('username not found');
    }

    const id = event.pathParameters.id;
    if (!id) {
        throw new Error('id not found');
    }

    const todoTable = new TodoTable(TODO_TABLE_NAME);

    try {
        const result = await todoTable.delete(username, id);
        return formatJSONResponse(200, {
            result,
        });
    } catch (err) {
        return formatJSONResponse(404, {
            message: err.message,
        });
    }
};

export const main = middyfy(handler);
