import { FastifyInstance } from 'fastify';
import { fetchUserTable } from '../../services/userService';

const userRoutes = async (fastify: FastifyInstance) => {
  // CORS handler
  fastify.options('/request-users-table', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    reply.status(204).send();
  });

  // POST handler for fetching user table
  fastify.post('/request-users-table', async (request, reply) => {
    try {
      const users = await fetchUserTable();  // Fetch data from your service
      return reply.send(users);  // Directly send the user data array
    } catch (err) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
};

export default userRoutes;
