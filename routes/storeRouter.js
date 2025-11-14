//Core Module
// const path = require('path')

// const rootDir = require('../utils/pathUtil')

//External Module
const express = require('express');
const storeRouter = express.Router();



// add the css style in home page
// userRouter.use(express.static(path.join(rootDir,'public')))  //passing the css path

const storeController = require('../controllers/storeControllers')
storeRouter.get("/", storeController.getIndex)
storeRouter.get('/homes',storeController.getHomes)
storeRouter.get("/bookings",storeController.getBookings);
storeRouter.get('/favourite', storeController.getfavouriteList)

storeRouter.get('/home/:homeId', storeController.getHomeDetail)
storeRouter.post('/favourite',storeController.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId",storeController.postRemoveFromFavourite);

module.exports = storeRouter;