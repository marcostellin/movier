const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    poster: String,
    overview: String,
    tagline: String,
    release: String,
    duration: String
});

module.exports = mongoose.model('Movie', movieSchema); 