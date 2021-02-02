import express from 'express';
import router from './lib/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

// app.use(require('./lib/routes.js'));
app.use(router)

app.listen(3001, function() {
    console.log('Connected!!!')
});

export default app;