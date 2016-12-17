"use strict";
class MovieDisplay extends React.Component {
    render() {
        return (
            <div>
                <h3 className="text-center movie-title">{this.props.title}</h3>
                    <div>
                        <img src = {"http://image.tmdb.org/t/p/w500" + this.props.poster} className="movie-poster"/>
                    </div>
                    <div className="movie-summary">
				        <p>{this.props.overview}</p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={(e) => this.addToCart(e)}
                        >
                            Add to Cart
                        </button>
                    </div>
			</div>
        );
    }

    addToCart(e) {
        var cart = JSON.parse(localStorage.getItem('myCart') || '[]');
        var addMovie = true;
        var moviesInCart = 0;
        cart.forEach(function(cartItem) {
            if(cartItem) {
                if(cartItem.id == this.props.id){
                    cartItem.quantity++;
                    addMovie = false;
                }
                moviesInCart += cartItem.quantity;
            }
        }, this);
        if(addMovie){
            cart.push({id: this.props.id, quantity: 1});
            moviesInCart++;
        }
        localStorage.setItem('myCart', JSON.stringify(cart));

        this.props.onSave(moviesInCart);
    }
}
