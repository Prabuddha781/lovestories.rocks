import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import homeRouter from './routes/posts.js';
import postQueries from './routes/postQueries.js';
import { updateTags } from './controllers/postQueries.js';
import { updateTop100 } from './controllers/postQueries.js';
let https;
try {
  https = await import('https');
} catch (err) {
  console.log('https support is disabled!');
}


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', homeRouter);
app.use('/postQueries', postQueries)

app.get('/', (req, res) => {
  res.send('Welcome!');
})
setInterval(updateTags, 8640000);
setInterval(updateTop100, 8640000);

setInterval(function() {
  https.get("https://forever-love-1.herokuapp.com");
}, 150000);

// const CONNECTION_URL = 'mongodb+srv://Pierre81:Innovators81@cluster0.jtccm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5005;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(error.message));