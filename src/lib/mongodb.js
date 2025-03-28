const mongoose = require('mongoose');


const uri = 'mongodb+srv://admin_fyp:zjQSmdMSSWMaaPP8@fyp.u3yfplu.mongodb.net/fyp?retryWrites=true&w=majority&appName=FYP';
// MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/fyp_db?retryWrites=true&w=majority"


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    }).catch(err => {
      console.error("connection error:", err);
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

