import React, { Fragment } from 'react';
import { debounce } from 'lodash';
import { formatMoney } from 'accounting';
import Address from '../components/Address/address';
import RadioContainer from '../components/RadioContainer/radio-container';
import RadioInput from '../components/RadioInput/radio-input';
import Section from '../components/Section/section';
import EmptyState from './EmptyState/empty-state';

export default class Shipping extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            address: {
                address1: '',
                address2: '',
                city: '',
                company: '',
                countryCode: '',
                firstName: '',
                lastName: '',
                phone: '',
                postalCode: '',
                stateOrProvince: '',
                stateOrProvinceCode: '',
            },
        };

        this._debouncedOnAddressChange = debounce(() => this.props.onAddressChange(this.state.address), 1000);
    }

    componentDidMount() {
        const address = {
            address1: this.props.address.addressLine1,
            address2: this.props.address.addressLine2,
            city: this.props.address.city,
            company: this.props.address.company,
            countryCode: this.props.address.countryCode,
            firstName: this.props.address.firstName,
            lastName: this.props.address.lastName,
            phone: this.props.address.phone,
            postalCode: this.props.address.postCode,
            stateOrProvince: this.props.address.province,
            stateOrProvinceCode: this.props.address.provinceCode,
        };

        this.setState({ address: address });
    }

    componentDidUpdate() {
        this.props.onChange(this.state.address);
    }

    render() {
        return (
            <Section
                header={ 'Shipping' }
                body={
                    <Fragment>
                        <Address
                            name={ 'shipping' }
                            address={ this.state.address }
                            countries={ this.props.countries }
                            onChange={ (fieldName, address) => this._onChange(fieldName, address) } />

                        <RadioContainer
                            label={ 'Shipping Option' }
                            body={
                                <Fragment>
                                    { this.props.options[this.props.address.id].length === 0 &&
                                        <EmptyState
                                            body={ 'Sorry, there is no available shipping option.' }
                                            isLoading={ this.props.isUpdatingShippingAddress } />
                                    }

                                    { this.props.options[this.props.address.id].length > 0 && (this.props.options[this.props.address.id]).map(option => (
                                        <RadioInput
                                            key={ option.id }
                                            name={ 'shippingOption' }
                                            value={ option.id }
                                            checked={ this.props.selectedOptionId === option.id }
                                            label={ `${ option.description } - ${ formatMoney(option.price) }` }
                                            isLoading={ this.props.isSelectingShippingOption || this.props.isUpdatingShippingAddress }
                                            onChange={ () => this.props.onSelect(option.id) } />
                                    )) }
                                </Fragment>
                            } />
                    </Fragment>
                } />
        );
    }

    _onChange(fieldName, value) {
        const address = Object.assign(
            {},
            this.state.address,
            { [fieldName]: value }
        );

        this.setState({ address: address }, () => { this._updateShippingAddress(fieldName) });
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
            (this.state.address.stateOrProvinceCode || this.state.address.stateOrProvince) &&
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

        return (this.props.options[this.props.address.id].length === 0 || shippingOptionUpdateFields.includes(fieldName));
    }
}
