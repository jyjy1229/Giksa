var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: String,
    password: String,
    name: String,
    mydorm: String,
    login: { type: Boolean, default: false },
    signup_date: { type: Date, default: Date.now  },
    postid: [Number]
});

module.exports = mongoose.model('user', userSchema);