"use strict";

class CartLink extends React.Component {

    render() {
        return (
            <div id="cart-div">
                <a href="cart.html">
                    <p>
                        <i className="fa fa-shopping-cart" aria-label="Link to Cart Page"></i>
                        {this.props.numberInCart}
                    </p>
                </a>
            </div>
        );
    }
}
