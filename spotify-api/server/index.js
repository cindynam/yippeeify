const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const port = 3001;

const authRouter = require('./auth');
const userRouter = require('./user');
const topSongsRouter = require('./top_songs');
const topArtistsRouter = require('./top_artists');

app.use(cors());
app.use(express.json());

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/topsongs', topSongsRouter);
app.use('/topartists', topArtistsRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});