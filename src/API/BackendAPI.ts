import Fastify from 'fastify';
import { ClimbGame } from '../BackEnd/Games/ClimbGame';

const fastify = Fastify();
let game: ClimbGame | null = null;

// Define the route for starting the game
fastify.post('/api/start-game', (request, reply) => {
  const { players } = request.body as { players: string[] };
  
  if (!players || !Array.isArray(players)) {
    return reply.status(400).send({ error: 'Invalid players list' });
  }

  game = new ClimbGame(players);
  game.startGame();
  reply.send({ message: 'Game started', players });
});

// Start the Fastify server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
