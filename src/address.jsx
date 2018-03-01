import React from 'react';
import { find, isEmpty } from 'lodash';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';

export default class AddressComponent extends React.PureComponent {
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
                postCode: '',
                province: '',
                provinceCode: '',
            },
        };
    }

    componentDidMount() {
        if (this.props.address !== this.state.address) {
            this.setState({ address: this.props.address });
        }
    }

    render() {

        return (
            <div>
                <FormControl>
                    <InputLabel>
                        Country
                    </InputLabel>

                    <Select
                        value={ this.state.address.countryCode || '' }
                        onChange={ this._handleAddressChange('countryCode') }
                        input={ <Input /> }
                        autoComplete="country"
                        native>
                        <option value="" />
                        { (this.props.countries || []).map((country) => (
                            <option
                                value={ country.code }
                                key={ country.code }>
                                { country.name }
                            </option>
                        )) }
                    </Select>
                </FormControl>

                <TextField
                    label="First name"
                    value={ this.state.address.firstName || '' }
                    onChange={ this._handleAddressChange('firstName') }
                    autoComplete="given-name"
                    margin="normal" />

                <TextField
                    label="Last name"
                    value={ this.state.address.lastName || '' }
                    onChange={ this._handleAddressChange('lastName') }
                    autoComplete="family-name"
                    margin="normal" />

                <TextField
                    label="Company name"
                    value={ this.state.address.company || '' }
                    onChange={ this._handleAddressChange('company') }
                    autoComplete="organization"
                    margin="normal" />

                <TextField
                    label="Address line 1"
                    value={ this.state.address.addressLine1 || '' }
                    onChange={ this._handleAddressChange('addressLine1') }
                    autoComplete="address-line1"
                    margin="normal" />

                <TextField
                    label="Address line 2"
                    value={ this.state.address.addressLine2 || '' }
                    onChange={ this._handleAddressChange('addressLine2') }
                    autoComplete="address-line2"
                    margin="normal" />

                <TextField
                    label="City"
                    value={ this.state.address.city || '' }
                    onChange={ this._handleAddressChange('city') }
                    autoComplete="address-level2"
                    margin="normal" />

                <ProvinceField
                    country={ find(this.props.countries, ({ code }) => code === this.state.address.countryCode) }
                    province={ this.state.address.province }
                    provinceCode={ this.state.address.provinceCode }
                    onChange={ this._handleAddressChange('province') }
                    onCodeChange={ this._handleAddressChange('provinceCode') } />

                <TextField
                    label="Postal code"
                    value={ this.state.address.postCode || '' }
                    onChange={ this._handleAddressChange('postCode') }
                    autoComplete="postal-code"
                    margin="normal" />

                <TextField
                    label="Phone"
                    value={ this.state.address.phone || '' }
                    onChange={ this._handleAddressChange('phone') }
                    autoComplete="tel"
                    margin="normal" />
            </div>
        );
    }

    _handleAddressChange(fieldName) {
        return ({ target }) => {
            const address = Object.assign(
                {},
                this.state.address,
                { [fieldName]: target.value },
            );

            this.setState({ address });
            this.props.onChange(address);
        };
    }
}

function ProvinceField(props) {
    if (props.country && !isEmpty(props.country.subdivisions)) {
        return (
            <FormControl>
                <InputLabel>
                    State
                </InputLabel>

                <Select
                    value={ props.provinceCode || '' }
                    onChange={ props.onCodeChange }
                    input={ <Input/> }
                    autoComplete="address-level1"
                    native>
                    <option value="" />
                    { props.country.subdivisions.map((subdivision) => (
                        <option
                            value={ subdivision.code }
                            key={ subdivision.code }>
                            { subdivision.name }
                        </option>
                    )) }
                </Select>
            </FormControl>
        );
    }

    return (
        <TextField
            label="State"
            value={ props.province || '' }
            onChange={ props.onChange }
            autoComplete="address-level1"
            margin="normal" />
    );
}
