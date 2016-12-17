"use strict";

var API_KEY = '05634e4758b883061e3616b61b8f7899';

class MovieApp extends React.Component {
    constructor(props) {
        super(props);                    
        this.state = {           
            numMoviesInCart: 0
        };
    }

    componentDidMount() {
        var cartIdObjects = JSON.parse(localStorage.getItem('myCart'));
        var numMoviesInCart = 0;
        if (cartIdObjects) {
            cartIdObjects.forEach(function(cartIdObject) {
                if(cartIdObject) {
                    numMoviesInCart += cartIdObject.quantity;
                }
            }, this);
        }
        
        var initialSearch =  "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1"
        
        this.setState({
            numMoviesInCart: numMoviesInCart,
            
        })
        this.getPage(initialSearch, 1)
    }
    
    render() {

        return(
            <div className="container">
            
                    <div className="movie-top-nav jumbotron">
                        <div className="row">
                            <div className="col-xs-3">
                                <GenreSelect
                                    onChange={(genreKey) => this.searchGenre(genreKey, 1)}
                                />
                            </div>

                            <div className="col-xs-6">
                                <MovieSearch
                                    onSubmit={(query) => this.searchMovie(query, 1)}
                                />
                            </div>

                            <div className="col-xs-3 text-right">
                                <CartLink
                                    numberInCart={this.state.numMoviesInCart}
                                />
                            </div>
                        </div>
                    </div>

            
                {
                    this.state.currentDisplayPage ? (

                        <div>

                            <PageNavigation
                                baseUrl={this.state.baseUrl}
                                currentPage={this.state.currentPage}
                                totalPages={this.state.totalPages}
                                totalResults={this.state.totalResults}
                                onClick={(page) => this.getPage(this.state.currentBaseUrl, page)}
                            />

                            <MovieGrid
                                movieList={this.state.currentDisplayPage.results}
                                onSave={(number) => this.updateNumber(number)}
                            />

                        </div>

                    ) :
                    null
                }

            </div>
        );
    }

    // Function that updates the number of movies that are in the cart
    updateNumber(number) {
        this.setState({
            numMoviesInCart: number
        })
    }

    // Function that creates a api call for a given query then gets the results for a given page
    searchMovie(query, page) {

        var baseUrl = "https://api.themoviedb.org/3/search/movie?language=en-US&api_key=" + API_KEY + "&query=" + query;

        this.getPage(baseUrl, page);
        
    }

    //Crafts url for api call to get popular movies from a given genre
    searchGenre(genreKey, page) {
        var genreUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1";

        //-1 means the genre is popular
        //In this case the url will be changed if the genre choice is popular
        if(genreKey !== "-1") {
            var genreUrl = genreUrl + "&with_genres=" + genreKey;
        }
        this.getPage(genreUrl, page);
    }

    // Functions that takes a base query and page and fetches the movie results for that page
    getPage(baseUrl, page) {
        var url = baseUrl + "&page=" + page;

        fetch(url)
        .then((response) => {
            return response.json();

        })
        .then((json) => {

            // Did not return valid data
            if (json.hasOwnProperty("status_code")) {
                alert(json.status_message)
            }
            // Make sure they don't exceed the max number of pages
            else if (page > 1000) {
                alert("You cannot select a page above 1000")
            }
            // Update state with the new page
            else {

                this.setState({
                    currentDisplayPage: json
                });

                this.updatePagesStatus(baseUrl, page);
            
            }
        });
    }

    // Saves the page infomation for a given query url to the current state
    updatePagesStatus(baseUrl, page) {

        if (this.state.currentDisplayPage) {

            var totalPages = this.state.currentDisplayPage.total_pages;
            var totalResults = this.state.currentDisplayPage.total_results;

            this.setState({
                currentBaseUrl: baseUrl,
                currentPage: page,
                totalPages: totalPages,
                totalResults: totalResults
            });
        }
        else {
            alert("Couldn't get the current list of movies");
        }
    }
}

var movieApp = document.getElementById("movie-app");

ReactDOM.render(<MovieApp />, movieApp);
