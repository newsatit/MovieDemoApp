var express = require("express");
var router = express.Router();
var Movie = require("../models/movie");
var request = require("request");

router.get("/results", function(req, res){
    console.log(req.query);
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=d0501ced";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            var emptyData = [];
            console.log("Array length is " + emptyData.length);
            var errorMessage = "WTF";
            if(data.Response === "True")
                res.render("results", {data:data.Search, query: query, errorMessage: errorMessage});
            else
                res.render("results", {data: emptyData, query: query, errorMessage: data.Error});
                
        }
    });
});

router.get("/favorite", function(req, res){
    Movie.find({}, function(err, movies){
        if(err){
            console.log("Db is having trouble getting favorite movies");
            console.log(err);
        }else{
            console.log("Db successfully get favorite movies");
            res.render("favorite", {movies: movies});
        }
    });
    
});

router.get("/favorite/:id", function(req, res){
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log("Error finding info");
            console.log(err);
        }else{
            console.log("Db successfully get the movie info");
            res.render("show", {movie: movie});
        }
    });
    
});

router.post("/favorite/new/:title", function(req, res) {
    var title = req.params.title;
    var url = "http://www.omdbapi.com/?t=" + title +"&plot=full&apikey=d0501ced";
    console.log("url = " + url);
    request(url, function(error, response, body){
        
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            console.log(data);
            
            Movie.create(data, function(err, obj){
                if(err){
                    console.log("Something went wrong!!");
                }else{
                    console.log("A movie is added into database");
                    console.log(obj);
                }
            }); 
        }else{
            console.log("ohoh");
        }
        res.redirect("/favorite");
    });

});

module.exports = router;