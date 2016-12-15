class WeatherSearch extends React.Component {
    render() {
        return (
            <form onSubmit={(e) => this.onSearch(e)}>
                <input className="form-control" type="text" ref="query" />
                <button type="submit" className="btn btn-primary pull-right">Search</button>
            </form>
        )
    }

    onSearch(e) {
        e.preventDefault();
        
        var queryValue = this.refs.query.value;

        this.props.search(queryValue);
    }
}
