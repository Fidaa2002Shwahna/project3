const fs = require('fs');

const displayMovieCatalog = () => { //display movie cataloge function 
  return new Promise((resolve, reject) => {
    fs.readFile("movieData.json", "utf-8", (err, data) => { //read data from movieData file to delete from it 
      if (err) {
        reject("Failed to read the movie catalog!");
      } else {
        resolve(data);  //sent data to then in index.js to print it 
      }
    });
  });
};

module.exports = {
  displayMovieCatalog: displayMovieCatalog
};
