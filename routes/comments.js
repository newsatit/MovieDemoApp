var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Blog = require("../models/blog");

// ====================
// COMMENTS ROUTES
// ====================

router.get("/blogs/:id/comments/new", isLoggedIn, function(req, res){
    // find campground by id
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {blog: blog});
        }
    })
});

router.post("/blogs/:id/comments", isLoggedIn,function(req, res){
   //lookup blog using ID
   Blog.findById(req.params.id, function(err, blog){
       if(err){
           console.log(err);
           res.redirect("/blogs");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               blog.comments.push(comment);
               blog.save();
               res.redirect('/blogs/' + blog._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;