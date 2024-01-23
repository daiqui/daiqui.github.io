/* Replace <password> with the password for the nowMAKI user. Ensure any option params are 
URL encoded

in Terminal run: 
>> cd path/to/your/project
>> npm init -y
>> npm install mongodb

-- make sure db-controller.js is imported and called in app.js
---------------------------------------------------------------------------------------------*/

//Add your connection string into your application code
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nowMAKI:monG!o4tlas@cluster0.jphtbp6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);