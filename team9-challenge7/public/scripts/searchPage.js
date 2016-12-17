"use strict";

class SearchPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            favorites: []
        };
    }

    render() {

        return(
            <div>
                <div className="container-fluid">
                    <div className="row top-nav">

                        <div className="col-sm-3 title">Yeezy McYeezusFace</div>

                        <div className="col-sm-6 search">
                            <SearchForm
                                search={(track) => this.searchTracks(track)}
                            />
                                {
                                    this.state.error 
                                        ? (
                                            <p className="alert alert-danger">{this.state.error}</p>
                                        ) 
                                        : null
                                }
                        </div>

                        <div className="col-sm-2 actions">
                            <Header/>
                        </div>

                    </div>

                </div>

                <div className="container">

                <div className="row move-below">
                    {
                        this.state.lyrics
                            ?
                                <div className="col-sm-6">
                                    <LyricDisplay
                                        lyrics={this.state.lyrics}
                                        title={this.state.title}
                                        album={this.state.album}
                                        storeLineNumber={(lineNumber) => this.storeLineNumber(lineNumber)}
                                        getFavorites={((album, title, lyrics) => this.getFavorites(album, title, lyrics))}
                                    />
                                </div>
                            : null
                    }

                    {
                        this.state.lineNumber != undefined
                            ?
                                <div className="col-sm-6">
                                    <div className="lyric-info">
                                        <LyricInfo
                                            title={this.state.title}
                                            album={this.state.album}
                                            line={this.state.lyrics[this.state.lineNumber]}
                                            lineNumber={this.state.lineNumber}
                                            lyrics={this.state.lyrics}
                                            getFavorites={(album, title, lyrics) => this.getFavorites(album, title, lyrics)}
                                        />

                                        <div className="line-break"></div>

                                        <TopLyrics
                                            favorites={this.state.favorites}
                                        />
                                    </div>
                                </div>
                            : null
                    }
                    </div>


                </div>
            </div>
        );
    }

    searchTracks(track){
        this.setState({error: undefined});
        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.kanyerest.xyz%2Fapi%2Ftrack%2F"+track+"%22&format=json";
   
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            var result = json.query.results;
            if(result){
                var resultJSON = JSON.parse(result.body);
                var title = resultJSON.title;
                var album = resultJSON.album;
                var lyrics = resultJSON.lyrics.split("\n");

                var numOfLyrics = 0;
                var line = "";
                var newLyrics = [];
                var totalNum = 0;
                lyrics.forEach(function(lyric) {
                    totalNum++;
                    if(numOfLyrics < 4 && lyric !== "") {
                        if(numOfLyrics > 0) {
                            //Use of a back tick in babel denotes that something is going to be formated to multiple lines
                            //This is so we can pre-format our text blocks when desplaying them so each group of lyrics will still display each line on its own
                            line += ` 
` + lyric;
                        } else {
                            line += lyric;
                        }
                        numOfLyrics++;
                    } else if(lyric !=="") {
                        newLyrics.push(line);
                        line = lyric;
                        numOfLyrics = 1;
                    } else {
                        newLyrics.push(line);
                        line = "";
                        numOfLyrics = 0;
                    }
                    if(totalNum == lyrics.length) {
                        newLyrics.push(line);
                    }
                })

                this.setState({
                    title: title,
                    album: album,
                    lyrics: newLyrics,
                    lineNumber: undefined // reset the stored line number whenever a new song is loaded
                });
            } else {
                this.setState({error: "Song not found"});
            }
            
          
        })
    }

    // Add the given line number to the current state
    storeLineNumber(lineNumber) {

        this.setState({
            lineNumber: lineNumber
        });
    }

    getFavorites(album, title, lyrics) {
        var n = 5;
        var database = firebase.database();
        var refLocation = "lyricTree/" + album + "/" + title;

        // Will contain objects with line number and favorites
        var lineList = [];

        // Builds up `lineList`
        database.ref(refLocation).once("value").then((snapshot) => {

            snapshot.forEach((line) => {

                lineList.push({
                    lineNumber: line.key,
                    favorites: Object.keys(line.val()).length
                });
            });
            lineList.sort((a, b) => {
                return b.favorites - a.favorites
            });

            // Will contain most favorited lyrics, in order
            var lyricList = [];

            // build up `lineList`
            lineList.forEach((line) => {
                lyricList.push(lyrics[line.lineNumber]);
            });

            // Only return top "n" lines
            var favorites = lyricList.slice(0, n);
            this.setState({
                favorites: favorites
            });
        });
    }
}

var searchWrapper = document.getElementById("search-wrapper");
ReactDOM.render(<SearchPage />, searchWrapper);
