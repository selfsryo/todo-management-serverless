import { handlerPath } from '@libs/handlerResolver';

export const todoGet = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'todo/{username}/{id}',
            },
        },
    ],
    environment: {
        TODO_TABLE_NAME:
            '${self:custom.otherfile.environment.${self:provider.stage}.TODO_TABLE_NAME}',
    },
};
