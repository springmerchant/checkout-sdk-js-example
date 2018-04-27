import React, { Fragment } from 'react';
import Alert from './components/alert';
import RadioContainer from './components/radio-container';
import Section from './components/section';
import PaymentMethod from './payment-method';

export default class Payment extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            paymentData: {},
            name: null,
            gateway: null,
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
                                    selected={ this.state.name }
                                    onClick={ () => this._onMethodSelect(method.id, method.gateway) }
                                    onChange={ (paymentData) => this.setState({ paymentData }) } />
                            )) } />
                    </Fragment>
                } />
        );
    }

    _onMethodSelect(id, gateway) {
        this.setState({
            name: id,
            gateway: gateway,
        });

        this.props.onClick(id, gateway);
    }
}
