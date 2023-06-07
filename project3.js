const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");

const displayMovieCatalog = () => {
  // Read movieData.json file
  fs.readFile("movieData.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Failed to display a list of movies!");
    } else {
      console.log(data);
    }
  });
};

// displayMovieCatalog(); // Call displayMovieCatalog function

const addNewMovie = () => {
  // Add a new movie to the catalog by user input
  const title = prompt("Please enter a movie title: ");
  const director = prompt("Please enter a movie director: ");
  const releaseYear = prompt("Please enter a movie release year: ");
  const genre = prompt("Please enter a movie genre: ");

  const movie = { title, director, releaseYear, genre };

  fs.appendFile("movieData.json", JSON.stringify(movie), "utf-8", (err) => {
    if (err) {
      console.log("Something went wrong while appending to the file!");
      console.log(err.message);
    } else {
      console.log("Movie added successfully.");
    }
  });
};

addNewMovie(); //call add a new move function