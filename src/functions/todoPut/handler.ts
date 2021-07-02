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
        return formatJSONResponse(403, {
            message: 'username not found',
        });
    }

    const id = event.pathParameters.id;
    if (!id) {
        return formatJSONResponse(403, {
            message: 'id not found',
        });
    }

    if (
        !event.body ||
        (!event.body.title && !event.body.status && !event.body.details)
    ) {
        return formatJSONResponse(400, {
            message: 'parameter not found',
        });
    }

    const todoTable = new TodoTable(TODO_TABLE_NAME);

    const options: TodoPutOptions = {};

    if (event.body.title) {
        options.title = event.body.title;
    }
    if (event.body.status) {
        options.status = event.body.status;
    }
    if (event.body.details) {
        options.details = event.body.details;
    }

    try {
        const result = await todoTable.put(username, id, options);
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
