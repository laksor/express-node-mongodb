const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const usersCollection = client.db("food-express").collection("users");
    console.log("dv connected");

    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      newUser.id = users.length + 1;
      users.push(newUser);
      res.send(result);
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

const users = [];

app.get("/user", (req, res) => {
  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    const matched = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    res.send(matched);
  } else {
    res.send(users);
  }
});

app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id == id);
  res.send(user);
});

app.get("/", (req, res) => {
  res.send("Crud server");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
