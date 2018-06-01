import React, { Fragment } from 'react';
import RadioInput from '../../components/RadioInput/radio-input';
import PaymentForm from './PaymentForm/payment-form';

export default class PaymentMethod extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <RadioInput
                    name={ 'paymentMethod' }
                    value={ this.props.method.id }
                    label={ this.props.method.method === 'paypal' ? 'PayPal' : this.props.method.config.displayName }
                    onChange={ this.props.onClick } />

                { this._shouldShowPaymentForm() &&
                    <PaymentForm
                        methodId={ this.props.method.id }
                        onChange={ this.props.onChange } />
                }
            </Fragment>
        );
    }

    _shouldShowPaymentForm() {
        if (this.props.selected !== this.props.method.id) {
            return false;
        }

        return this.props.method.method === 'credit-card' || this.props.method.method === 'zzzblackhole';
    }
}
