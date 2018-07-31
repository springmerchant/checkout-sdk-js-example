import React, { Fragment } from 'react';
import RadioContainer from '../components/RadioContainer/radio-container';
import RadioInput from '../components/RadioInput/radio-input';

const SHIPPING_OPTIONS = [
    {
        id: 'single',
        multiShipping: false,
        label: 'Ship to a single address',
    },
    {
        id: 'multi',
        multiShipping: true,
        label: 'Ship to multiple address',
    }
];

export default class ShippingToggle extends React.PureComponent {
    render() {
        return (
            <RadioContainer
                label={ 'Ship to more than one address?' }
                body={
                    <Fragment>
                        { SHIPPING_OPTIONS.map(option => (
                            <RadioInput
                                key={ option.id }
                                name={ 'shippingToggle' }
                                value={ option.id }
                                checked={ this.props.multiShipping == option.multiShipping }
                                label={option.label}
                                onChange={ () => this._toggle(option.multiShipping) } />
                        )) }
                    </Fragment>
            } />
        );
    }

    _toggle(multiShipping) {
        this.props.onChange(multiShipping);
    }
}
