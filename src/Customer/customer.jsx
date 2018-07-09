import React, { Fragment } from 'react';
import Button from '../components/Button/button';
import EmailInput from '../components/EmailInput/email-input';
import Section from '../components/Section/section';
import styles from './customer.scss';

export default class Customer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };
    }

    componentDidMount() {
        let email = this.props.customer.isGuest ?
            this.props.customer.email :
            this.props.billingAddress.email;

        if (email && email !== this.state.email) {
            this.setState({ email });
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

                                <div className={ styles.actionContainer }>
                                    Already have an account? <a onClick={ this.props.onSignIn }>Sign in now</a>
                                </div>
                            </Fragment>
                        }

                        { !this.props.customer.isGuest &&
                            <div className={ styles.customerContainer }>
                                <div className={ styles.customerLabel }>
                                    You are signed in as { this.props.customer.email }
                                </div>

                                <Button
                                    label={ this.props.isSigningOut ? `Signing out...` : 'Sign Out' }
                                    onClick={ this.props.onClick } />
                            </div>
                        }
                    </Fragment>
                } />
        );
    }
}
