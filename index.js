const prompt = require('prompt-sync')();
const display = require('./movieCatalog.js');
const add = require('./addMovie.js');
const update = require('./updateMovie.js');
const Delete = require('./deleteMovie.js');
const search = require('./SearchAndFilter.js');
const fetchAndStoreMovies = require('./FetchMovieData.js');

const main = () => {     //main function
  console.log("Movie Catalog App");

  while (true) {  //print option
    console.log("1. Display Movie Catalog");
    console.log("2. Add New Movie");
    console.log("3. Update Movie Details");
    console.log("4. Delete Movie");
    console.log("5. Search Movie");
    console.log("6. Filter Movie Catalog");
    console.log("7. Fetch additional movies from OMDB");
    console.log("8. Exit");

    const choice = prompt("Please enter your choice: ");

    switch (choice) { //switch for option
      case "1":
        display.displayMovieCatalog()
          .then((data) => {
            console.log(data);
            console.log("--------------------");
          })
          .catch((error) => {
            console.log(error);
            console.log("--------------------");
          });
        break;
      case "2":
        add.addNewMovie()
          .then((data) => {
            console.log(data);
            console.log("--------------------");
          })
          .catch((error) => {
            console.log(error);
            console.log("--------------------");
          });
        break;
      case "3":
        update.updateMovieDetails()
          .then((data) => {
            console.log(data);
            console.log("--------------------");
          })
          .catch((error) => {
            console.log(error);
            console.log("--------------------");
          });
        break;
      case "4":
        Delete.deleteMovie()
          .then((data) => {
            console.log(data);
            console.log("--------------------");
          })
          .catch((error) => {
            console.log(error);
            console.log("--------------------");
          });
        break;
      case "5":
        search.search()
          .then((data) => {
            console.log("Movie found:", data);
            console.log("--------------------");
          })
          .catch((error) => {
            console.log("Error:", error);
            console.log("--------------------");
          });
        break;
      case "6":
      search.filter()
          .then((data) => {
            console.log(data);
            console.log("--------------------");
          })
          .catch((error) => {
            console.log(error);
            console.log("--------------------");
          });
        break;
      case "7":
        const nameMovie = prompt("Enter a title of movie "); //jaws for example
        fetchAndStoreMovies.fetchAndStoreMovies(nameMovie)
          .then((data) => {
            console.log(data);
            console.log("--------------------");
          })
          .catch((error) => {
            console.log(error);
            console.log("--------------------");
          });
        break;
      case "8":
        console.log("Exiting the application...");
        return;
      default:
        console.log("Invalid choice. Please try again.");
        console.log("--------------------");
    }
  }
};

main(); //call main function
