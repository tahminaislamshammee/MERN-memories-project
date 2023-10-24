import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(cors());

// setting a prefix(starting path for all the routes) so it opens the site with localhost://5000/posts
app.use('/posts', postRoutes);
// const CONNECTION_URL = 'mongodb+srv://tahminaislamshammee:Z5iCpqC1iXjwQGSN@cluster0.9gdvbym.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`))).catch((error)=> console.log(error.message));

// mongoose.set('useFindAndModify', false);