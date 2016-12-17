"use strict";

class LyricInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valueExists: false,
            error: false,
            errorMessage: ""
        }
    }

    componentDidMount() {

        var user = firebase.auth().currentUser;

        if(!user) {
            this.setState({
                error: true,
                errorMessage: "You must be logged in to see other user's favorites and favorite your own lyrics"
            })
        } else {
            this.setState({
                error: false,
                errorMessage: ""
            })
        }

        var database = firebase.database();

        var uid = user.uid;
        var displayName = user.displayName;

        var title = this.props.title;
        var album = this.props.album;
        var lineNumber = this.props.lineNumber;
        var line = this.props.line;
        
        var userTree = database.ref("userTree/" + uid + "/" + album + "/" + title);

        userTree.once('value').then((snapshot) => {
            if(snapshot.val() !== null) {
                this.setState({
                    error: true,
                    errorMessage: "You have already favorited a lyric from this song"
                })
            }
        });

    }

    render() {

        return(

            <div>

                <div className="chosen-line">
                    {this.props.line}
                </div>

                {
                    !this.state.error
                        ? (
                            <div>
                                <div className="favorite-list">
                                </div>

                                <button 
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={(e) => this.addfavorite(e)}
                                >
                                    Favorite line
                                </button>

                            </div>
                            )   
                        : (
                            <div className="alert alert-info" role="alert">
                                {this.state.errorMessage}
                            </div>
                        )
                }
            
            </div>
        );
    }

    // save the selected line to the data base in two seperate ways:
    // 1) stored by user, so you can easily see which lines a user has favorited
    // 2) stored by song, so you can see the everyone's favorite line in a given song
    addfavorite(e) {
        e.preventDefault();

        var database = firebase.database();
        var user = firebase.auth().currentUser;

        var uid = user.uid;
        var displayName = user.displayName;

        var title = this.props.title;
        var album = this.props.album;
        var lineNumber = this.props.lineNumber;
        var line = this.props.line;
        
        var userTree = database.ref("userTree/" + uid + "/" + album + "/" + title);

        userTree.once('value').then((snapshot) => {
            if(snapshot.val() == null) {
                userTree.push({
                    album: album,
                    title: title,
                    line: line
                });

                var lyricTree = database.ref("lyricTree/" + album + "/" + title + "/" + lineNumber);
                lyricTree.push({
                    displayName: displayName
                });
                this.setState({
                    valueExists: false,
                    error: true,
                    errorMessage: "You have already favorited a lyric from this song"
                });
            }
        });
        this.props.getFavorites(this.props.album, this.props.title, this.props.lyrics);
    }
}
