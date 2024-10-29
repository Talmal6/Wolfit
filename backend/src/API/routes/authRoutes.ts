import { FastifyInstance } from 'fastify';
import { LoginAsManager } from '../../services/userService';

const authRoutes = async (fastify: FastifyInstance) => {
  // Add CORS options handler specifically for the login route
  fastify.options('/login-as-manager', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    reply.status(204).send();
  });

  // Login route for manager
  fastify.post('/login-as-manager', async (request, reply) => {
    const { username, password } = request.body as { username: string; password: string };
    try {
      const loginResult = await LoginAsManager(username, password);
      if (loginResult.error) {
        return reply.status(401).send({ error: loginResult.error });
      }
      return reply.send({ message: 'Login successful' });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
};

export default authRoutes;
