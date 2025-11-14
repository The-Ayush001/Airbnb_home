// Core path
// const path = require('path')

// External Module
const express = require('express');

//Local MOdule
const storeRouter = require('./routes/storeRouter')
const hostRouter = require('./routes/hostRouter')
// const rootDir = require('./utils/pathUtil')

const app = express();

app.use(express.static('public'));  // to get the imae pate in detail list.

// install ejs
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }));  //store the name of house

app.use(storeRouter);
app.use("/host",hostRouter);


//add page nat found error
const errorController = require('./controllers/errors')
app.use(errorController.pageNotFound);


const port = 3002;
app.listen(port, () => {
  console.log(`Server running on address http://localhost:${port}`);
})