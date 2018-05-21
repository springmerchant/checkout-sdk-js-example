import React from 'react';
import MaskedTextInput from '../../../components/MaskedTextInput/masked-text-input';
import TextInput from '../../../components/TextInput/text-input';
import styles from './payment-form.scss';

export default class PaymentForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            creditCard: {
                ccNumber: '',
                ccName: '',
                ccCvv: '',
                ccExpiry: {
                    month: '',
                    year: '',
                },
                ccType: '',
            },
            expiry: '',
        };
    }

    render() {
        return (
            <div className={ styles.container }>
                <MaskedTextInput
                    id={ `${ this.props.methodId }-paymentCCNumber` }
                    label={ 'Credit Card Number' }
                    value={ this.state.creditCard.ccNumber }
                    mask={ [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,] }
                    onChange={ ({ target }) => this._onChange('ccNumber', target.value.replace(/\s/g, '')) }
                    width={ 'twoThird' } />

                <MaskedTextInput
                    id={ `${ this.props.methodId }-paymentExpiry` }
                    label={ 'Expiry' }
                    value={ this.state.expiry }
                    mask={ [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/,] }
                    onChange={ ({ target }) => this._onExpiryChange(target.value) }
                    width={ 'oneThird' } />

                <TextInput
                    id={ `${ this.props.methodId }-paymentCCName` }
                    label={ 'Name on card' }
                    value={ this.state.creditCard.ccName }
                    onChange={ ({ target }) => this._onChange('ccName', target.value) }
                    width={ 'twoThird' } />

                <MaskedTextInput
                    id={ `${ this.props.methodId }-paymentCCV` }
                    label={ 'CVV' }
                    value={ this.state.creditCard.ccCvv }
                    optional={ true }
                    mask={ [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,] }
                    onChange={ ({ target }) => this._onChange('ccCvv', target.value.replace(/\s/g, '')) }
                    width={ 'oneThird' } />
            </div>
        );
    }

    _onChange(fieldName, value) {
        const creditCard = Object.assign(
            {},
            this.state.creditCard,
            { [fieldName]: value },
        );

        this.setState({ creditCard });

        this.props.onChange(creditCard);
    }

    _onExpiryChange(value) {
        const [month, year] = value.replace(/\s/g, '').split('/');

        const creditCard = Object.assign(
            {},
            this.state.creditCard,
            {
                ccExpiry: {
                    month,
                    year,
                }
             },
        );

        this.setState({
            creditCard: creditCard,
            expiry: value,
        });

        this.props.onChange(creditCard);
    }
}
