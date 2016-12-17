"use strict";
var API_KEY = "05634e4758b883061e3616b61b8f7899";

class CartApp extends React.Component {
    constructor(props) {
        super(props);

        var cart = JSON.parse(localStorage.getItem('myCart') || '[]');
        var cartConverted = JSON.stringify(cart);
        this.totalMovies = 0;
        this.cartArray = [];
        cart.forEach(function(idObject) {
            if(idObject) {
                this.addMovieJSON(idObject);
            }
        }, this);

        this.state = {
            cartJSON: []
        };
    }

    render() {
        return(
            <div className="container">
                <div>
                    <a href="index.html">Back to Shopping</a>
                </div>

                <h1>Movie Store</h1>

                <CartList 
                    movies={this.state.cartJSON}
                    onRemove={(id)=>this.removeMovie(id)}
                    onQuantityChanged={(id, change)=>this.updateQuantity(id, change)}
                />

                <p className="text-right">
                    Total price: {numeral(this.state.totalMovies * 14.95).format('$0,0.00')}
                </p>
            </div>
        );
    }

    addMovieJSON(movieIDObject){
        var movieID = movieIDObject.id;
        var quantity = movieIDObject.quantity;
        fetch("https://api.themoviedb.org/3/movie/"+movieID+"?api_key="+API_KEY+"&language=en-US")
        .then((response) => (response.json()))
        .then((json) => {
            if (json.hasOwnProperty("status_code")) {
                alert(json.status_message)
            } else {
                json.quantity = quantity;
                this.totalMovies += quantity;
                this.cartArray.push(json);
                this.setState({
                    cartJSON: this.cartArray,
                    totalMovies: this.totalMovies
                })
            }
        });
    }

    removeMovie(id) {
        var movieIDsJSON = localStorage.getItem('myCart');
        var movieIDs = JSON.parse(movieIDsJSON);
        for(var i = 0; i<movieIDs.length; i++){
            if(movieIDs[i] && movieIDs[i].id == id){
                movieIDs.splice(i, 1);
            }
        }
        movieIDsJSON = JSON.stringify(movieIDs);
        localStorage.setItem('myCart', movieIDsJSON);
       

        var moviesRemoved = 0;
        var cartJSON = this.state.cartJSON;
        for(var i = 0; i<cartJSON.length; i++){
            if(cartJSON[i] && cartJSON[i].id == id){
                moviesRemoved = cartJSON[i].quantity;
                cartJSON.splice(i, 1);
            }
        }
        var newTotal = this.state.totalMovies - moviesRemoved;

        this.setState({
            cartJSON: cartJSON,
            totalMovies: newTotal
        });
        
    }

    updateQuantity(id, change) {
        var movieIDsJSON = localStorage.getItem('myCart');
        var movieIDs = JSON.parse(movieIDsJSON);
        for(var i = 0; i<movieIDs.length; i++){
            if(movieIDs[i] && movieIDs[i].id == id && movieIDs[i].quantity + change > 0){
                movieIDs[i].quantity += change;
            }
        }
        movieIDsJSON = JSON.stringify(movieIDs);
        localStorage.setItem('myCart', movieIDsJSON);

        var cartJSON = this.state.cartJSON;
        for(i = 0; i<cartJSON.length; i++){
            if(cartJSON[i].id == id && cartJSON[i].quantity + change > 0){
                cartJSON[i].quantity += change;
                var newTotal = this.state.totalMovies + change;
                this.setState({
                    cartJSON: cartJSON,
                    totalMovies: newTotal
                });
            }
        }
    }
}

var cartApp = document.getElementById("cart-app");

ReactDOM.render(<CartApp />, cartApp);
