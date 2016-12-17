"use strict";

class LoginForm extends React.Component {

    render() {

        return(

            <form id="login-form" onSubmit={(e) => this.formSubmit(e)}>
                <legend>Login</legend>

                <ul className="list-unstyled">
                    <li className="form-group">
                        <label htmlFor="login-email" className="control-label">Email:</label>
                        <input type="email" ref="loginEmail" className="form-control" placeholder="Your email"/>
                    </li>

                    <li className="form-group">
                        <label htmlFor="login-password" className="control-label">Password:</label>
                        <input type="password" ref="loginPassword" className="form-control" placeholder="Your password"/>
                    </li>

                    <li className="form-group">
                        <button
                            id="login-button"
                            type="submit"
                            className="btn btn-primary">Login</button>
                    </li>
                </ul>
            </form>

        );
    }

    formSubmit(e) {
        e.preventDefault();

        this.props.onSubmit(this.refs.loginEmail.value, this.refs.loginPassword.value);

    }
}
