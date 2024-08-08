import { Hono } from 'hono'
import { userRoutes } from './routes/user';
import { topicRoutes } from './routes/topic';
import { cors } from 'hono/cors';
import { questionRoutes } from './routes/question';
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>();

app.use(cors())
app.route('/api/v1/user',userRoutes)
app.route('/api/v1/topic',topicRoutes)
app.route('/api/v1/questions',questionRoutes)
 
export default app
 