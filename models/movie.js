const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

const movieSchema = new mongoose.Schema({
    info: Object,
    owner: {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('Movie', movieSchema); 