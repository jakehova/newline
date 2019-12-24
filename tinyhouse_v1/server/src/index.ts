import bodyParser from "body-parser";
import express from "express";
import { listings } from "./listing";

const app = express();
const port = 9000;

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

app.listen(port);

//CURL Tests

//Delete post
//  curl -X POST http://localhost:9000/delete-listing
//       -H 'Content-Type: application/json'
//       -d '{"id": "001"}'

//List get
//  curl -X GET http://localhost:9000/listings

console.log(`[app]: http://localhost:${port}`);
