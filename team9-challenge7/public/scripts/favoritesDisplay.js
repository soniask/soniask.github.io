"use strict";

class FavoritesDisplay extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lyricItemArray: []
        };
    }

    componentDidMount(){
        var favorites = this.props.favorites;
        this.createListOfLyricItems(favorites);
    }

    render() {
        return (
            <div className="container">
                <h3>Your Favorite Lyrics</h3>
                <ul className="list-group">
                    {
                        this.state.lyricItemArray.map((lyricItem) => {
                            var key = Object.keys(lyricItem)[0];
                            var lyricObject = lyricItem[key];
                            return (
                                <li key={key} className="list-group-item">
                                    <p>{this.toTitleFormat(lyricObject.title)} <span>-{this.toTitleFormat(lyricObject.album)}</span></p>
                                    <p>{lyricObject.line}</p>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

    createListOfLyricItems(favorites){
        var lyricItemArray = [];
        Object.keys(favorites).map((albumTitle) => {
            var album = favorites[albumTitle];
            Object.keys(album).map((songName)=>{
                var songItems = album[songName];
                lyricItemArray.push(songItems);
            });
        });
        this.setState({
            lyricItemArray: lyricItemArray
        });
    }

    toTitleFormat(text) {
        var newText = text
            .replace(/_/g, " ") // change underlines to spaces
            .replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase() }); // capitalize the first letter of each word

        return(newText);
    }
}