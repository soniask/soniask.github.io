class CartList extends React.Component {
    constructor(props){
        super(props);
    }

    render () {
        return (
            <ul className="list-group">
                {
                    this.props.movies.map((movie) => (
                        <CartListItem key={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            overview={movie.overview}
                            quantity={movie.quantity}
                            onRemove={() => this.props.onRemove(movie.id)}
                            onQuantityChanged={(change) => this.props.onQuantityChanged(movie.id, change)}
                        />
                    ))
                }
            </ul>
        );
    }
}