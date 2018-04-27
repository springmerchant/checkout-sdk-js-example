import React, { Fragment } from 'react';
import { debounce, find } from 'lodash';
import ProvinceInput from "./components/province-field";
import Select from './components/select';
import TextInput from './components/text-input';

export default class ShippingAddress extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            addressLine1: '',
            addressLine2: '',
            city: '',
            company: '',
            countryCode: '',
            firstName: '',
            lastName: '',
            phone: '',
            postCode: '',
            province: '',
            provinceCode: '',
        };

        this._debouncedOnAddressChange = debounce(() => this.props.onAddressChange(this.state), 1000);
    }

    componentDidMount() {
        if (this.props.address !== this.state) {
            this.setState(this.props.address);
        }
    }

    componentDidUpdate() {
        this.props.onChange(this.state);
    }

    render() {
        return (
            <Fragment>
                <Select
                    id={ 'shippingCountry' }
                    label={ 'Country' }
                    value={ this.state.countryCode }
                    onChange={ ({ target }) => this._onChange('countryCode', target.value) }
                    options={ this.props.countries }
                    width={ 'full' } />

                <TextInput
                    id={ 'shippingFirstName' }
                    label={ 'First Name' }
                    value={ this.state.firstName }
                    onChange={ ({ target }) => this._onChange('firstName', target.value) }
                    width={ 'half' } />

                <TextInput
                    id={ 'shippingLastName' }
                    label={ 'Last Name' }
                    value={ this.state.lastName }
                    onChange={ ({ target }) => this._onChange('lastName', target.value) }
                    width={ 'half' } />

                <TextInput
                    id={ 'shippingAddressLine1' }
                    label={ 'Address Line 1' }
                    value={ this.state.addressLine1 }
                    onChange={ ({ target }) => this._onChange('addressLine1', target.value) }
                    width={ 'full' } />

                <TextInput
                    id={ 'shippingAddressLine2' }
                    label={ 'Address Line 2' }
                    value={ this.state.addressLine2 }
                    onChange={ ({ target }) => this._onChange('addressLine2', target.value) }
                    optional={ true }
                    width={ 'full' } />

                <TextInput
                    id={ 'shippingCompany' }
                    label={ 'Company' }
                    value={ this.state.company }
                    onChange={ ({ target }) => this._onChange('company', target.value) }
                    optional={ true }
                    width={ 'full' } />

                <TextInput
                    id={ 'shippingCity' }
                    label={ 'City' }
                    value={ this.state.city }
                    onChange={ ({ target }) => this._onChange('city', target.value) }
                    width={ 'half' } />

                <ProvinceInput
                    name={ 'shipping' }
                    country={ find(this.props.countries, ({ code }) => code === this.state.countryCode) }
                    province={ this.state.province }
                    provinceCode={ this.state.provinceCode }
                    onChange={ ({ target }) => this._onChange('province', target.value) }
                    onCodeChange={ ({ target }) => this._onChange('provinceCode', target.value) } />

                <TextInput
                    id={ 'shippingPostCode' }
                    label={ 'Postal Code' }
                    value={ this.state.postCode }
                    onChange={ ({ target }) => this._onChange('postCode', target.value) }
                    width={ 'oneThird' } />

                <TextInput
                    id={ 'shippingPhone' }
                    label={ 'Phone' }
                    value={ this.state.phone }
                    onChange={ ({ target }) => this._onChange('phone', target.value) }
                    width={ 'twoThird' } />
            </Fragment>
        );
    }

    _onChange(fieldName, value) {
        const address = Object.assign(
            {},
            this.state,
            { [fieldName]: value }
        );

        this.setState(address);

        if (this._shouldUpdateShippingAddress(fieldName)) {
            this._debouncedOnAddressChange();
        }
    }

    _isFormValid() {
        return this.state.firstName &&
            this.state.lastName &&
            this.state.addressLine1 &&
            this.state.city &&
            this.state.postCode &&
            (this.state.provinceCode || this.state.province) &&
            this.state.countryCode &&
            this.state.phone;
    }

    _shouldUpdateShippingAddress(fieldName) {
        const shippingOptionUpdateFields = [
            'addressLine1',
            'addressLine2',
            'city',
            'postCode',
            'province',
            'provinceCode',
            'countryCode',
        ];

        if (!this._isFormValid()) {
            return false;
        }

        return (!this.props.hasShippingOptions || shippingOptionUpdateFields.includes(fieldName));
    }
}
