// // import { MongoClient } from "mongodb";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://task-management:mBpbpR0oFvshoghP@task-management.yrlbnwg.mongodb.net/?retryWrites=true&w=majority"

// const client = new MongoClient(uri);

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function database() {
//   try {
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     // db = await client.db("task-management")
//     // const coll = db.collection("task")
//     // const tasks = coll.find({})
//     // await tasks.forEach(console.log);
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }



const mongoose = require('mongoose');

async function database() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connect success')
  } catch (error) {
    console.log('Connect failure')

  }
}

// database()

module.export = { database }

// import { MongoClient } from "mongodb";

