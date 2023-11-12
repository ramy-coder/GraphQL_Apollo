import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import db from "./_db.js";
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => args.id === review.id);
    },
    author(_, args) {
      return db.authors.find((au) => args.id === au.id);
    },
    authors() {
      return db.authors;
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((rev) => rev.game_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((auth) => auth.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((gam) => gam.id === parent.game_id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((rev) => rev.author_id === parent.id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000),
      };
      db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edit };
        }
        return g;
      });
      return db.games.find((g) => g.id === args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at port 4000");
