

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';



const questionRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        authorId: string;
        authorUsername:string
    }
}>();



//bulk
questionRoutes.get('/bulk', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
      
        const bulk = await prisma.questions.findMany({ 
           orderBy :{
            createdAt:'desc'
           }
        });


        return c.json({ bulk}, 200);

    } catch (error) {
        console.error('Error fetching questions:', error);
        return c.json({ message: 'Internal Server Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});


questionRoutes.use('/*', async (c, next) => {
    const authHeader = c.req.header('authorization') || '';

    if (!authHeader) {
        c.status(401);
        return c.json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);

        if (user && typeof user.id === 'string') {
            c.set('authorId', user.id);
            await next(); 
        } else {
            c.status(401);
            return c.json({ message: 'Unauthorized: Invalid token' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        c.status(500);
        return c.json({ message: 'Internal Server Error' });
    }
});







//ask a question
questionRoutes.post('/askQuestion', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const authorId = c.get('authorId');
        if (!authorId) {
            return c.json({ message: "Unauthorized: Author not found" }, 401);
        }

        const res = await prisma.questions.create({
            data: {
                question: body.question,
                createdAt:body.createdAt,
                authorId :authorId
            }
        });

        return c.json(res, 201);

    } catch (error) {
        console.error(error);
        return c.json({ message: 'Internal Server Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});






export { questionRoutes };
