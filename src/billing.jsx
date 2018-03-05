import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Address from './address';

export default class BillingComponent extends React.PureComponent {
    render() {
        return (
            <form onSubmit={ (...args) => this._handleSubmit(...args) } noValidate>
                <Typography type="display1" gutterBottom>
                    Billing
                </Typography>

                <Address
                    address={ this.props.address }
                    countries={ this.props.countries }
                    onChange={ (formData) => this._handleAddressChange(formData) } />

                <Button type="submit">
                    Save
                </Button>
            </form>
        );
    }

    _handleAddressChange(address) {
        this._updatedAddress = address;
    }

    _handleSubmit(event) {
        event.preventDefault();

        this.props.onUpdate(this._updatedAddress || this.props.address);
    }
}
