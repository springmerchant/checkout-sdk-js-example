import React, { Fragment } from 'react';
import Alert from "./components/alert";
import EmailInput from './components/email-input';
import PasswordInput from './components/password-input';
import Section from './components/section';

export default class Customer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };
    }

    componentDidMount() {
        if (this.props.customer.email) {
            this.setState({
                email: this.props.customer.email,
            });
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
                        { this.props.errors &&
                            <Alert body={ this.props.errors.body.detail } />
                        }

                        <EmailInput
                            id={ 'customerEmail' }
                            label={ 'Email' }
                            value={ this.state.email }
                            onChange={ ({target}) => this.setState({email: target.value}) } />

                        <PasswordInput
                            id={ 'customerPassword' }
                            label={ 'Password' }
                            value={ this.state.password }
                            onChange={ ({target})=>this.setState({password: target.value}) } />

                    </Fragment>
                } />
        );
    }
}
