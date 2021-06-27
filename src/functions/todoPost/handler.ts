import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { TodoPostOptions } from '@libs/table/models';
import TodoTable from '@libs/table/todoTable';
import { postSchema } from '../schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

const { TODO_TABLE_NAME } = process.env;

const handler: ValidatedEventAPIGatewayProxyEvent<typeof postSchema> = async (
    event
) => {
    const username = event.pathParameters.username;
    if (!username) {
        throw new Error('username not found');
    }

    const todoTable = new TodoTable(TODO_TABLE_NAME);

    const options: TodoPostOptions = {};
    options.details = event.body.details ? event.body.details : '';

    try {
        const res = await todoTable.post(
            username,
            event.body.title,
            event.body.status,
            options
        );
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
