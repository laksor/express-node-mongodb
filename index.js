const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// using middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://db1:user1@cluster0.8j9ie.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("food-express").collection("users");

    // Getting user

    app.get('/user', async (req, res) =>{
        const query = {};
        const cursor = userCollection.find(query);
        const user = await cursor.toArray();
        res.send(user);
    })

    //Post user

    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //delete user

    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

  } finally {
    
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Crud server");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
