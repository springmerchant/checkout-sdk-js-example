import React, { Fragment } from 'react';
import Alert from '../components/Alert/alert';
import EmailInput from '../components/EmailInput/email-input';
import Panel from '../components/Panel/panel';
import PasswordInput from '../components/PasswordInput/password-input';
import SubmitButton from '../components/SubmitButton/submit-button';
import styles from './login-panel.scss';

export default class LoginPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    render() {
        return (
            <div className={ styles.container }>
                <Panel body={
                    <Fragment>
                        <div className={ styles.header }>
                            <div className={ styles.heading }>
                                Welcome Back!
                            </div>

                            <a
                                onClick={ this.props.onClose }
                                className={ styles.closeButton }>
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

                            <div className={ styles.actionContainer }>
                                <SubmitButton
                                    label={ this.props.isSigningIn ? `Signing in as ${ this.state.email }...` : 'Sign In' }
                                    isLoading={ this.props.isSigningIn } />
                            </div>
                        </form>
                    </Fragment>
                } />
            </div>
        );
    }

    _signIn(event) {
        event.preventDefault();

        if (this.state.email && this.state.password) {
            return this.props.onClick(this.state).then(this.props.onClose);
        }
    }
}
