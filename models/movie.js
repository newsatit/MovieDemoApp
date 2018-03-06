var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
    Title: String,
    Poster: String,
    Website: String,
    Plot: String
});

module.exports = mongoose.model("movie", movieSchema);