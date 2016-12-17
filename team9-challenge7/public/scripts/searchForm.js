"use strict";
class SearchForm extends React.Component {
    render() {
        return (
            <form onSubmit={(e)=>this.searchTracks(e)} className="half-sized">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search input" ref="query"/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
            </form>
        );
    } 

    searchTracks(e) {
        e.preventDefault();

        {/* retrieve the user input, make it lowercase, 
            separate words by underscores instead of spaces */}
        var trackTitle = this.refs.query.value.toLowerCase().replace(/\s/g, "_");

        this.props.search(trackTitle);
    }
}
