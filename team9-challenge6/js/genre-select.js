"use strict";

class GenreSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: []
        };
    }

    componentDidMount() {
        var url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY + "&language=en-US";

        fetch(url).then((response) => {
            return response.json();
        })
        .then((genres) => {
            var genreInfo = genres.genres;

            this.setState({
                genres: genreInfo
            })
        })
        .catch((error) => {
            var errorMessage = error;
        });
    }
    
    render() {
        return(
            <div id="genre-select">
                <select onChange={(e) => this.searchGenre(e)}>
                    <option value="-1">Popular</option>
                    { 
                        this.state.genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))
                    }
                </select>
            </div>
        );
    }

    //Gets correct genre key for loading movies from that genre
    //Runs when user selects genre from dropdown
    searchGenre(e) {
        e.preventDefault();

        var genreKey = e.target.value;
        this.props.onChange(genreKey);
    }
}
