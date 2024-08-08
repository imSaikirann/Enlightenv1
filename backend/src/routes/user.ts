import {  PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import z from 'zod'
import bcrypt from 'bcryptjs'
import { sign } from 'hono/jwt';
import { verify } from 'hono/jwt';
const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
    Variables: {
        authorId: string;
        authorUsername:string
    }
}>();

//validation
const signupInput = z.object({
    email: z.string().email(),
    password: z.string().max(10),
    userName: z.string()
})
const signinInput = z.object({
    email: z.string().email(),
    password: z.string()

})

//signup
userRoutes.post('/signup', async (c) => {
    const body = await c.req.json()
    const validation = await signupInput.safeParse(body)
    if (!validation.success) {
        return c.json({ error: validation.error.errors.map(e => e.message) }, 400)
    }

    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {

        const existingEmail = await prisma.user.findUnique({ where: { email: body.email } })
        const existingUsername = await prisma.user.findUnique({ where: { userName: body.userName } })
        if (existingEmail) {
            return c.json({ message: 'Email already in use.' }, 409);
        }

        if (existingUsername) {
            return c.json({ message: 'Username already in use.' }, 409);
        }

        const response = await prisma.user.create({
            data: {
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                userName: body.userName
            }

        })
        const token = await sign({ id: response.id }, c.env.JWT_SECRET);
        c.status(200)
        return c.json({ token }, 201)
    } catch (error) {

        return c.json({ message: 'Internal Server Error' }, 500)
    }
    finally {
        await prisma.$disconnect();
    }
});

//signin
userRoutes.post('/signin', async (c) => {
    const body = await c.req.json();
    const validation = signinInput.safeParse(body);
    if (!validation.success) {
        return c.json({ error: validation.error.errors.map(e => e.message) }, 400);
    }

    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const user = await prisma.user.findFirst({ where: { email: body.email } });
        if (!user) {
            return c.json({ message: 'User does not exist' }, 404);
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            return c.json({ message: 'Invalid password' }, 401);
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token }, 200);
    } catch (error) {
        return c.json({ message: 'Internal Server Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

userRoutes.use('/*', async (c, next) => {
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

userRoutes.get('/profile', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const authorId = c.get('authorId');
        console.log(authorId)
        const Usertopics = await prisma.topic.findMany({
            where:{
                authorId:authorId
            }
        });
        return c.json({  Usertopics }, 200);
        
    } catch (error) {
        console.error('Error fetching topic:', error);
        return c.json({ message: 'Internal Server Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

export { userRoutes };
