import React from 'react';
import { SnackbarContent } from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

export default class CustomerComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    render() {
        return (
            <form onSubmit={ (...args) => this._handleSubmit(...args) } noValidate>
                <Typography type="display1" gutterBottom>
                    Customer
                </Typography>

                { this.props.error && <SnackbarContent message={ this.props.error.body.detail } /> }

                { this.props.customer.isGuest &&
                    <TextField
                        label="Email"
                        type="email"
                        value={this.state.email}
                        onChange={(...args) => this._handleEmailChange(...args)}
                        autoComplete="email"
                        margin="normal" />
                }

                { this.props.customer.isGuest &&
                    <TextField
                        label="Password"
                        type="password"
                        value={ this.state.password }
                        onChange={ (...args) => this._handlePasswordChange(...args) }
                        margin="normal" />
                }

                { this.props.customer.isGuest &&
                    <Button type="submit">
                        Sign in
                    </Button>
                }

                { this.props.customer.isGuest === false &&
                    <Typography type="display2" gutterBottom>
                        You are signed in as { this.props.customer.email }
                    </Typography>
                }

                { this.props.customer.isGuest === false &&
                    <Button onClick={ (...args) => this._handleSignOut(...args) }>
                        Sign out
                    </Button>
                }
            </form>
        );
    }

    _handleEmailChange({ target }) {
        this.setState({
            email: target.value,
        });
    }

    _handlePasswordChange({ target }) {
        this.setState({
            password: target.value,
        });
    }

    _handleSubmit(event) {
        event.preventDefault();

        this.props.onSignIn({
            email: this.state.email,
            password: this.state.password || null,
        });
    }

    _handleSignOut(event) {
        event.preventDefault();

        this.props.onSignOut();
    }
}
