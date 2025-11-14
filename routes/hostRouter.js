// Core path
// const path = require('path')

// const rootDir = require('../utils/pathUtil')

const express = require('express');
const hostRouter = express.Router();

// add the css style in home page
// hostRouter.use(express.static(path.join(rootDir,'public')))  //passing the css path

hostRouter.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
})

const hostControllers = require('../controllers/hostControllers');
hostRouter.get("/add-home", hostControllers.getAddHome);

hostRouter.post("/add-home", hostControllers.postAddHome);

hostRouter.get('/host-home-list',hostControllers.getHostHomes)

hostRouter.get("/edit-home/:homeId",hostControllers.getEditHome)

hostRouter.post("/edit-home", hostControllers.postEditHome);

hostRouter.post("/delete-home/:homeId", hostControllers.postDeleteHome);

module.exports = hostRouter;