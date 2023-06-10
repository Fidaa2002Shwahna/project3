const fs = require("fs");


function fetchAndStoreMovies(name) {   //fetch details about movie in OMDB API and store it in movieData file 
  return new Promise((resolve, reject) => {
    var q = encodeURIComponent(name);//encode name of movie by URI
    var apiUrl = "https://www.omdbapi.com/?s=" + q + "&apikey=ba1f4581"; //link of database and the key that I request it from their website

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract movie details from the response
        var movies = data.Search.map(movie => ({
          title: movie.Title,
          releaseYear: movie.Year,
          imdburl: "https://www.imdb.com/title/" + movie.imdbID + "/",
          posterurl: movie.Poster
        }));

        // Read existing movie catalog from file
        fs.readFile("movieData.json", "utf-8", (err, catalogData) => {
          if (err) {
            console.error("Failed to read the movie catalog:", err);
            reject("Failed to read the movie catalog.");
            return;
          }

          // Parse the existing movie catalog
          var movieCatalog = JSON.parse(catalogData);

          // Add the new movies to the catalog
          movieCatalog["Movie " + (Object.keys(movieCatalog).length + 1)] = movies;

          // Write the updated movie catalog back to the file
          fs.writeFile("movieData.json", JSON.stringify(movieCatalog, null, 2), "utf-8", err => {
            if (err) {
              console.error("Failed to update the movie catalog:", err);
              reject("Failed to update the movie catalog.");
            } else {
              console.log("Movie catalog updated successfully.");
              resolve("Movie catalog updated successfully.");
            }
          });
        });
      })
      .catch(error => {
        console.error("Failed to fetch movies data:", error);
        reject("Failed to fetch movies data.");
      });
  });
}

module.exports={
    fetchAndStoreMovies
}


