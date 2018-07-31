import React, { Fragment } from 'react';
import { find } from 'lodash';
import Section from '../components/Section/section';
import ShippingToggle from './shipping-toggle';
import SingleShipping from './single-shipping'
import MultiShipping from './multi-shipping'

export default class Shipping extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            multiShipping: (this.props.consignments || []).length > 1,
        };
    }

    render() {
        return (
            <Section header={ 'Shipping' } body={
                <Fragment>
                    {
                        this._hasSavedAddresses() &&
                        this._hasMultiplePhysicalItems() &&
                        <ShippingToggle
                            onChange={ (value) => this._toggleMultiShipping(value) }
                            multiShipping={ this.state.multiShipping } />
                    }
                    {
                        this.state.multiShipping ?
                        <MultiShipping
                            customer={ this.props.customer }
                            consignments={ this.props.consignments }
                            cart={ this.props.cart }
                            isUpdatingConsignment={ this.props.isUpdatingConsignment }
                            isCreatingConsignments={ this.props.isCreatingConsignments }
                            isSelectingShippingOption={ this.props.isSelectingShippingOption }
                            cart={ this.props.cart }
                            onConsignmentUpdate={ this.props.onConsignmentUpdate }
                        /> :
                        <SingleShipping
                            countries={ this.props.countries }
                            address={ this.props.address }
                            onAddressChange={ this.props.onAddressChange }
                            selectedOptionId={ this.props.selectedOptionId }
                            options={ this.props.options }
                            isUpdatingShippingAddress={ this.props.isUpdatingShippingAddress }
                            isSelectingShippingOption={ this.props.isSelectingShippingOption }
                            onSelect={ this.props.onShippingOptionChange }
                        />
                    }
                </Fragment>
            } />
        );
    }

    _toggleMultiShipping(multiShipping) {
        this.setState({ multiShipping });
    }

    _hasSavedAddresses() {
        return this.props.customer.addresses &&
            this.props.customer.addresses.length > 1;
    }

    _hasMultiplePhysicalItems() {
        return this.props.cart.lineItems.physicalItems.length > 1;
    }
}
