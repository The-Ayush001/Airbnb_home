const Home = require('../models/home')

exports.getAddHome = (req,res,next)=>{
  res.render('host/edit-home',{pageTitle: 'Add Home to airbnb', currentPage: 'Add-Home',editing: false}) // ejs -> remove sendfile add render
}


exports.postAddHome = (req,res,next)=>{
  // console.log(req.url,req.method);
  console.log('home Registration successful for:',req.body);   // Print the house name
  
  //going to data in module
  const {homeName, Price, Location, Rating, PhotoURL} = req.body
  const home = new Home(homeName, Price, Location, Rating, PhotoURL);
  home.save();
  
  res.redirec("/host/host-home-list");
}

exports.getHostHomes = (req,res,next) => {
  Home.fatchAll((registeredHomes) =>{
    res.render('host/host-home-list',{pageTitle:'Host Home List',currentPage:'host-Home',registeredHomes: registeredHomes})
  })
}

exports.getEditHome = (req,res,next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId,home => {
    if(!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId,editing,home)
  res.render("host/edit-home",{
    pageTitle: "Edit you Home",
    currentPage:"host-Home",editing: editing,home: home
  })
  })
}

exports.postEditHome = (req,res,next) => {
  const {id,homeName,Price,Location,Rating,PhotoURL} = req.body;
  const home = new Home(homeName, Price, Location, Rating, PhotoURL);
  home.id = id;
  home.save();
  return res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req,res,next) => {
  const homeId = req.params.homeId;
  console.log("Came to detele", homeId);
  return res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req,res,next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete', homeId);
  Home.deleteById(homeId, error => {
    if (error) {
      console.log('Error while deleting ',error);
    }
    res.redirect("/host/host-home-list");
  })
}