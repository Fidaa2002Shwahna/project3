const fs = require("fs");
const prompt = require('prompt-sync')();

const search = () => {  //search about movie function
  return new Promise((resolve, reject) => {
    const searchTitle = prompt("Enter the title that you want to search about:");//Enter the title of movie by user
    fs.readFile("movieData.json", "utf-8", (err, data) => {
      if (err) {
        reject("Failed to read the movie catalog!");//if there is an error
      } else {
        let movieCatalog = JSON.parse(data); 
        let key = null;

        for (let movieKey in movieCatalog) { //search about the key of title that user entered
          let movie = movieCatalog[movieKey]; //to check all values in movieCatalog
          if (movie.title === searchTitle) {  //if tilte was entered is found
            key = movieKey;//store it in key value 
            break;
          }
        }

        if (key !== null) {  //if key is not null(title is found)
          resolve(movieCatalog[key]); //send the value of movieCatalog[key] to then in index.js to print
        } else {
          reject("Movie not found!");//there is an error
        }
      }
    });
  });
};

const filter = () => { //filter by genre movie  function 
  return new Promise((resolve, reject) => {
    fs.readFile("movieData.json", "utf-8", (err, data) => {  //read data from movieData file 
      if (err) {
        reject("Failed to read the movie catalog!"); //there is an error in read operation 
      } else {
        const movies = JSON.parse(data);
        const filterOptions = {  //object to do filter operation  based on it
          genre: "Drama",
         
        };

        const filteredMovies = filterMovies(movies, filterOptions);  
        console.log(filteredMovies); //to print values that filtered(hoisting is supported by js)
      }
    });
  });
};

const filterMovies = (movies, filterOptions) => { //filterMovies function 
  const filteredMovies = {}; //empty object to store value that filtered

  for (const key in movies) { //search about the value  in movies object 
    const movie = movies[key];
    let shouldAddMovie = true; 

    for (const optionKey in filterOptions) {  //compare values in movies with values in filterOptions
      const optionValue = filterOptions[optionKey];

      if (movie[optionKey] !== optionValue) { //if movie value != filterOptions value 
        shouldAddMovie = false;
        break;  
      }
    }

    if (shouldAddMovie) {   //if shouldAddMovie = true (there is a values which movie value = filterOptions value ) 
      filteredMovies[key] = movie;  //store it in filteredMovies 
    }
  }

  return filteredMovies;
};

module.exports = { search, filter };  //export search, filter  
