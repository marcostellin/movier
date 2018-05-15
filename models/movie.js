const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

const movieSchema = new mongoose.Schema({
    _id: {type: String, default: new ObjectId()},
    info: Object
});

module.exports = mongoose.model('Movie', movieSchema); 