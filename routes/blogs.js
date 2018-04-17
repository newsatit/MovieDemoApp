var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
router.get("/blogs", function(req, res) {
    // Get all blogs from DB
    Blog.find({}, function(err, allBlogs){
       if(err){
           console.log(err);
       } else {
          res.render("blog posts/blogs",{blogs:allBlogs});
       }
    });
});

router.post("/blogs", function(req, res){
    // get data from form and add to blogs array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newPost = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Blog.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/blogs");
        }
    });
});
router.get("/blogs/new", function(req, res){
   res.render("blog posts/newPost"); 
});

router.get("/blogs/:id", function(req, res){
    //find the campground with provided ID
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            console.log(foundPost)
            //render showPosts template with that post
            res.render("blog posts/showPosts", {blog: foundPost});
        }
    });
})

module.exports = router;