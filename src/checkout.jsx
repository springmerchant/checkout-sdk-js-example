import React from 'react';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import { formatMoney } from 'accounting';
import LoadingModal from "./components/loading-modal";
import SubmitButton from "./components/submit-button";
import Cart from './cart';
import Customer from './customer';
import Shipping from './shipping';
import Billing from './billing';
import Payment from './payment';

const main = {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    padding: '32px 250px',
};

const container = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px #0000002e',
    flex: '1',
    marginRight: '20px',
    padding: '20px',
};

const actionContainer = {
    padding: '24px',
};

export default class Checkout extends React.PureComponent {
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

        this.state = {
            isFirstLoad: true,
        };
    }

    componentDidMount() {
        Promise.all([
            this.service.loadCheckout(),
            this.service.loadShippingCountries(),
            this.service.loadShippingOptions(),
            this.service.loadBillingCountries(),
            this.service.loadPaymentMethods(),
        ]).then(() => this.setState({ isFirstLoad: false }));

        this.unsubscribe = this.service.subscribe((state) => {
            this.setState(state);
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { checkout, errors, statuses } = this.service.getState();

        if (this.state.isFirstLoad) {
            return (
                <LoadingModal />
            );
        }

        return (
            <main style={ main }>
                <div style={ container }>
                    <form onSubmit={ (event) => this._submitOrder(event) }>
                        <Customer
                            customer={ checkout.getCustomer() }
                            errors={ errors.getSignInError() }
                            onChange={ (customer) => this.setState({ customer }) } />

                        <Shipping
                            address={ checkout.getShippingAddress() }
                            countries={ checkout.getShippingCountries() }
                            options={ checkout.getShippingOptions() }
                            selectedOptionId={ checkout.getSelectedShippingOption() ? checkout.getSelectedShippingOption().id : '' }
                            isSelectingShippingOption ={ statuses.isSelectingShippingOption() }
                            isUpdatingShippingAddress={ statuses.isUpdatingShippingAddress() }
                            onChange ={ (shippingAddress) => this.setState({ shippingAddress }) }
                            onSelect={ (addressId, optionId) => this.service.selectShippingOption(addressId, optionId) }
                            onAddressChange={ (address) => this.service.updateShippingAddress(address) } />

                        <Payment
                            methods={ checkout.getPaymentMethods() }
                            errors={ errors.getSubmitOrderError() }
                            onChange={ (payment) => this.setState({ payment }) }
                            onClick={ (name, gateway) => this.service.initializePaymentMethod(name, gateway) } />

                        <Billing
                            address={ checkout.getBillingAddress() }
                            countries={ checkout.getBillingCountries() }
                            onChange ={ (billingAddress) => this.setState({ billingAddress }) }
                            onSelect ={ (billingAddressSameAsShippingAddress) => this.setState({ billingAddressSameAsShippingAddress })  } />

                        <div style={ actionContainer }>
                            <SubmitButton
                                label={ statuses.isSubmittingOrder() ? 'Placing your order...' : `Pay ${ formatMoney((checkout.getCart()).grandTotal.amount) }` }
                                isLoading={ statuses.isSubmittingOrder() }/>
                        </div>
                    </form>
                </div>

                <Cart
                    cart={ checkout.getCart() }
                    cartLink={ (checkout.getConfig()).storeConfig.links.cartLink } />
            </main>
        );
    }

    _submitOrder(event) {
        event.preventDefault();

        let billingAddressPayload = this.state.billingAddressSameAsShippingAddress ? this.state.shippingAddress : this.state.billingAddress;

        let { payment } = this.state;

        Promise.all([
            this.service.signInCustomer(this.state.customer),
            this.service.updateShippingAddress(this.state.shippingAddress),
            this.service.updateBillingAddress(billingAddressPayload),
        ])
            .then(() => this.service.submitOrder({ payment }))
            .then(({ checkout }) => {
                const { storeConfig } = checkout.getConfig();
                window.location.href = storeConfig.links.orderConfirmationLink;
            });
    }
}
