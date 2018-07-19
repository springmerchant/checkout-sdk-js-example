import { find } from 'lodash';
import React from 'react';
import Dropdown from '../components/Dropdown/dropdown';
import ItemLine from "../Cart/ItemLine/item-line";
import ShippingOptions from './shipping-options';
import styles from './consignment.scss';

export default class Consignment extends React.PureComponent {
    constructor(props) {
        super(props);

        const address = this._getCustomerAddress(this.props.address) || {};

        this.state = {
            addressId: (this._getAddress() || {}).id,
            optionId: (this._getOptions() || {}).id,
        };
    }

    render() {
        return (
            <div className={ styles.consignment }>
                <ItemLine
                    label={ `${ this.props.item.quantity } x ${ this.props.item.name }` }
                    imageUrl={ this.props.item.imageUrl }/>
                <Dropdown
                    inline={ true }
                    value={ this.state.addressId }
                    onChange={ ({ target }) => this._selectAddress(target.value) }
                    label='Ships&nbsp;to&nbsp;&nbsp;'
                    id='address'
                    options={ this._formatOptions(this.props.addresses) }
                />
                { this.state.addressId &&
                    <ShippingOptions
                        consignmentId={ this.props.consignment.id }
                        options={ this._getOptions() }
                        selectedOptionId={ this.state.optionId }
                        isSelectingShippingOption={ this.props.isSelectingShippingOption() }
                        isUpdatingShippingAddress={ this.props.isUpdatingShippingAddress() }
                        onSelect={ (optionId) => this._selectOption(optionId) }
                    />
                }
            </div>
        );
    }

    _getOptions() {
        const consignment = this.props.consignment;
        return consignment && consignment.availableShippingOptions;
    }

    _getAddress() {
        const consignment = this.props.consignment;
        return consignment && consignment.shippingAddress;
    }

    _getOption() {
        const consignment = this.props.consignment;
        return consignment && consignment.selectedShippingOption;
    }

    _selectAddress(addressId) {
        this.setState({ addressId }, () => {
            const shippingAddress = find(this.props.addresses, { id: parseInt(addressId) });

            this.props.onConsignmentUpdate({
                id: this.props.consignment.id,
                shippingAddress,
                lineItems: [{
                    itemId: this.props.item.id,
                    quantity: this.props.item.quantity,
                }],
            })
        });
    }

    _selectOption(optionId) {
        this.setState({ optionId }, () => {
            this.props.onConsignmentUpdate({
                id: this.props.consignment.id,
                shippingOptionId: optionId
            });
        });
    }

    _getCustomerAddress(address) {
        return address && find(
            this.props.addresses || [],
            a => this._formatAddress(a) === this._formatAddress(address)
        );
    }

    _formatAddress(address) {
        return `${address.address1} ${address.address2},
            ${address.stateOrProvince}, ${address.country}`;
    }

    _formatOptions(addresses) {
        return addresses.map(address => ({
            name: this._formatAddress(address),
            code: address.id.toString(),
            key: address.id,
            value: address.id.toString(),
        }));
    }
}
