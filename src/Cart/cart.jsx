import React from 'react';
import { formatMoney } from 'accounting';
import ItemLine from "./ItemLine/item-line";
import styles from './cart.scss';

export default class Cart extends React.PureComponent {
    render() {
        return (
            <div className={ styles.container }>
                <div className={ styles.cartContainer }>
                    <div className={ styles.cartHeaderContainer }>
                        <div className={ styles.cartHeader }>
                            Your Order
                        </div>

                        <a href={ this.props.cartLink } className={ styles.cartAction }>
                            Return to cart
                        </a>
                    </div>

                    { ['physicalItems', 'digitalItems', 'giftCertificates'].map((keyType) => (
                        (this.props.checkout.cart.lineItems[keyType] || []).map((item) => (
                            <ItemLine
                                key={ item.id }
                                label={ `${ item.quantity } x ${ item.name }` }
                                amount={ formatMoney(item.extendedSalePrice) }
                                imageUrl={ item.imageUrl }/>
                        ))
                    )) }
                </div>

                <div className={ styles.orderSummaryContainer }>
                    <ItemLine
                        label={ 'Subtotal' }
                        amount={ formatMoney(this.props.checkout.subtotal) } />

                    <ItemLine
                        label={ 'Shipping' }
                        amount={ formatMoney(this.props.checkout.shippingCostTotal) } />

                    <ItemLine
                        label={ 'Tax' }
                        amount={ formatMoney(this.props.checkout.taxTotal) } />

                    <div className={ styles.grandTotalContainer }>
                        <div className={ styles.grandTotalLabel }>
                            Total
                        </div>

                        <div className={ styles.grandTotalAmount }>
                            { formatMoney(this.props.checkout.grandTotal) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
