"use strict";

class SignupForm extends React.Component {

    render() {

        return(

            <form  id="signup-form" onSubmit={(e) => this.formSubmit(e)}>
                <legend>Signup</legend>

                <ul className="list-unstyled">
                    <li className="form-group">
                        <label htmlFor="signup-name" className="control-label">Display Name:</label>
                        <input 
                            type="text"
                            ref="signupName"
                            className="form-control"
                            placeholder="First Name Last Name"
                            required
                        />
                    </li>

                    <li className="form-group">
                        <label htmlFor="signup-email" className="control-label">Email:</label>
                        <input 
                            type="email" 
                            ref="signupEmail"
                            className="form-control"
                            placeholder="Your email"
                            required 
                        />
                    </li>

                    <li className="form-group">
                        <label htmlFor="signup-password" className="control-label">Password:</label>
                        <input 
                            type="password" 
                            ref="signupPassword" 
                            className="form-control" 
                            placeholder="Your password"  
                            required
                        />
                    </li>

                    <li className="form-group">
                        <label htmlFor="signup-password-confirm" className="control-label">Password (Confirm):</label>
                        <input 
                            type="password" 
                            ref="signupPasswordConfirm" 
                            className="form-control" 
                            placeholder="Your password (again)" 
                            required
                        />
                    </li>

                    <li className="form-group">
                        <button 
                            id="signup-button"
                            type="submit"
                            className="btn btn-primary">Sign Up</button>
                    </li>
                </ul>
            </form>

        );
    }

    formSubmit(e) {
        e.preventDefault();
        console.log(this.refs.signupName.value);

        this.props.onSubmit(this.refs.signupName.value, this.refs.signupEmail.value, this.refs.signupPassword.value, this.refs.signupPasswordConfirm.value);
    }
}
