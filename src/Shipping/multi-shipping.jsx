import React, { Fragment } from 'react';
import { find } from 'lodash';
import Consignment from './consignment';

export default class MultiShipping extends React.PureComponent {
    render() {
        return (
            <Fragment>
            {
                (this.props.cart.lineItems.physicalItems || []).map((item) => (
                    <Consignment
                        key={ item.id }
                        item={ item }
                        addresses={ this.props.customer.addresses || [] }
                        isSelectingShippingOption={ () => this._isSelectingShippingOption(item.id) }
                        isUpdatingShippingAddress={ () => this._isUpdatingShippingAddress(item.id) }
                        onConsignmentUpdate={ this.props.onConsignmentUpdate }
                        consignment={ this._findConsignment(item.id) || {} }
                    />
                ))
            }
            </Fragment>
        );
    }

    _isSelectingShippingOption(itemId) {
        const consignment = this._findConsignment(itemId);
        return consignment && this.props.isSelectingShippingOption(consignment.id);
    }

    _isUpdatingShippingAddress(itemId) {
        const consignment = this._findConsignment(itemId);

        return consignment ?
            this.props.isUpdatingConsignment(consignment.id) :
            this.props.isCreatingConsignments();
    }

    _findConsignment(itemId) {
        return find(this.props.consignments, (consignment) => {
            return consignment.lineItemIds.length === 1 &&
                consignment.lineItemIds[0] === itemId;
        });
    }
}
