var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    request         = require("request"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Movie           = require("./models/movie"),
    Blog            = require("./models/blog"),
    localObj        = {nameVar: "Guest"},
    seedDB          = require("./seeds"),
    User            = require("./models/user"),
    Comment         = require("./models/comment");

var blogRoutes = require("./routes/blogs"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");


app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/movie_app");
app.use(express.static("public"));

app.set("view engine", "ejs");
seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "This is Anfield",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// (middleware) pass user object to every routes
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//============
// ROUTES
//============

app.get("/", function(req, res){
    res.render("home", localObj);
});

app.get("/results", function(req, res){
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

app.get("/favorite", function(req, res){
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

app.get("/favorite/:id", function(req, res){
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

app.post("/favorite/new/:title", function(req, res) {
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


app.get("/moviews/:id", function(req, res) {
   res.render("show"); 
});

app.use(blogRoutes);
app.use(commentRoutes);
app.use(indexRoutes);


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!!!");
});