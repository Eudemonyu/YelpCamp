var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
// var data = [
//     {name:"Cloud's Rest",
//         image:"https://www.reserveamerica.com/marketing/html/acm/__shared/assets/7-campgounds-with-good-bike-trails7114.jpg",
//         description:"Here we came again! Wonderfull land"
//     },
//     {name:"Brazos bend",
//     image:"https://www.reserveamerica.com/marketing/html/acm/__shared/assets/7-campgounds-with-good-bike-trails7114.jpg",
//     description:"What is your expectation? It's absolutly the agligator"
//     },
    
//     {name:"Brazos bend",
//     image:"https://www.reserveamerica.com/marketing/html/acm/__shared/assets/7-campgounds-with-good-bike-trails7114.jpg",
//     description:"What is your expectation? wholllllol"
//     }];


function seedDB() {
Campground.remove({}, function(err) {
    if(err) {
        console.log(err);
    }
    console.log("Removed campgrounds!")
//     data.forEach(function(seed) {
//     Campground.create(seed, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(data);
//             Comment.create({
//                 text:"WIFI needed!!!!",
//                 autor:"Homer"
//             }, function(err, comment) {
//                 if(err) {
//                     console.log(err)
//                 } else {
                    
//                     campground.comments.push(comment);
//                     campground.save();
//                     console.log(comment);
//                 }
//             });
//         }
//     });
// });
});

}
module.exports= seedDB;