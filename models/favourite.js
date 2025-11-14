const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtil')

const favouritesDataPath = path.join(rootDir, 'data', 'favoutites.json');

module.exports = class Favourite {
  static addToFavourite(homeId,callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        console.log("Home is already marked favourie");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouritesDataPath, JSON.stringify (favourites),callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouritesDataPath , (err, date) => {
      callback(!err ? JSON.parse(date) : []);
    });
  }

  static deleteById(delHomeId,callback) {
    Favourite.getFavourites(homeIds => {
      homeIds = homeIds.filter(homeId => delHomeId !== homeId);
      fs.writeFile(favouritesDataPath, JSON.stringify(homeIds),callback)
    })
  }
};