import React, { Fragment } from 'react';
import Section from "./components/section";
import Address from './shipping-address';
import EmptyState from "./components/empty-state";
import RadioContainer from "./components/radio-container";
import RadioInput from "./components/radio-input";

export default class Shipping extends React.PureComponent {
    render() {
        return (
            <Section
                header={ 'Shipping' }
                body={
                    <Fragment>
                        <Address
                            address={ this.props.address }
                            countries={ this.props.countries }
                            hasShippingOptions={ !!this.props.options[this.props.address.id] }
                            onChange={ (address) => this.props.onChange(address) }
                            onAddressChange={ (address) => this.props.onAddressChange(address) } />

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
}
