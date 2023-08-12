import {PrismaClient} from "@prisma/client";
// import {logger} from "./logging.js";
export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

prismaClient.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
})

// prismaClient.$on('error', (e) => {
//     logger.error(e);
// });

// prismaClient.$on('warn', (e) => {
//     logger.warn(e);
// });

// prismaClient.$on('info', (e) => {
//     logger.info(e);
// });

// prismaClient.$on('query', (e) => {
//     logger.info(e);
// });
