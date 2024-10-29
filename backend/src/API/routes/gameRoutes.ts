import { FastifyInstance } from 'fastify';
import { startGame,fetchAllCourses} from '../../services/gameService';


export const gameRoutes = async (fastify: FastifyInstance) => {
  // CORS handler
  fastify.options('/request-courses-table', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    reply.status(204).send();
  });
  
  fastify.post('/request-courses-table', async (request, reply) => {
    try {
      const courses = await fetchAllCourses();
      return reply.send(courses);
    } catch (err) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });


};





export default gameRoutes;
