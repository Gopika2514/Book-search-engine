const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const routes = require('../server/routes')

const app = express();
const PORT = process.env.PORT || 3001;

 const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: authMiddleware
 });
 await server.start();
 server.applyMiddleware({ app });


  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());



 app.use(routes);


 // if we're in production, serve client/build as static assets
 if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
 }

 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });

 await new Promise(resolve => db.once('open', () => resolve()));
 await new Promise(resolve => app.listen({ port: PORT }, resolve));
 console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
 return { server, app };

