import { db } from "./index.ts";
import { MongoClient, ObjectId, Bson } from "mongo/mod.ts";





interface UserSchema {
  _id: ObjectId;
  username: string;
  password: string;

  created_at: Date;
  updated_at: Date;
}


export default db.collection<UserSchema>("users");

