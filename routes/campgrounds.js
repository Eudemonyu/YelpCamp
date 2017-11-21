var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    res.render("landing");
});


router.get("/campground", function(req, res) {
    
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser:req.user});
        }
    });
    
});

router.get("/campground/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

router.post("/campground", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var url = req.body.url;
    var des = req.body.descript;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: url, description: des, author:author};
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
           res.redirect("campground");  
        }
    });
   
});


router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, Campground) {
        if(err) {
            console.log(err);
            res.send("this is wrong");
        } else {
            console.log(Campground);
            res.render("campgrounds/show", {campground: Campground}); 
        }
    });
    
});


router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground:foundCampground});
               
    });
});


router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
       if (err) {
           res.redirect("/campground");
       } else {
           res.redirect("/campground");
       }
   });
});


module.exports = router;