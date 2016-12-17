class CartListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item">
                <h2>{this.props.title}</h2>

                <div className="cart-poster">
                    <img src={'http://image.tmdb.org/t/p/w92'+this.props.poster} />
                </div>
                <div className="cart-info-and-controls">
                    <p className="overview">
                        {this.props.overview}
                    </p>

                    <p>
                        Price: {numeral(this.props.quantity * 14.95).format('$0,0.00')}
                    </p>
                    
                    <div className="input-group quantity-picker">
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={(e) => this.quantityChanged(e, -1)}>
                                <i className="fa fa-minus" aria-label="Decrease"></i>
                            </button>
                        </span>
                        <input type="text" className="form-control" value={this.props.quantity} readOnly/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={(e) => this.quantityChanged(e, 1)}>
                                <i className="fa fa-plus" aria-label="Increase"></i>
                            </button>
                        </span>
                    </div>

                    <button  className="btn btn-default"
                        onClick={(e) => this.remove(e)}
                    >
                        Remove
                    </button>
                </div>
               
            </li>
        );
    }

    remove(e) {
        e.preventDefault();
        this.props.onRemove();
    }

    quantityChanged(e, change){
        e.preventDefault();
        this.props.onQuantityChanged(change);
    }
}