// const mongoose = require('mongoose');


// const uri = 'mongodb+srv://admin_fyp:zjQSmdMSSWMaaPP8@fyp.u3yfplu.mongodb.net/fyp?retryWrites=true&w=majority&appName=FYP';
// // MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/fyp_db?retryWrites=true&w=majority"


// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export default async function connect() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(uri, {
//       bufferCommands: false,
//     }).then((mongoose) => {
//       console.log("MongoDB connected");
//       return mongoose;
//     }).catch(err => {
//       console.error("connection error:", err);
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }


import { MongoClient } from 'mongodb';


const uri = process.env.MONGODB_URI;
const dbName = "fyp"; 


let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Using cached MongoDB connection");
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log("Creating new MongoDB connection");
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(dbName);
    

    cachedClient = client;
    cachedDb = db;
    
    return { client, db };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}