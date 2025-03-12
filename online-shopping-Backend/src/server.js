import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import history from 'connect-history-api-fallback';


const app = express();
app.use(bodyParser.json());

app.use('/images',express.static(path.join(__dirname, '../assets')));

app.use(express.static(path.resolve(__dirname,'../src/dist'),{maxAge: '1y' , etag:false}));
app.use(history());

app.get('/api/products', async (req,res) =>{
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017',
    { useNewUrlParser:true, useUnifiedTopology:true},
  );
  const db = client.db('vue-db');
  const products = await db.collection('products').find({}).toArray();
  res.status(200).json(products);
  client.close();

});


app.get('/api/users/:userId/cart' , async (req,res) => {
  const { userId } = req.params;
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017',
    { useNewUrlParser:true, useUnifiedTopology:true}
  );
  const db = client.db('vue-db');
  const user = await db.collection('users').findOne({id: userId});
  if(!user) return res.status(404).json('Could not find user');
  const products = await db.collection('products').find({}).toArray();
  const cartpageIds = user.cartpage;
  const cartpage = cartpageIds.map(id =>
    products.find(product => product.id === id));
  res.status(200).json(cartpage);
  client.close();
});

app.get('/api/products/:productId', async (req,res) => { 
    const { productId } = req.params;
    const client = await MongoClient.connect(
      'mongodb://127.0.0.1:27017',
      { useNewUrlParser:true, useUnifiedTopology:true}
    );
    const db = client.db('vue-db');
    const product = await db.collection('products').findOne({id: productId});
    if(product){
        res.status(200).json(product);
    } else{
        res.status(404).json('Could not find the product!');
    }
    client.close();
});

app.post('/api/users/:userId/cart', async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017',
    { useNewUrlParser:true, useUnifiedTopology:true}
  );
  const db = client.db('vue-db');
  await db.collection('users').updateOne({id: userId},{
    $addToSet: {cartpage:productId},
  });
  const user = await db.collection('users').findOne({id: userId});
  const products = await db.collection('products').find({}).toArray();
  const cartpageIds = user.cartpage;
  const cartpage = cartpageIds.map(id =>
   products.find(product => product.id === id));
  res.status(200).json(cartpage);
  client.close();
});

app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
  const { productId,userId } = req.params;
  
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017',
    { useNewUrlParser:true, useUnifiedTopology:true}
  );
  const db = client.db('vue-db');
  await db.collection('users').updateOne({id: userId},{
    $pull: {cartpage:productId},
  });
  const user = await db.collection('users').findOne({id: userId});
  const products = await db.collection('products').find({}).toArray();
  const cartpageIds = user.cartpage;
  const cartpage = cartpageIds.map(id =>
  products.find(product => product.id === id));
  res.status(200).json(cartpage);
  client.close();
});


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../src/dist/index.html'));
});


app.listen(8080, () =>{
    console.log('Server is listening on port 8080 rutu');
});
