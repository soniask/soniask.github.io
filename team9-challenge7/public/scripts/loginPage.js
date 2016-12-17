"use strict";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signupError: false,
            loginError: false,
            error: "",
            emailSent: true
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user && this.state.emailSent) {
                window.location.href="index.html";
            }
        });
    }

    render() {

        return(

            <div>
                <div className="col col-sm-6">
                    <SignupForm onSubmit={(name, email, password, passwordConfirm) => this.createUser(name, email, password, passwordConfirm)}/>
                    {
                        this.state.signupError ? (

                            <div ref="signupError" className="alert alert-danger" role="alert">{this.state.error}</div>

                        ) : null
                    }
                </div>
                <div className="col col-sm-6">
                    <LoginForm onSubmit={(email, password) => this.loginUser(email, password)}/>
                    {
                        this.state.loginError ? (

                            <div ref="loginError" className="alert alert-danger" role="alert">{this.state.error}</div>
                            
                        ) : null
                    }
                </div>
            </div>

        );
    }

    createUser(name, email, password, passwordConfirm) {
        this.setState({
            signupError: false,
            loginError: false,
            emailSent: false
        })

        if(password == passwordConfirm) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {

                user.updateProfile({
                    displayName: name
                }).then(() => {

                }).catch((error) => {
                    this.setState({
                        signupError: true,
                        error: error.message
                    })
                });

                user.sendEmailVerification()
                .then(() => {
                    window.location.href = "index.html";
                    this.setState({
                        emailSent: true
                    })
                }).catch((error) => {
                    this.setState({
                        signupError: true,
                        error: error.message
                    })
                })
            })
            .catch((error) => {
                this.setState({
                    signupError: true,
                    error: error.message
                })
            })
        } else {
            var errorMessage = "Passwords do not match";
            this.setState({
                signupError: true,
                error: errorMessage
            })
        }
    }

    loginUser(email, password) {

        this.setState({
            signupError: false,
            loginError: false
        })

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            this.setState({
                loginError: true,
                error: error.message
            })
        })
    }
}

var loginWrapper = document.getElementById("login-wrapper");
ReactDOM.render(<LoginPage />, loginWrapper);
