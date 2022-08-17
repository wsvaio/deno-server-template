import { db } from "./index.ts";
import { MongoClient, ObjectId, Timestamp } from "mongo/mod.ts";





export interface ArticleSchema {
  _id: ObjectId;
  title: string;
  content: string;
  tag_ids: ObjectId[];
  created_at: Date;
  updated_at: Date;
}


export default db.collection<ArticleSchema>("articles");

