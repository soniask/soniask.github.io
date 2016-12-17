"use strict";

class MovieGrid extends React.Component {

    render() {

        return (
            <div>

                {
                    this.props.movieList.map((movie) => (

                        <div 
                            className="col-md-6 col-sm-12 movie-div"
                            key={movie.id}
                        >
                          
                            <MovieDisplay
                                id = {movie.id}
                                title = {movie.title}
                                overview = {movie.overview}
                                poster = {movie.poster_path}
                                onSave = {(number) => this.updateNumber(number)}
                            />
                         
                        </div>
                    ))
                }
                
            </div>
        );
    }

    updateNumber(number) {
        this.props.onSave(number);
    }
}
