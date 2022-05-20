require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080'
}));

const mongoose = require('mongoose');


const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const cluster = process.env.MONGO_URL + ':' + process.env.MONGO_PORT;
const db = process.env.MONGO_DB;

mongoose.connect("mongodb://" + cluster + "/" + db, {
  pass,
  user,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((e) => console.log(e, 'Connexion à MongoDB échouée !'));


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server launched on port ${port}`);
});


app.use('/ping', (req, res) => {
  res.status(200).send("PING OK");
});

const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const connectionRoutes = require('./routes/connection');
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/connection', connectionRoutes);

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

app.get('/addC', async (req, res) => {
  let post = await Post.findById('6286b394217aa35cb3120327');

  let comm = new Comment();
  comm.content = 'Whoa genial';
  comm.author = '6286b236fae5c5b0edee022d';
  comm.save();

  post.comments.push(comm);

  post.save()
  .then(() => {
    res.status(201).json({ message: 'Comm added.' });
  })
  .catch((error) => {
    res.status(400).json({ error });
  });
});

app.get('/addP', (req, res) => {
  let post = new Post();
  post.content = '¿ Wesh bien ou bien ?';
  post.author = '6286b246fae5c5b0edee022f';

  post.save()
  .then(() => {
    res.status(201).json({ message: 'Post created.' });
  })
  .catch((error) => {
    res.status(400).json({ error });
  });
});

app.get('/test', (req, res) => {

  Post.find().populate('author')
  .populate({
    path : 'comments',
    populate : {
      path : 'author'
    }
  })
  .then((post) => {
    res.status(200).json(post);
  })
  .catch((error) => {
    res.status(400).json({ error });
  });

});

module.exports = app;

