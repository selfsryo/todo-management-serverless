import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { postSchema } from '@functions/schema';
import { TodoPostOptions } from '@tables/options';
import TodoTable from '@tables/todoTable';
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
    const details = event.body.options.details;
    if (details) {
        options.details = details;
    }

    try {
        const result = await todoTable.post(
            username,
            event.body.title,
            event.body.status,
            options
        );
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
