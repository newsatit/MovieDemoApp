var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment   = require("./models/comment");

var data = [
    {
        name: "500 days of summer", 
        image: "https://i0.wp.com/www.audienceseverywhere.net/wp-content/uploads/2015/02/Screenshot-484.png?zoom=2&resize=1012%2C539",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae nibh nisl. Nam commodo nisl sed commodo iaculis. Pellentesque mattis ipsum luctus eros feugiat efficitur. Mauris at erat ut orci venenatis porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut vel pulvinar nulla. Praesent pharetra libero et elit tempor imperdiet. Morbi rhoncus urna quis feugiat aliquet. Nulla pellentesque nunc id quam aliquet ullamcorper. Mauris luctus ac sem eget fermentum. Praesent blandit ut massa sed rutrum. Curabitur blandit massa nec mattis auctor. In et elit massa."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae nibh nisl. Nam commodo nisl sed commodo iaculis. Pellentesque mattis ipsum luctus eros feugiat efficitur. Mauris at erat ut orci venenatis porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut vel pulvinar nulla. Praesent pharetra libero et elit tempor imperdiet. Morbi rhoncus urna quis feugiat aliquet. Nulla pellentesque nunc id quam aliquet ullamcorper. Mauris luctus ac sem eget fermentum. Praesent blandit ut massa sed rutrum. Curabitur blandit massa nec mattis auctor. In et elit massa."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae nibh nisl. Nam commodo nisl sed commodo iaculis. Pellentesque mattis ipsum luctus eros feugiat efficitur. Mauris at erat ut orci venenatis porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut vel pulvinar nulla. Praesent pharetra libero et elit tempor imperdiet. Morbi rhoncus urna quis feugiat aliquet. Nulla pellentesque nunc id quam aliquet ullamcorper. Mauris luctus ac sem eget fermentum. Praesent blandit ut massa sed rutrum. Curabitur blandit massa nec mattis auctor. In et elit massa."
    }
]

function seedDB(){
   //Remove all campgrounds
   Blog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Blog.create(seed, function(err, post){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a post");
                    //create a comment
                    Comment.create(
                        {
                            text: "This is one of my favorite movies",
                            author: "Dawanit"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                post.comments.push(comment);
                                post.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
