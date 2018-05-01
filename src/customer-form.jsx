import React from 'react';
import Alert from './components/alert';
import EmailInput from './components/email-input';
import PasswordInput from './components/password-input';
import SubmitButton from './components/submit-button';

const div = {
    padding: '24px',
};

const header = {
    borderBottom: '1px solid #e7e7e7',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    padding: '0 12px 12px',
};

const heading = {
    fontSize: '20px',
};

const closeButton = {
    backgroundColor: '#e5e5e5',
    borderRadius: '50%',
    color: '#7d7d7d',
    height: '20px',
    marginTop: '4px',
    textAlign: 'center',
    width: '20px',
};

const signInButtonDiv = {
    margin: '24px 12px 12px',
};

export default class CustomerForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    render() {
        return (
            <div style={ div }>
                <div style={ header }>
                    <div style={ heading }>
                        Welcome Back!
                    </div>

                    <a
                        onClick={ this.props.onClose }
                        style={ closeButton }>
                        &#10005;
                    </a>
                </div>

                <form onSubmit={ (event) => this._signIn(event) }>
                    { this.props.errors &&
                        <Alert body={ this.props.errors.body.detail } />
                    }

                    <div>
                        <EmailInput
                            id={ 'customerEmail' }
                            label={ 'Email' }
                            value={ this.state.email }
                            onChange={ ({ target }) => this.setState({ email: target.value }) } />

                        <PasswordInput
                            id={ 'customerPassword' }
                            label={ 'Password' }
                            value={ this.state.password }
                            onChange={ ({ target }) => this.setState({ password: target.value }) } />
                    </div>

                    <div style={ signInButtonDiv }>
                        <SubmitButton
                            label={ this.props.isSigningIn ? `Signing in as ${ this.state.email }...` : 'Sign In' }
                            isLoading={ this.props.isSigningIn } />
                    </div>
                </form>
            </div>
        );
    }

    _signIn(event) {
        event.preventDefault();

        if (this.state.email && this.state.password) {
            return this.props.signIn(this.state).then(this.props.onClose);
        }
    }
}
