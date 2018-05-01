import React, { Fragment } from 'react';
import { find } from 'lodash';
import ProvinceInput from './province-field';
import Select from './select';
import TextInput from './text-input';

export default class Address extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <Select
                    id={ `${ this.props.name }Country` }
                    label={ 'Country' }
                    value={ this.props.address.countryCode }
                    onChange={ ({ target }) => this.props.onChange('countryCode', target.value) }
                    options={ this.props.countries }
                    width={ 'full' } />

                <TextInput
                    id={ `${ this.props.name }FirstName` }
                    label={ 'First Name' }
                    value={ this.props.address.firstName }
                    onChange={ ({ target }) => this.props.onChange('firstName', target.value) }
                    width={ 'half' } />

                <TextInput
                    id={ `${ this.props.name }LastName` }
                    label={ 'Last Name' }
                    value={ this.props.address.lastName }
                    onChange={ ({ target }) => this.props.onChange('lastName', target.value) }
                    width={ 'half' } />

                <TextInput
                    id={ `${ this.props.name }AddressLine1` }
                    label={ 'Address Line 1' }
                    value={ this.props.address.addressLine1 }
                    onChange={ ({ target }) => this.props.onChange('addressLine1', target.value) }
                    width={ 'full' } />

                <TextInput
                    id={ `${ this.props.name }AddressLine2` }
                    label={ 'Address Line 2' }
                    value={ this.props.address.addressLine2 }
                    onChange={ ({ target }) => this.props.onChange('addressLine2', target.value) }
                    optional={ true }
                    width={ 'full' } />

                <TextInput
                    id={ `${ this.props.name }Company` }
                    label={ 'Company' }
                    value={ this.props.address.company }
                    onChange={ ({ target }) => this.props.onChange('company', target.value) }
                    optional={ true }
                    width={ 'full' } />

                <TextInput
                    id={ `${ this.props.name }City` }
                    label={ 'City' }
                    value={ this.props.address.city }
                    onChange={ ({ target }) => this.props.onChange('city', target.value) }
                    width={ 'half' } />

                <ProvinceInput
                    name={ this.props.name }
                    country={ find(this.props.countries, ({ code }) => code === this.props.address.countryCode) }
                    province={ this.props.address.province }
                    provinceCode={ this.props.address.provinceCode }
                    onChange={ ({ target }) => this.props.onChange('province', target.value) }
                    onCodeChange={ ({ target }) => this.props.onChange('provinceCode', target.value) } />

                <TextInput
                    id={ `${ this.props.name }PostCode` }
                    label={ 'Postal Code' }
                    value={ this.props.address.postCode }
                    onChange={ ({ target }) => this.props.onChange('postCode', target.value) }
                    width={ 'oneThird' } />

                <TextInput
                    id={ `${ this.props.name }Phone` }
                    label={ 'Phone' }
                    value={ this.props.address.phone }
                    onChange={ ({ target }) => this.props.onChange('phone', target.value) }
                    width={ 'twoThird' } />
            </Fragment>
        );
    }
}
