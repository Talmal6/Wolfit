// server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import {gameRoutes} from './routes/gameRoutes';

const fastify = Fastify({ logger: true });

// Register CORS for entire server to allow different domain access
fastify.register(cors, {
  origin: '*', // Allow any origin (use specific domains for better security)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Register authRoutes
authRoutes(fastify);
userRoutes(fastify);
gameRoutes(fastify);

// Start the server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
