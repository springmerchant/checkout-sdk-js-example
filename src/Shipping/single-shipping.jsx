import React, { Fragment } from 'react';
import { debounce } from 'lodash';
import Address from '../components/Address/address';
import ShippingOptions from './shipping-options';

export default class SingleShipping extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            address: {},
        };

        this._debouncedOnAddressChange = debounce(() => this.props.onAddressChange(this.state.address), 1000);
    }

    componentDidMount() {
        this.props.onAddressChange(this.props.address);
        this.setState({ address: this.props.address || {} });
    }

    render() {
        return (
            <Fragment>
                <Address
                    name={ 'shipping' }
                    address={ this.state.address }
                    countries={ this.props.countries }
                    onChange={ (fieldName, address) => this._onChange(fieldName, address) } />
                <ShippingOptions
                    options={ this.props.options }
                    selectedOptionId={ this.props.selectedOptionId }
                    isSelectingShippingOption={ this.props.isSelectingShippingOption() }
                    isUpdatingShippingAddress={ this.props.isUpdatingShippingAddress() }
                    onSelect={ this.props.onSelect }
                />
            </Fragment>
        );
    }

    _onChange(fieldName, value) {
        const address = Object.assign(
            {},
            this.state.address,
            { [fieldName]: value }
        );

        this.setState({ address: address }, () => this._updateShippingAddress(fieldName));
    }

    _updateShippingAddress(fieldName) {
        if (this._shouldUpdateShippingAddress(fieldName)) {
            this._debouncedOnAddressChange();
        }
    }

    _isFormValid() {
        return this.state.address.firstName &&
            this.state.address.lastName &&
            this.state.address.address1 &&
            this.state.address.city &&
            this.state.address.postalCode &&
            (
                this.state.address.stateOrProvinceCode ||
                this.state.address.stateOrProvince
            ) &&
            this.state.address.countryCode &&
            this.state.address.phone;
    }

    _shouldUpdateShippingAddress(fieldName) {
        const shippingOptionUpdateFields = [
            'address1',
            'address2',
            'city',
            'postalCode',
            'stateOrProvince',
            'stateOrProvinceCode',
            'countryCode',
        ];

        if (!this._isFormValid()) {
            return false;
        }

        return (
            !this.props.options ||
            !this.props.options.length ||
            shippingOptionUpdateFields.includes(fieldName)
        );
    }
}
