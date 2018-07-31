import React, { Fragment } from 'react';
import Address from '../components/Address/address';
import RadioContainer from '../components/RadioContainer/radio-container';
import RadioInput from '../components/RadioInput/radio-input';
import Section from '../components/Section/section';

export default class Billing extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            address: {},
            sameAsShippingAddress: true,
        };
    }

    componentDidMount() {
        this.setState({ address: this.props.address || {} });
        this.setState({ sameAsShippingAddress: this.props.sameAsShippingAddress });
    }

    componentDidUpdate() {
        this.props.onChange(this.state.address);
        this.props.onSelect(this.state.sameAsShippingAddress);
    }

    render() {
        return (
            <Section
                header={ 'Billing' }
                body={
                    <Fragment>
                        { !this.props.multishipping &&
                        <RadioContainer
                            label={ 'Billing Address' }
                            body={
                                <Fragment>
                                    <RadioInput
                                        name={ 'sameAsShippingAddress' }
                                        label={ 'Same as shipping address' }
                                        value={ 'true' }
                                        checked={ this.state.sameAsShippingAddress }
                                        onChange={ ({ target }) => this._onSelect(target.value) } />

                                    <RadioInput
                                        name={ 'sameAsShippingAddress' }
                                        label={ 'Use a different billing address' }
                                        value={ 'false' }
                                        checked={ !this.state.sameAsShippingAddress }
                                        onChange={ ({ target }) => this._onSelect(target.value) } />
                                </Fragment>
                            } />
                        }
                        { (
                            this.state.sameAsShippingAddress === false ||
                            this.props.multishipping
                        ) &&
                            <Address
                                name={ 'billing' }
                                address={ this.state.address }
                                countries={ this.props.countries }
                                onChange={ (fieldName, address) => this._onChange(fieldName, address) } />
                        }
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
    }

    _onSelect(value) {
        const actualValue = (value === 'true');

        this.setState({ sameAsShippingAddress: actualValue });
    }
}
