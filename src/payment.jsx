import React from 'react';
import { SnackbarContent } from 'material-ui';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Radio from 'material-ui/Radio';
import Typography from 'material-ui/Typography';
import PaymentForm from './payment-form';

export default class PaymentComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            paymentData: {},
            selectedMethodId: null,
            selectedMethodGateway: null,
        };
    }

    render() {
        return (
            <form onSubmit={ (...args) => this._handleSubmit(...args) } noValidate>
                <Typography type="display1" gutterBottom>
                    Payment
                </Typography>

                { this.props.errors &&
                    <SnackbarContent message={ this.props.errors.message } />
                }

                <List>
                    { this.props.methods.map(method => (
                        <ListItem
                            key={ method.id }
                            onClick={ () => this._handleMethodSelect(method.id, method.gateway, method.type) }
                            button>
                            <Radio checked={ this.state.selectedMethodId === method.id } />
                            <ListItemText primary={ method.config.displayName } />
                        </ListItem>
                    )) }
                </List>

                { this.state.shouldShowPaymentForm &&
                    <PaymentForm
                        creditCard={ this.state.paymentData }
                        onChange={ (paymentData) => this.setState({ paymentData }) } />
                }

                <Button type="submit">
                    Submit
                </Button>
            </form>
        );
    }

    _handleMethodSelect(id, gateway, type) {
        this.setState({
            selectedMethodId: id,
            selectedMethodGateway: gateway,
            shouldShowPaymentForm: id && type !== 'PAYMENT_TYPE_OFFLINE',
        });

        this.props.onChange(id, gateway);
    }

    _handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(
            this.state.selectedMethodId,
            this.state.selectedMethodGateway,
            this.state.paymentData,
        );
    }
}
