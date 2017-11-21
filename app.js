var express = require("express");
var app = express();
var bodyParser =require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");
// var Campground = require("./models/campground");
var seedDB = require("./seeds");
// var Comment = require("./models/comment");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var methodOverride = require("method-override");
var flash = require("connect-flash");
// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
// mongoose.connect("mongodb://<eudemon>:<Illp1206>@ds035127.mlab.com:35127/yelpcamp", {useMongoClient: true});
process.env.databaseURL
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret:"Stay foolish, Stay hungry!",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server running");
});

