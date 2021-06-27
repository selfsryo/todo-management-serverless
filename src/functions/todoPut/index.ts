import { handlerPath } from '@libs/handlerResolver';
import { putSchema } from '../schema';

export const todoPut = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'put',
                path: 'todo/{username}/{id}',
                request: {
                    schema: {
                        'application/json': putSchema,
                    },
                },
            },
        },
    ],
    environment: {
        TODO_TABLE_NAME:
            '${self:custom.otherfile.environment.${self:provider.stage}.TODO_TABLE_NAME}',
    },
};
