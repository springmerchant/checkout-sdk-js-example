import React from 'react';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';

export default class CheckoutComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.service = createCheckoutService({
            config: {
                bigpayBaseUrl: 'https://bigpay.integration.zone',
                storeHash: '7xcbg28tsc',
                storeId: 12077240,
                storeName: 'robin.ong+1521680812 testsworthy',
            },
        });
    }

    componentDidMount() {
        this.service.loadCheckout()
            .then(({ checkout }) => console.log(checkout.getCart()));
    }

    render() {
        return (
            <section>
                Checkout
            </section>
        );
    }
}
