/*
app.js - application script for the movies challenge
add your code to this file
*/
"use strict";

// Create variables for important elements (dropdown, report)
var dropdown = document.querySelector("#report-select");
var report = document.querySelector("#report");

// The following functions build the filtered lists of movies and sort them.

function buildStarWarsReport(){
    // Build
    var starWars = MOVIES.filter(function (movie) {
        return movie.title.toLowerCase().includes("star wars");
    });
    // Sort
    starWars.sort(function (movie1, movie2) {
        return movie1.title.localeCompare(movie2.title);
    });
    // Format
    starWars.forEach(function(movie){
        movie.released = moment(movie.released).format('M/D/YYYY');
        movie.sales = numeral(movie.sales).format('$0,0');
        movie.tickets = numeral(movie.tickets).format('0,0');
    });

    buildCommonTable("Just Star Wars");
    buildRows(starWars);
}

function buildTwentiethReport(){
    // Build
    var preTwentieth = MOVIES.filter(function (movie) {
        return moment(movie.released).diff(moment('2000-01-01')) < 0;
    });
    // Sort
    preTwentieth.sort(function (movie1, movie2){
        var diff = moment(movie1.released).diff(moment(movie2.released));
        if(diff != 0){
            return diff;
        }else{
            return movie1.year - movie2.year;
        }
    }); 
    // Format
    preTwentieth.forEach(function(movie){
        movie.released = moment(movie.released).format('M/D/YYYY');
        movie.sales = numeral(movie.sales).format('$0,0');
        movie.tickets = numeral(movie.tickets).format('0,0');
    });

    buildCommonTable("20th-Century Movies");
    buildRows(preTwentieth);
}

function buildGenreSalesReport() {
    // Build
    var dictionary = {};
    MOVIES.forEach(function(movie){
        if(!dictionary[movie.genre]){
            dictionary[movie.genre] = {instances:0,salesSum:0};
        }
        dictionary[movie.genre].instances++;
        dictionary[movie.genre].salesSum += movie.sales;
    });
    var rows = new Array();
    var genres = Object.keys(dictionary);
    genres.forEach(function(genreName){
        if(genreName != ""){
            rows.push({genre:genreName,avgSales:dictionary[genreName].salesSum/dictionary[genreName].instances});
        }
    });
    // Sort
    rows.sort(function(genre1, genre2){
        return genre2.avgSales - genre1.avgSales;
    });
    // Format
    rows.forEach(function(row){
        row.avgSales = numeral(row.avgSales).format('$0,0.00');
    });

    buildGenreTable();
    buildRows(rows);
}

function buildTop100Report() {
    // Build
    var dictionary = {};
    MOVIES.forEach(function(movie){
        var movieId = movie.title + " (" + moment(movie.released).format('YYYY') + ")";
        if(!dictionary[movieId]){
            dictionary[movieId] = movie.tickets;
        } else {
            dictionary[movieId] += movie.tickets;
        }
    });
    var rows = new Array();
    var movieIds = Object.keys(dictionary);
    movieIds.forEach(function(movieId){
        rows.push({movie: movieId, tickets:dictionary[movieId]});
    });
    // Sort
    rows.sort(function(movie1, movie2){
        return movie2.tickets - movie1.tickets;
    });
    // Shorten to 100 
    rows = rows.slice(0, 100);
    // Format
    rows.forEach(function(row){
        row.tickets = numeral(row.tickets).format('0,0');
    });

    buildTopTable();
    buildRows(rows);
}

// Function to create the elements needed for the Star Wars 
// and pre-20th century tables, including the
// table body (where the rows will be rendered)
// and the header (with the column labels).
function buildCommonTable(selection) {

    var heading = document.createElement("h2");
    heading.innerHTML = selection;

    var table = document.createElement("table");
    table.classList.add("table");
    
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    // Row for the header
    var threadRow = document.createElement("tr");

    // Columns for the header
    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var releasedTh = document.createElement("th");
    releasedTh.textContent = "Date Released";

    var distributorTh = document.createElement("th");
    distributorTh.textContent = "Distributor";

    var genreTh = document.createElement("th");
    genreTh.textContent = "Genre";

    var ratingTh = document.createElement("th");
    ratingTh.textContent = "Rating";

    var yearTh = document.createElement("th");
    yearTh.textContent = "Year";

    var salesTh = document.createElement("th");
    salesTh.textContent = "Gross Sales";

    var ticketsTh = document.createElement("th");
    ticketsTh.textContent = "Tickets Sold";

    // Append these elements to the table
    threadRow.appendChild(titleTh);
    threadRow.appendChild(releasedTh);
    threadRow.appendChild(distributorTh);
    threadRow.appendChild(genreTh);
    threadRow.appendChild(ratingTh);
    threadRow.appendChild(yearTh);
    threadRow.appendChild(salesTh);
    threadRow.appendChild(ticketsTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);

    report.appendChild(heading);
    report.appendChild(table);
}

// Function to create the elements needed for the Average Sales by Genre table
function buildGenreTable(){
    var heading = document.createElement("h2");
    heading.innerHTML = "Average Sales by Genre";

    var table = document.createElement("table");
    table.classList.add("table");
    
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    // Row for the header
    var threadRow = document.createElement("tr");

    // Columns for the header
    var genreTh = document.createElement("th");
    genreTh.textContent = "Genre";

    var salesTh = document.createElement("th");
    salesTh.textContent = "Average Sales";

    // Append these elements to the table
    threadRow.appendChild(genreTh);
    threadRow.appendChild(salesTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);

    report.appendChild(heading);
    report.appendChild(table);
}

// Function to create the elements needed for the Top 100 by Tickets table
function buildTopTable() {

    var heading = document.createElement("h2");
    heading.innerHTML = "Top 100 by Tickets Sold";

    var table = document.createElement("table");
    table.classList.add("table");
    
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    // Row for the header
    var threadRow = document.createElement("tr");

    // Columns for the header
    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var ticketsTh = document.createElement("th");
    ticketsTh.textContent = "Tickets Sold";

    // Append these elements to the table
    threadRow.appendChild(titleTh);
    threadRow.appendChild(ticketsTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);

    report.appendChild(heading);
    report.appendChild(table);
}

// Function to create the table elements for an array of values.
function buildRows(rows) {

    // Find the table body, where the rows will be rendered.
    var tbody = document.querySelector("tbody");

    // Iterate over each value,
    // create the tr (row element) and td elements (column elements)
    // and append to the table body.
    rows.forEach(function (movie) {
        var movieTr = document.createElement("tr");

        // Object.keys returns an array of the keys object
        var movieKeys = Object.keys(movie);

        // This makes it easy to iterate over the values
        // in the object by using bracket notation
        // to access each property in the object.
        movieKeys.forEach(function (key) {
            var value = movie[key];

            var td = document.createElement("td");
            td.textContent = value;
            movieTr.appendChild(td);
        });

        tbody.appendChild(movieTr);
    });
}

// When the selection in the dropdown changes,
// we want to clear and rebuild the table
// based on the selected released.
dropdown.addEventListener("change", function (e) {
    // Removes all the elements in the table.
    report.innerHTML = "";

    // Get the current value of the dropdown,
    // and build the table with the data for that value.
    var value = e.target.value;

    if (value === "star-wars") {
        buildStarWarsReport();
    } else if (value === "20th") {
        buildTwentiethReport();
    } else if (value === "avg-by-genre"){
        buildGenreSalesReport();
    } else if (value === "top-by-tickets"){
        buildTop100Report();
    }
});
