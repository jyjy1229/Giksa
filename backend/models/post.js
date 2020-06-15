var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    postid: Number,
    postuser: String,
    dorm_from: String,
    dorm_to: String,
    num_people: Number,
    postdate: { type: Date, default: Date.now },
    likenum: { type: Number, default: 0 },
    likes: [String],
    comments:[[ String, String ]]
});

module.exports = mongoose.model('post', postSchema);