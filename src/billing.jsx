import React, { Fragment } from 'react';
import RadioContainer from './components/radio-container';
import RadioInput from './components/radio-input';
import Section from './components/section';
import Address from './billing-address';

export default class Billing extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sameAsShippingAddress: true,
        };
    }

    componentDidUpdate() {
        this.props.onSelect(this.state.sameAsShippingAddress);
    }

    render() {
        return (
            <Section
                header={ 'Billing' }
                body={
                    <Fragment>
                        <RadioContainer
                            label={ 'Billing Address' }
                            body={
                                <Fragment>
                                    <RadioInput
                                        name={ 'sameAsShippingAddress' }
                                        value={ 'true' }
                                        checked={ this.state.sameAsShippingAddress }
                                        label={ 'Same as shipping address' }
                                        onChange={ ({ target }) => this._onChange(target.value) } />

                                    <RadioInput
                                        name={ 'sameAsShippingAddress' }
                                        value={ 'false' }
                                        checked={ !this.state.sameAsShippingAddress }
                                        label={ 'Use a different billing address' }
                                        onChange={ ({ target }) => this._onChange(target.value) } />
                                </Fragment>
                            } />

                        { this.state.sameAsShippingAddress === false &&
                            <Address
                                address={ this.props.address }
                                countries={ this.props.countries }
                                onChange={ (address) => this.props.onChange(address) } />
                        }
                    </Fragment>
                } />
        );
    }

    _onChange(value) {
        const actualValue = (value === 'true');

        this.setState({ sameAsShippingAddress: actualValue });
    }
}
