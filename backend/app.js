import express from 'express';
const app = express();

import MessageApp from './lib/model';

//hardcoding the test database
let messageApp = new MessageApp("/\///json/\//testMessages.json");

app.get('/', async (req, res) => {
    let result = messageApp.getAll();

    res.json(result)
})

app.listen(3001, function() {
    console.log('Connected!!!')
});

export default app;