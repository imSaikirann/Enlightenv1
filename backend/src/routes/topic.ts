import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import z from 'zod';

const topicRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        authorId: string;
        authorUsername:string
    }
}>();

// Validation schema
const topicInput = z.object({
    title: z.string(),
    information: z.string(),
});


//bulk
topicRoutes.get('/bulk', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
      
        const bulk = await prisma.topic.findMany({
            include: {
                author: true ,
            },
            orderBy :{
                createdAt:'desc'
            }
        });

        const response = bulk.map(topic => ({
            id: topic.id,
            title: topic.title,
            information: topic.information,
            authorId: topic.authorId,
            authorName: topic.author?.userName ,
            createdAt : topic.createdAt,
        }));

        return c.json({ data: response }, 200);

    } catch (error) {
        console.error('Error fetching topics:', error);
        return c.json({ message: 'Internal Server Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

//get specific topic
topicRoutes.get('/getTopic/:id', async (c) => {
    const id = c.req.param('id')
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const topic = await prisma.topic.findFirst({
            where:{
                id:id
            }
        });
        return c.json({ data: topic }, 200);
        
    } catch (error) {
        console.error('Error fetching topic:', error);
        return c.json({ message: 'Internal Server Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

topicRoutes.delete('/deleteThePara', async (c) => {
    
    const body = await c.req.json();

 
    if (!body || !body.id) {
        return c.json({ message: 'Bad Request: Missing or invalid ID' }, 400);
    }

   
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

    try {
      const topic = await prisma.topic.delete({
            where: { id: body.id }
        });

    
        return c.json({ data: topic }, 200);

    } catch (error) {
    
        console.error('Error deleting topic:', error);
        return c.json({ message: 'Internal Server Error' }, 500);

    } finally {
        
        await prisma.$disconnect();
    }
});


topicRoutes.use('/*', async (c, next) => {
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


topicRoutes.get('/user/notifications', async (c) => {

    try {
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const authorId = c.get('authorId');
       const user = await prisma.user.findUnique({
        where: {
            id: authorId, 
        },
        include: {
            answers: true, 
        },
      });

      console.log(user)
      if (!user) {
        return c.json({ message: 'User not found' }, 404);
      }
  
      return c.json(user, 200)
    } catch (error) {
      console.error("Error fetching user:", error);
      return c.json({ message: 'Internal Server Error' }, 500);
    }
  });


  topicRoutes.post('/publishTopic', async (c) => {
    try {
        const rawBody = await c.req.text();  
        const body = JSON.parse(rawBody);  
        const validation = topicInput.safeParse(body);

        if (!validation.success) {
            return c.json({ error: validation.error.errors.map(e => e.message) }, 400);
        }

        const authorId = c.get('authorId');
        if (!authorId) {
            return c.json({ message: "Unauthorized: Author not found" }, 401);
        }

        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const question = await prisma.questions.findUnique({ 
            where: { id: body.questionId },
            select: { authorId: true }
        });

        if (!question) {
            return c.json({ message: "Question not found" }, 404);
        }

        const questionAuthor = await prisma.user.findUnique({
            where: { id: question.authorId },
            select: { userName: true }
        });

        const createdTopic = await prisma.topic.create({
            data: {
                title: body.title,
                information: body.information,
                authorId: authorId,
                questionId: body.questionId
            }
        });

        const author = await prisma.user.findUnique({
            where: { id: authorId },
            select: { userName: true }
        });

        if (!author) {
            return c.json({ message: 'Author not found' }, 404);
        }
        const newAnswer = await prisma.answers.create({
            data: {
                topicId  : createdTopic.id,
                userId: question.authorId
            }
        });

      

       await prisma.user.update({
            where: {
                id: question.authorId, 
            },
            data: {
                answers: {
                    connect: {
                        id: newAnswer.id,
                    },
                },
            },
        });
        
      
    

        const response = {
           
                id: createdTopic.id,
                title: createdTopic.title,
                information: createdTopic.information,
                authorId: createdTopic.authorId,
                authorName: author.userName,
                qauthorName: questionAuthor?.userName 
          
        };

        return c.json(response, 201);

    } catch (jsonError) {
        console.error("Error creating topic:", jsonError);
        return c.json({ message: 'Invalid JSON format' }, 400);  
    } 
});





//get specific topic
topicRoutes.delete('/delete', async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        
        const topic = await prisma.topic.delete({
            where:{
                id:body.id
            }
        });
        return c.json({ data: topic }, 200);
        
    } catch (error) {
        console.error('Error deleting topic:', error);
        return c.json({ message: 'Internal Server Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

//likes



export { topicRoutes };
