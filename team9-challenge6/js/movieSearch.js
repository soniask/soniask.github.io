"use strict";

class MovieSearch extends React.Component {
    render() {
        return (
            <div>
                <form 
                    className="form-group"
                    onSubmit={(e) => this.searchMovies(e)}
                >

                    <div className="input-group">

                        <input 
                            type="text" 
                            className="form-control" 
                            ref="query"
                            placeholder="Search for a movie..." 
                        />

                        <span className="input-group-btn">
                            <button 
                                type="submit"
                                className="btn btn-primary"
                            >Search
                            </button>
                        </span>
                    </div>  
                </form>
            </div>
        );
    }

    // Function to search for movies matching a given query
    searchMovies(e) {
        e.preventDefault();

        var query = this.refs.query.value;
        this.props.onSubmit(query);

        this.refs.query.value="";
    }

}
