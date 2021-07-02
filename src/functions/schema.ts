export const postSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        details: { type: 'string' },
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
