import { config } from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser';
import path from 'path';
import { MongoClient, ObjectId } from 'mongodb';
import articles from './articles';

config({ path: 'env/dev.env' })

const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"


const withDB = async ( operations, res) => {
  const client = MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
  client.then((x) => {
    x.connect();
    const db = x.db('blog');
    operations(db);
  }).catch((error) => {
    res.status(500).json({ message: 'Error connecting to db', error });
  }).finally(() => {
     client.then((x) => x.close());
  });
}

const app = express()
//app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {

  withDB(async (dbo) => {
    const _articles = dbo.collection("articles"); // do this INSIDE async function
    const options = { ordered: true };
    const result = await _articles.insertMany(articles, options);
    console.log(`${result.insertedCount} documents were inserted`);
  }, res);

  // withDB(async (dbo) => {
  //   const collection = await DB.collection("articles"); // do this INSIDE async function

  //   await collection.find({}).limit(5)
  //     .toArray(function (err, result) {
  //       if (err) throw err;
  //       //res.send(JSON.stringify(result));
  //       res.status(200).json(result);
  //       dbo.close();
  //     });
  // }, res);


  // const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true });
  // client.connect((err) => {
  //   if (err) throw err;

  //   const db = client.db('local');
  //   const collection = db.collection('startup_log').find({}).limit(5)
  //     .toArray(function (err, res) {
  //       if (err) throw err;

  //       console.log(JSON.stringify(res));

  //       db.close();
  //     });;

  //   //console.log(JSON.stringify(collection));
  //   client.close();
  // });

  res.send('Hello World!');
})

app.get('/api/articles', (req, res) => {
  res.send('Hello World!');
})
app.get('/api/article/:id', (req, res) => {
  res.send('Hello World!');
})
app.get('/api/article/:id/comments', (req, res) => {
  res.send('Hello World!');
})

// app.get('*', (req, res) => {
//   //res.sendFile(path.join(__dirname + '/index.html'));
//   res.send('{}');
// });

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
})