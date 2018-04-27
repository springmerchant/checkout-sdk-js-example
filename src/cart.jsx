import React from 'react';
import { formatMoney } from 'accounting';
import ItemLine from "./components/item-line";

const cart = {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px #0000002e',
};

const cartSection = {
    padding: '24px 20px',
};

const cartHeaderSection = {
    borderBottom: '1px solid #e7e7e7',
    display: 'flex',
    marginBottom: '24px',
    paddingBottom: '12px',
};

const cartHeader = {
    flex: 1,
    fontSize: '24px',
    fontWeight: 500,
};

const cartAction = {
    color: '#84898d',
    fontWeight: '600',
    textTransform: 'uppercase',
    alignSelf: 'flex-end',
};

const orderSummarySection = {
    backgroundColor: '#f1f5f8',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    padding: '12px 20px',
};

const grandtotalContainer = {
    backgroundColor: '#f1f5f8',
    borderTop: '1px solid #e7e7e7',
    display: 'flex',
    padding: '12px 0',
};

const grandtotalLabel = {
    alignSelf: 'center',
    flexGrow: '1',
    fontSize: '20px',
    fontWeight: '600',
};

const grandtotalAmount = {
    fontSize: '24px',
    fontWeight: '700',
};

export default class Cart extends React.PureComponent {
    render() {
        return (
            <div style={ cart }>
                <div style={ cartSection }>
                    <div style={ cartHeaderSection }>
                        <div style={ cartHeader }>
                            Your Order
                        </div>

                        <a href={ this.props.cartLink } style={ cartAction }>
                            Return to cart
                        </a>
                    </div>

                    { (this.props.cart.items || []).map((item) => (
                        <ItemLine
                            key={ item.id }
                            label={ `${ item.quantity } x ${ item.name }` }
                            amount={ formatMoney(item.amountAfterDiscount) }
                            imageUrl={ item.imageUrl }/>
                    )) }
                </div>

                <div style={ orderSummarySection }>
                    <ItemLine
                        label={ 'Subtotal' }
                        amount={ formatMoney(this.props.cart.subtotal.amount) } />

                    <ItemLine
                        label={ 'Shipping' }
                        amount={ formatMoney(this.props.cart.shipping.amount) } />

                    <ItemLine
                        label={ 'Tax' }
                        amount={ formatMoney(this.props.cart.taxTotal.amount) } />

                    <div style={ grandtotalContainer }>
                        <div style={ grandtotalLabel }>
                            Total
                        </div>

                        <div style={ grandtotalAmount }>
                            { formatMoney(this.props.cart.grandTotal.amount) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
