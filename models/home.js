const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtil')

const homeDataPath = path.join(rootDir, 'data', 'home.json');

module.exports = class Home {
  constructor(homeName, Price, Location, Rating, PhotoURL) {
    this.homeName = homeName;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.PhotoURL = PhotoURL;
  }

  save() {
    Home.fatchAll((registeredHomes) => {
      if(this.id){
        registeredHomes = registeredHomes.map(home => home.id === this.id ? this : home);
      } else {
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      // save data in file
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
        console.log('File Writing Conclude', error)
      });
    });
  }

  static fatchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      // console.log('File read', err, data);
      callback(!err ? JSON.parse(data) : [])
    });
  }

  static findById(homeId, callback) {
    this.fatchAll(homes => {
      const homeFound = homes.find(home => home.id === homeId);
      callback(homeFound);
    })
  }

  static deleteById(homeId,callback){
    this.fatchAll(homes => {
      homes = homes.filter(home => home.id !== homeId);
      fs.writeFile(homeDataPath,JSON.stringify(homes),callback);
    })
  }
};
