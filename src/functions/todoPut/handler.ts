import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { putSchema } from '@functions/schema';
import { TodoPutOptions } from '@tables/options';
import TodoTable from '@tables/todoTable';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

const { TODO_TABLE_NAME } = process.env;

const handler: ValidatedEventAPIGatewayProxyEvent<typeof putSchema> = async (
    event
) => {
    const username = event.pathParameters.username;
    if (!username) {
        throw new Error('username not found');
    }

    const id = event.pathParameters.id;
    if (!id) {
        throw new Error('id not found');
    }

    const todoTable = new TodoTable(TODO_TABLE_NAME);

    const options: TodoPutOptions = {};

    options.title = event.body.title ? event.body.title : '';
    options.status = event.body.status ? event.body.status : '';
    options.details = event.body.details ? event.body.details : '';

    try {
        const res = await todoTable.put(username, id, options);
        return formatJSONResponse({
            res,
        });
    } catch (err) {
        return formatJSONResponse({
            message: err.message,
        });
    }
};

export const main = middyfy(handler);
