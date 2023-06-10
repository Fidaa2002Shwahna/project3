const prompt = require("prompt-sync")();
const fs = require("fs");

const deleteMovie = () => { //delete a movie function
  return new Promise((resolve, reject) => { //using Promises for Async Programming
    const deleteTitle = prompt("Please enter the title of the movie you want to delete: "); //nter the title of the movie by user to delete

    fs.readFile("movieData.json", "utf-8", (err, data) => {//read data from movieData file to delete from it 
      if (err) {
        reject("Failed to read the movie catalog!"); 
      } else {
        let movieCatalog = JSON.parse(data); //convert data to object
        let key = null; // define a key value is null

        for (const movieKey in movieCatalog) { //search about the key that have the title user entered
          const movie = movieCatalog[movieKey];
          if (movie.title === deleteTitle) {
            key = movieKey;
            break;
          }
        }

        if (key !== null) { //if it found 
          delete movieCatalog[key];  //delete the object 

          fs.writeFile("movieData.json", JSON.stringify(movieCatalog, null, 2), "utf-8", (err) => { //write data again to file after delete object
            if (err) {
              reject("Failed to update the movie catalog!");
            } else {
              resolve("Movie deleted successfully.");
            }
          });
        } else {
          reject("Movie not found in the catalog.");
        }
      }
    });
  });
};

module.exports = {
  deleteMovie: deleteMovie
};
