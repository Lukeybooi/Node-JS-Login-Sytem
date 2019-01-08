const functions = require('./config/functions');
const middleware = require('./config/middleware');
const routes = require('./config/routes');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/login', {
    useNewUrlParser: true
});

if (!functions.testConnection(mongoose)) {
    return false;
}

middleware.use(express, app);
middleware.set(app);

routes.route(app);

app.listen(port, () => {
    console.log(`LISTEN @ PORT: ${port}`);
});