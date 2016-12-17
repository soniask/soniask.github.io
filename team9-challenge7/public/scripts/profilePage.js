"use strict";

firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href= "login.html";
    }
})

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {}; 
    }

    componentDidMount(){
        var database = firebase.database();
        var userId = firebase.auth().currentUser.uid;
        database.ref('/userTree/' + userId).once('value').then((snapshot) => {
            this.setState({
                favorites:snapshot.val()
            });
        });
    }
        
    
    render() {
        return(
            <div>
                <Header/>
                {
                    this.state.favorites ? (
                    <FavoritesDisplay 
                        favorites={this.state.favorites}
                    />
                    ) : null
                }
            </div>
        );
    } 
}

var profileWrapper = document.getElementById("profile-wrapper");
ReactDOM.render(<ProfilePage />, profileWrapper);
