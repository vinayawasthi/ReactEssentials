import { config } from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser';
import path from 'path';
import { MongoClient, ObjectId } from 'mongodb';
import articles from './articles';

config({ path: 'env/dev.env' })

const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"


const withDB = async (operations, res) => {
  const client = MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
  client.then(async (x) => {
    const db = x.db('blog');
    await operations(db);
  }).catch((error) => {
    console.log(error);
    res.status(500).json({ message: 'Error connecting to db', error });
  }).finally(() => {
    client.then((x) => x.close());
  });
}

const app = express()
//app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/api/articles/imports', (req,res)=> {
  withDB(async (dbo) => {
    const _articles = dbo.collection("articles"); // do this INSIDE async function
    const options = { ordered: true };
    const result = await _articles.insertMany(articles, options);
    console.log(`${result.insertedCount} documents were inserted`);
  }, res);
})

app.get('/api/articles', (req, res) => {
  withDB(async (db) => {
    const _articles = await db.collection("articles");
    const articles = _articles.find({});

    if ((await articles.count()) === 0) {
      console.log("No documents found!");
    }

    const articlesl = [];

    await articles.forEach((article, i) => {
      articlesl.push(article)
    });

    res.status(200).json(articlesl);
  }, res);
})

app.get('/api/article/:name', (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    console.log(req.params.name);
    const articleInfo = await db.collection('articles').findOne({ name: articleName })
    res.status(200).json(articleInfo);
  }, res);
})

app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname + '/index.html'));
  res.send('{}');
});

app.listen(port, () => {
  console.log(`app listening at http://${host}:${port}`);
})