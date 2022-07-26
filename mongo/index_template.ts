import { MongoClient, ObjectId } from "mongo/mod.ts";


export const client = new MongoClient();


export const db = await client.connect("mongodb://username:password@ip:port/db");







