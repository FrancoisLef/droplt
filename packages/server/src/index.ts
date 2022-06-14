import 'reflect-metadata';

import dotenv from 'dotenv-flow';
import express, { Application, json, RequestHandler } from 'express';
import http from 'http';

dotenv.config({
  silent: true,
});

const {
  JOB_CLEAN_INTERVAL,
  JOB_FEED_INTERVAL,
  NODE_ENV,
  SERVER_PORT = 4000,
} = process.env;

const cleanJobInterval = parseInt(JOB_CLEAN_INTERVAL, 10) || 60;
const feedJobInterval = parseInt(JOB_FEED_INTERVAL, 10) || 5;

// Init Express app
const app: Application = express();

// Setup various HTTP headers to secure app
// app.use(helmet());

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

// Server public files
app.use(express.static('public'));

app.use('/', () => {
  console.log('coucou');
});

(async () => {
  // Encapsulate Express App into a HTTP server
  // So that we can re-use the HTTP server instance to listen for WebSocket
  // Useful for GraphQL subscriptions
  const httpServer = http.createServer(app);

  // Build GraphQL schema
  // await buildSchema({
  //   resolvers: [DashboardResolver, TorrentResolver],
  //   emitSchemaFile: 'public/schema.graphql',
  // });

  // Start HTTP server and listen for connections
  await new Promise<void>((resolve) => httpServer.listen(SERVER_PORT, resolve));

  console.log(`
✅ Server started
⚙️  Environment: ${NODE_ENV}
🔥 Feed interval: ${feedJobInterval} seconds
🗑  Clean interval: ${cleanJobInterval} seconds
💧 GraphQL endpoint: http://localhost:${SERVER_PORT}/graphql
🌱 GraphQL subscriptions: ws://localhost:${SERVER_PORT}/subscriptions
`);
})();