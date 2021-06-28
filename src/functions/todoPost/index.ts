import { handlerPath } from '@libs/handlerResolver';
import { postSchema } from '@functions/schema';

export const todoPost = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'todo/{username}',
                request: {
                    schema: {
                        'application/json': postSchema,
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
