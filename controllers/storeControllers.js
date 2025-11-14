const Favourite = require("../models/favourite")
const Home = require('../models/home')

exports.getIndex = (req,res,next)=>{
   Home.fatchAll((registeredHomes) => 
    res.render("store/index", {pageTitle: 'airbnb Home' , currentPage: 'index', registeredHomes: registeredHomes} ) // ejs -> remove sendfile and add render 
  );
};
exports.getHomes = (req,res,next)=>{
   Home.fatchAll((registeredHomes) => 
    res.render("store/home-list", {pageTitle: 'Home List' , currentPage: 'Home', registeredHomes: registeredHomes} ) // ejs -> remove sendfile and add render 
  );
};
exports.getBookings = (req,res,next)=>{
  res.render('store/bookings',{pageTitle:'My Booking ',currentPage: 'Bookings'})
};

exports.getfavouriteList = (req,res,next) => {
  Favourite.getFavourites(favourite =>{
    Home.fatchAll((registeredHome) => {
      const favouriteHome = registeredHome.filter(home => favourite.includes(home.id));
      res.render('store/favourite-list',{pageTitle:'My Favourite',currentPage:'Favourite',favouriteHome: favouriteHome})
  });
  })
}

exports.postAddToFavourite = ((req,res,next) => {
    console.log("Came to add to Favourite", req.body);
    Favourite.addToFavourite(req.body.id, error => {
      if (error) {
        console.log("Error while making favourite");
      }
      return res.redirect("/favourite")
    })
  }) 

exports.postRemoveFromFavourite = (req,res,next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if(error) {
      console.log("Enter while removing from Favourite", error);
    }
    return res.redirect("/favourite")
  })
}

exports.getHomeDetail = ((req,res,next) => {
  const homeId = req.params.homeId;  //get the home id.
  console.log("At home detail page",homeId);
  Home.findById(homeId, home => {
    if (!home){
      console.log("Home not found");
      return res.redirect("/homes")
    } else {
       console.log("Home Details Found", home);
    res.render("store/home-detail",{
      home:home,
    pageTitle:"Home Detail",currentPage:"home-detail" })
    }
  });
  });