const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const playerCollection = db.collection("player");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

async function addPlayer(player) {
  const result = await playerCollection.insertOne(player);
  return result;
}

async function getPlayers() {
  const cursor = playerCollection.find();
  const list = await cursor.toArray();
  return list.map(({ user }) => user);
}

module.exports = { addPlayer, getPlayers };
