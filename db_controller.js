// db-controller.js

import { MongoClient, ServerApiVersion } from 'mongodb';
import createConfig from './modules/config.js';

const uri = createConfig().getMongoDbApiKey();
console.log("dB-controller started!");

async function connectToMongoDB() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        const database = client.db("test");
        const collection = database.collection("myCollection");

        // Insert a sample document
        const result = await collection.insertOne({ message: "Hello, MongoDB!" });
        console.log(`Inserted ${result.insertedCount} document into the collection`);

    } finally {
        await client.close();
    }
}

export { connectToMongoDB };
