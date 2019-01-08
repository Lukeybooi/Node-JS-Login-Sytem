module.exports = {
    route(app) {
        const Model = require('./model');
        const expire = 10 * 60 * 1000;

        app.route('/').get((request, response) => {
            response.render('index');
        }).post((request, response) => {
            let username = request.body.username;
            let password = request.body.password;

            Model.findOne({
                "Username": username
            }, (err, resp) => {
                if (err) {
                    return err;
                }

                if (resp) {
                    if (resp.Password === password) {
                        request.session.user = resp;
                        request.session.cookie.expires = new Date(Date.now() + expire);
                        response.send('LOGGED');
                    } else {
                        response.send('FAILED');
                    }
                } else {
                    response.send('FAILED');
                }
            });
        });

        app.route('/home').get((request, response) => {
            if (request.session.user) {
                response.render('home', {
                    username: request.session.user
                });
            } else {
                response.redirect('/');
            }
        });

        app.route('/register').get((request, response) => {
            response.render('register');
        }).post((request, response) => {
            Model.findOne({
                "Username": request.body.username
            }, (err, resp) => {
                if (err) {
                    response.send('FAILED');
                }

                if (resp) {
                    response.send('EXISTS');
                } else {
                    let saveData = new Model();

                    saveData.Username = request.body.username;
                    saveData.Password = request.body.password;
                    saveData.First_Name = request.body.first_name;
                    saveData.Last_Name = request.body.last_name;

                    saveData.save((err) => {
                        if (err) {
                            response.send('FAILED');
                        } else {
                            response.send('INSERTED');
                        }
                    });
                }
            });
        });

        app.get('/forget', (request, response) => {
            response.render('forget');
        });

        app.get('/logout', (request, response) => {
            request.session.destroy();
            response.redirect('/');
        });
    }
}