class WeatherSearch extends React.Component {
    render() {
        return (
            <form onSubmit={(e) => this.onSearch(e)}>
                <div className="input-group">
                    <input className="form-control" type="text" ref="query" placeholder="Search city or zip"/>
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-primary pull-right">Search</button>
                    </span>
                </div>
            </form>
        )
    }

    onSearch(e) {
        e.preventDefault();
        
        var queryValue = this.refs.query.value;

        this.props.search(queryValue);
    }
}
