require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";
import { connectDatabase } from "./database";
import { resolvers, typeDefs } from "./graphql/index";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(`[app]: http://localhost:${process.env.PORT}`);

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
};

mount(express());

/*WITHOUT GRAPHQL

// bodyparser parses incoming rquests as json
//  and expose the result on request.body
app.use(bodyParser.json());

app.get("/listings", (_req, resp) => {
  resp.send(listings);
});

app.post("/delete-listing", (req, resp) => {
  const id: string = req.body.id;

  for (let index = 0; index < listings.length; index++) {
    if (listings[index].id === id) {
      return resp.send(listings.splice(index, 1));
    }
  }

  return resp.send("Failed to delete listing");
});
*/

//CURL Tests

//Delete post
//  curl -X POST http://localhost:9000/delete-listing
//       -H 'Content-Type: application/json'
//       -d '{"id": "001"}'

//List get
//  curl -X GET http://localhost:9000/listings
