import React, { Fragment } from 'react';
import { find } from 'lodash';
import ProvinceInput from "./components/province-field";
import Select from './components/select';
import TextInput from './components/text-input';

export default class BillingAddress extends React.PureComponent {
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
                    id={ 'billingCountry' }
                    label={ 'Country' }
                    value={ this.state.countryCode }
                    onChange={ ({ target }) => this.setState({ countryCode: target.value }) }
                    options={ this.props.countries }
                    width={ 'full' } />

                <TextInput
                    id={ 'billingFirstName' }
                    label={ 'First Name' }
                    value={ this.state.firstName }
                    onChange={ ({ target }) => this.setState({ firstName: target.value }) }
                    width={ 'half' } />

                <TextInput
                    id={ 'billingLastName' }
                    label={ 'Last Name' }
                    value={ this.state.lastName }
                    onChange={ ({ target }) => this.setState({ lastName: target.value }) }
                    width={ 'half' } />

                <TextInput
                    id={ 'billingAddressLine1' }
                    label={ 'Address Line 1' }
                    value={ this.state.addressLine1 }
                    onChange={ ({ target }) => this.setState({ addressLine1: target.value }) }
                    width={ 'full' } />

                <TextInput
                    id={ 'billingAddressLine2' }
                    label={ 'Address Line 2' }
                    value={ this.state.addressLine2 }
                    onChange={ ({ target }) => this.setState({ addressLine2: target.value }) }
                    optional={ true }
                    width={ 'full' } />

                <TextInput
                    id={ 'billingCompany' }
                    label={ 'Company' }
                    value={ this.state.company }
                    onChange={ ({ target }) => this.setState({ company: target.value }) }
                    optional={ true }
                    width={ 'full' } />

                <TextInput
                    id={ 'billingCity' }
                    label={ 'City' }
                    value={ this.state.city }
                    onChange={ ({ target }) => this.setState({ city: target.value }) }
                    width={ 'half' } />

                <ProvinceInput
                    name={ 'billing' }
                    country={ find(this.props.countries, ({ code }) => code === this.state.countryCode) }
                    province={ this.state.province }
                    provinceCode={ this.state.provinceCode }
                    onChange={ ({ target }) => this.setState({ province: target.value }) }
                    onCodeChange={ ({ target }) => this.setState({ provinceCode: target.value }) } />

                <TextInput
                    id={ 'billingPostCode' }
                    label={ 'Postal Code' }
                    value={ this.state.postCode }
                    onChange={ ({ target }) => this.setState({ postCode: target.value }) }
                    width={ 'oneThird' } />

                <TextInput
                    id={ 'billingPhone' }
                    label={ 'Phone' }
                    value={ this.state.phone }
                    onChange={ ({ target }) => this.setState({ phone: target.value }) }
                    width={ 'twoThird' } />
            </Fragment>
        );
    }
}
