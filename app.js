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
    indexRoutes = require("./routes/index"),
    omdbRoutes = require("./routes/omdb");


app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/movie_app");
app.use(express.static("public"));

app.set("view engine", "ejs");
//seedDB(); // seed database

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

app.get("/moviews/:id", function(req, res) {
   res.render("show"); 
});

app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);
app.use("/", indexRoutes);
app.use("/", omdbRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!!!");
});