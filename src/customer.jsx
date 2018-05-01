import React, { Fragment } from 'react';
import Button from './components/button';
import EmailInput from './components/email-input';
import Section from './components/section';

const signInDiv = {
    fontSize: '12px',
    marginLeft: '12px',
};

const customerDiv = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 12px',
    width: '100%',
};

const signedInDiv = {
    alignSelf: 'center',
    display: 'flex',
};

export default class Customer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };
    }

    componentDidMount() {
        if (this.props.customer.email && this.props.customer.email !== this.state.email) {
            this.setState({ email: this.props.customer.email });
        }
    }

    componentDidUpdate() {
        this.props.onChange(this.state);
    }

    render() {
        return (
            <Section
                header={ 'Customer' }
                body={
                    <Fragment>
                        { this.props.customer.isGuest &&
                            <Fragment>
                                <EmailInput
                                    id={ 'guestEmail' }
                                    label={ 'Email' }
                                    value={ this.state.email }
                                    onChange={ ({ target }) => this.setState({ email: target.value }) } />

                                <div style={ signInDiv }>
                                    Already have an account? <a onClick={ this.props.onClick }>Sign in now</a>
                                </div>
                            </Fragment>
                        }

                        { !this.props.customer.isGuest &&
                            <div style={ customerDiv }>
                                <div style={ signedInDiv }>
                                    You are signed in as { this.props.customer.email }
                                </div>

                                <Button
                                    label={ this.props.isSigningOut ? `Signing out...` : 'Sign Out' }
                                    onClick={ this.props.signOut } />
                            </div>
                        }
                    </Fragment>
                } />
        );
    }
}
