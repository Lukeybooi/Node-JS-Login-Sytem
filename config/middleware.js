module.exports = {
    use(express, app) {
        const path = require('path');
        const bodyParser = require('body-parser');

        app.use(express.static(path.join(__dirname, '../', 'public')));

        app.use(require('express-session')({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true,
            rolling: true
        }));

        app.use(bodyParser.urlencoded({
            extended: false
        }));

        app.use(bodyParser.json());
    },
    set(app) {
        const path = require('path');
        app.set('views', path.join(__dirname, '../', 'view'));
        app.set('view engine', 'ejs');
    }
};