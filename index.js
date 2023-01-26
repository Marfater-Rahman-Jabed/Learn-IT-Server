const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const cors = require('cors')
require('dotenv').config();
const port = 5000;

app.use(cors());
app.use(express.json())
const news = require('./news.json');
const category = require('./categories.json');

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.4jznvny.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const NewsCollection = client.db("LearnIT").collection("NewsCollection");
        const categoryCollection = client.db("LearnIT").collection("CategoryCollection");

        app.get('/news', async (req, res) => {
            const query = {};
            const cursor = NewsCollection.find(query);
            const result = await cursor.toArray()
            // console.log(app)
            res.send(result)
        })
        app.get('/news/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category_id: id };
            const result = await NewsCollection.findOne(query)
            // const allNews = news.find(n => n._id === id);
            res.send(result)

        })
        app.get('/category', async (req, res) => {
            const query = {};
            const cursor = categoryCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })


    } finally {

    }
}
run().catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send('server is running in port 5000')
})

app.listen(port, () => {
    console.log(`port running on ${port}`);
})