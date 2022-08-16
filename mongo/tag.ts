import { db } from "./index.ts";
import { MongoClient, ObjectId, Timestamp } from "mongo/mod.ts";





interface TagSchema {
  _id: ObjectId;
  name: string;
  created_at: Date;
  updated_at: Date;
}


export default db.collection<TagSchema>("articles");

