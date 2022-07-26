import { MongoClient, ObjectId } from "mongo/mod.ts";


export const client = new MongoClient();



export const db = await client.connect("mongodb://blog:blog@124.220.194.60:27017/blog");






