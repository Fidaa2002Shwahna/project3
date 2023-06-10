const prompt = require("prompt-sync")();
const fs = require("fs");

const addNewMovie = () => { //add a new move function
  return new Promise((resolve, reject) => { //using Promises for Async Programming
    const title = prompt("Please enter a movie title: "); //enter details about movie by user
    const director = prompt("Please enter a movie director: ");
    const releaseYear = prompt("Please enter a movie release year: ");
    const genre = prompt("Please enter a movie genre: ");

    fs.readFile("movieData.json", "utf-8", (err, data) => { //read data from movieData file to add for it
      if (err) {
        reject("Failed to read the movie catalog!"); 
      } else {
        let movieCatalog = JSON.parse(data);  //convert data to object
        let count = Object.keys(movieCatalog).length; //determine length of data for counter in added value
        const movie = { //write the value as an object
          title,
          director,
          releaseYear,
          genre,
        };

        movieCatalog["Movie " + (count + 1)] = movie;//count++ then add it to object

        fs.writeFile(  //write data again after add the new movie
          "movieData.json",
          JSON.stringify(movieCatalog, null, 2),
          "utf-8",
          (err) => {
            if (err) {
              reject("Failed to add the new movie!");
            } else {
              resolve("Movie added successfully.");
            }
          }
        );
      }
    });
  });
};

module.exports = {  //export addNewMovie function
  addNewMovie: addNewMovie
};
