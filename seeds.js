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
        name: "Star Wars: The Last Jedi", 
        image: "https://s.aolcdn.com/hss/storage/midas/8c786b6e2ab90b7d527621886ee9ff4d/205751517/sw-tlj-ed.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae nibh nisl. Nam commodo nisl sed commodo iaculis. Pellentesque mattis ipsum luctus eros feugiat efficitur. Mauris at erat ut orci venenatis porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut vel pulvinar nulla. Praesent pharetra libero et elit tempor imperdiet. Morbi rhoncus urna quis feugiat aliquet. Nulla pellentesque nunc id quam aliquet ullamcorper. Mauris luctus ac sem eget fermentum. Praesent blandit ut massa sed rutrum. Curabitur blandit massa nec mattis auctor. In et elit massa."
    },
    {
        name: "Forrest Gump", 
        image: "https://usercontent2.hubstatic.com/11566169_f520.jpg",
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
