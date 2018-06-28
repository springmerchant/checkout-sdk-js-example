import React, { Fragment } from 'react';
import Alert from '../components/Alert/alert';
import RadioContainer from '../components/RadioContainer/radio-container';
import Section from '../components/Section/section';
import PaymentMethod from './PaymentMethod/payment-method';

export default class Payment extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            paymentData: {},
            methodId: null,
            gatewayId: null,
        };
    }

    componentDidUpdate() {
        this.props.onChange(this.state);
    }

    render() {
        return (
            <Section
                header={ 'Payment' }
                body={
                    <Fragment>
                        { this.props.errors &&
                            <Alert body={ this.props.errors.message } />
                        }

                        <RadioContainer
                            label={ 'Payment Method' }
                            body={ this.props.methods.map(method => (
                                <PaymentMethod
                                    key={ method.id }
                                    method={ method }
                                    selected={ this.state.methodId }
                                    onClick={ () => this._onMethodSelect(method.id, method.gateway) }
                                    onChange={ (paymentData) => this.setState({ paymentData }) } />
                            )) } />
                    </Fragment>
                } />
        );
    }

    _onMethodSelect(id, gateway) {
        this.setState({
            methodId: id,
            gatewayId: gateway,
        });

        this.props.onClick(id, gateway);
    }
}
