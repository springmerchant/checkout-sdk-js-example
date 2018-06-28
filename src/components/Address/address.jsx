import React, { Fragment } from 'react';
import { find } from 'lodash';
import Dropdown from '../Dropdown/dropdown';
import TextInput from '../TextInput/text-input';
import ProvinceInput from './ProvinceField/province-field';

export default class Address extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <Dropdown
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
                    value={ this.props.address.address1 }
                    onChange={ ({ target }) => this.props.onChange('address1', target.value) }
                    width={ 'full' } />

                <TextInput
                    id={ `${ this.props.name }AddressLine2` }
                    label={ 'Address Line 2' }
                    value={ this.props.address.address2 }
                    onChange={ ({ target }) => this.props.onChange('address2', target.value) }
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
                    stateOrProvince={ this.props.address.stateOrProvince }
                    stateOrProvinceCode={ this.props.address.stateOrProvinceCode }
                    onChange={ ({ target }) => this.props.onChange('stateOrProvince', target.value) }
                    onCodeChange={ ({ target }) => this.props.onChange('stateOrProvinceCode', target.value) } />

                <TextInput
                    id={ `${ this.props.name }PostalCode` }
                    label={ 'Postal Code' }
                    value={ this.props.address.postalCode }
                    onChange={ ({ target }) => this.props.onChange('postalCode', target.value) }
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
