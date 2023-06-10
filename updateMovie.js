const prompt = require("prompt-sync")();
const fs = require("fs");

const updateMovieDetails = () => {  //update an existing  movie  function 
  return new Promise((resolve, reject) => {
    const titleToUpdate = prompt("Please enter the title of the movie you need to update: ");//enter the title of movie by user

    fs.readFile("movieData.json", "utf-8", (err, data) => {
      if (err) {
        reject("Failed to read the movie catalog!");
      } else {
        const movieCatalog = JSON.parse(data);
        let key = null;

        for (const movieKey in movieCatalog) { //search about the title of movie in data 
          const movie = movieCatalog[movieKey];
          if (movie.title === titleToUpdate) { //if it found
            key = movieKey;
            console.log( //print it to remmber user about it information
              "Title: " +
                movie.title +
                "\n" +
                "Director: " +
                movie.director +
                "\n" +
                "Release Year: " +
                movie.releaseYear +
                "\n" +
                "Genre: " +
                movie.genre
            );

            const newTitle = prompt("Please enter the new movie title: "); //take the new value of the movie  from user 
            const newDirector = prompt("Please enter the new movie director: ");
            const newReleaseYear = prompt("Please enter the new movie release year: ");
            const newGenre = prompt("Please enter the new movie genre: ");

            movie.title = newTitle; //update values of movie with new value that entered by user 
            movie.director = newDirector;
            movie.releaseYear = newReleaseYear;
            movie.genre = newGenre;

            fs.writeFile("movieData.json", JSON.stringify(movieCatalog, null, 2), "utf-8", (err) => { //write tha data again after altered
              if (err) {
                reject("Failed to update the movie!");
              } else {
                resolve("Movie updated successfully.");
              }
            });

            break;
          }
        }

        if (!key) {
          reject("Movie not found in the catalog.");
        }
      }
    });
  });
};

module.exports = {
  updateMovieDetails: updateMovieDetails
};
