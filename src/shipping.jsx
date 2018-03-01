import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Address from './address';
import ShippingOptions from './shipping-options';

export default class ShippingComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedOptionId: null,
        };
    }

    componentDidMount() {
        if (this.props.selectedOptionId !== this.state.selectedOptionId) {
            this.setState({ selectedOptionId: this.props.selectedOptionId });
        }
    }

    render() {
        return (
            <form onSubmit={ (...args) => this._handleSubmit(...args) } noValidate>
                <Typography type="display1" gutterBottom>
                    Shipping
                </Typography>

                <Address
                    address={ this.props.address }
                    countries={ this.props.countries }
                    onChange={ (...args) => this._handleAddressChange(...args) } />

                <ShippingOptions
                    address={ this.props.address }
                    options={ this.props.options }
                    selectedOptionId={ this.state.selectedOptionId }
                    onOptionSelect={ (...args) => this._handleOptionSelect(...args) } />

                <Button type="submit">
                    Save
                </Button>
            </form>
        );
    }

    _handleAddressChange(address) {
        this._updatedAddress = address;
    }

    _handleOptionSelect(optionId) {
        this.setState({
            selectedOptionId: optionId,
        });

        this.props.onSelect(this.props.address.id, optionId);
    }

    _handleSubmit(event) {
        event.preventDefault();

        this.props.onUpdate(this._updatedAddress || this.props.address);
    }
}
