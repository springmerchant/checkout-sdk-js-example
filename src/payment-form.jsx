import React from 'react';
import TextInput from './components/text-input';

const div = {
    display: 'flex',
    flexFlow: 'row wrap',
    marginLeft: '-12px',
    marginRight: '-12px',
};

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
            expiration: '',
        };
    }

    render() {
        return (
            <div style={ div }>
                <TextInput
                    id={ `${ this.props.methodId }-paymentCCNumber` }
                    label={ 'Credit Card Number' }
                    value={ this.state.creditCard.ccNumber }
                    // onChange={ ({ target }) => this.props.onChange({ ccNumber: target.value }) }
                    onChange={ ({ target }) => this._onChange('ccNumber', target.value) }
                    width={ 'twoThird' } />

                <TextInput
                    id={ `${ this.props.methodId }-paymentExpiration` }
                    label={ 'Expiration' }
                    value={ this.state.expiration }
                    onChange={ ({ target }) => this._onExpiryChange(target.value) }
                    placeholder={ 'MM/YY' }
                    width={ 'oneThird' } />

                <TextInput
                    id={ `${ this.props.methodId }-paymentCCName` }
                    label={ 'Name on card' }
                    value={ this.state.creditCard.ccName }
                    onChange={ ({ target }) => this._onChange('ccName', target.value) }
                    width={ 'twoThird' } />

                <TextInput
                    id={ `${ this.props.methodId }-paymentCCV` }
                    label={ 'CVV' }
                    value={ this.state.creditCard.ccCvv }
                    onChange={ ({ target }) => this._onChange('ccCvv', target.value) }
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

        this.props.onChange(this.state.creditCard);
    }

    _onExpiryChange(value) {
        const [month, year] = value.split('/');

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
            expiration: value,
        });

        this.props.onChange(this.state.creditCard);
    }
}
