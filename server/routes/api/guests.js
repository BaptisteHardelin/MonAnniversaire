const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

const dbConnectionUrl =
  "mongodb+srv://admin:admin@guests.thpqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

router.get("/", async (req, res) => {
  await loadPostsCollection((dbCollection) => {
    dbCollection.find().toArray((err, result) => {
      res.send(result);
    });
  });
});

router.post("/", async (req, res) => {
  await loadPostsCollection((dbCollection) => {
    dbCollection.insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      socialMedia: req.body.socialMedia,
    });
  });

  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  await loadPostsCollection((dbCollection) => {
    dbCollection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  });
});

// get the collection from a database
async function loadPostsCollection(successCallback) {
  mongodb.MongoClient.connect(dbConnectionUrl, (err, dbInstance) => {
    const dbObject = dbInstance.db("Guests");
    const dbCollection = dbObject.collection("guests");
    console.log("[MongoDB connection] SUCCESS");
    successCallback(dbCollection);
  });
}

module.exports = router;
