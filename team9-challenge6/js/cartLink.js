"use strict";

class CartLink extends React.Component {

    render() {
        return (
            <div id="cart-div">
                <a href="cart.html">
                    <img src="img/cart-icon.png" alt="shopping cart"/>
                </a>
                <p className="inline">{this.props.numberInCart}</p>
            </div>
        );
    }
}
