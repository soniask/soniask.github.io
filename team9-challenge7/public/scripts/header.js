"use strict";

class Header extends React.Component {

    componentDidMount(){
        document.getElementById("logout").addEventListener("click", function (e) {
            firebase.auth().signOut();
            window.location.href = "index.html";
        });
    }

    render(){
        var user = firebase.auth().currentUser;
        return (
            
            <header>
                {
                    user ? (

                        <div className="dropdown pull-right">
                            <button className="btn btn-default dropbtn">
                                Welcome, {user.displayName} 
                                <span className="caret"></span>
                            </button>
                            <div className="dropdown-content">
                                {
                                    window.location.href.indexOf("profile.html") > -1 ? (
                                        <a className="btn btn-default" href="index.html">
                                            <div className="text-right">
                                                Search Songs
                                            </div>
                                        </a>
                                    ) : (
                                        <a className="btn btn-default" href="profile.html">
                                            <div className="text-right">
                                                Profile
                                            </div>
                                        </a>
                                    )
                                }
                                <a className="btn btn-default" href="#" id="logout">
                                    <div className="text-right">
                                        Logout
                                    </div>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="dropdown pull-right">
                            <button className="btn btn-default dropbtn">
                                Welcome 
                                <span className="caret"></span>
                            </button>
                            <div className="dropdown-content">
                                <a className="btn btn-default" href="login.html" id="logout">
                                    <div className="text-right">
                                        Login
                                    </div>
                                </a>
                            </div>
                        </div>
                    )
                }
                
            </header>
        );
    }
}
