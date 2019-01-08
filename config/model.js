const mongoose = require('mongoose');

let model = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('credential', model);