export const postSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        options: {
            type: 'object',
            properties: {
                details: { type: 'string' },
            },
        },
    },
    required: ['title', 'status'],
} as const;

export const putSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        details: { type: 'string' },
    },
} as const;
