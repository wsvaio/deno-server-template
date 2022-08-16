import { db } from "./index.ts";
import { MongoClient, ObjectId, Timestamp } from "mongo/mod.ts";





interface ArticleSchema {
  _id: ObjectId;
  title: string;
  content: string;
  tags: ObjectId[];
  created_at: Date;
  updated_at: Date;
}


export default db.collection<ArticleSchema>("articles");

