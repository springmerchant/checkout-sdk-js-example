import React, { Fragment } from 'react';
import { debounce } from 'lodash';
import Address from './components/address';
import EmptyState from './components/empty-state';
import RadioContainer from './components/radio-container';
import RadioInput from './components/radio-input';
import Section from './components/section';

export default class Shipping extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            address: {
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
            },
        };

        this._debouncedOnAddressChange = debounce(() => this.props.onAddressChange(this.state.address), 1000);
    }

    componentDidMount() {
        if (this.props.address !== this.state.address) {
            this.setState({ address: this.props.address });
        }
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
                                    { !this.props.options[this.props.address.id] &&
                                        <EmptyState
                                            body={ 'Sorry, there is no available shipping option.' }
                                            isLoading={ this.props.isUpdatingShippingAddress } />
                                    }

                                    { this.props.options[this.props.address.id] && (this.props.options[this.props.address.id]).map(option => (
                                        <RadioInput
                                            key={ option.id }
                                            name={ 'shippingOption' }
                                            value={ option.id }
                                            checked={ this.props.selectedOptionId === option.id }
                                            label={ `${ option.description } - ${ option.formattedPrice }` }
                                            isLoading={ this.props.isSelectingShippingOption || this.props.isUpdatingShippingAddress }
                                            onChange={ () => this.props.onSelect(this.props.address.id, option.id) } />
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

        this.setState({ address: address });

        if (this._shouldUpdateShippingAddress(fieldName)) {
            this._debouncedOnAddressChange();
        }
    }

    _isFormValid() {
        return this.state.address.firstName &&
            this.state.address.lastName &&
            this.state.address.addressLine1 &&
            this.state.address.city &&
            this.state.address.postCode &&
            (this.state.address.provinceCode || this.state.address.province) &&
            this.state.address.countryCode &&
            this.state.address.phone;
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

        return (!this.props.options[this.props.address.id] || shippingOptionUpdateFields.includes(fieldName));
    }
}
