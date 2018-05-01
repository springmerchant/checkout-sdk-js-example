import React from 'react';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import { formatMoney } from 'accounting';
import LoadingState from './components/loading-state';
import SubmitButton from './components/submit-button';
import Billing from './billing';
import Cart from './cart';
import Customer from './customer';
import CustomerForm from './customer-form';
import Payment from './payment';
import Shipping from './shipping';

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

        this.service = createCheckoutService();

        this.state = {
            isFirstLoad: true,
            isPlacingOrder: false,
            isSigningIn: false,
        };
    }

    componentDidMount() {
        Promise.all([
            this.service.loadConfig(),
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
                <LoadingState />
            );
        }

        if (this.state.isSigningIn) {
            return (
                <div style={ main }>
                    <div style={ container }>
                        <CustomerForm
                            errors={ errors.getSignInError() }
                            onClose={ () => this.setState({ isSigningIn: false }) }
                            signIn={ (customer) => this.service.signInCustomer(customer) }
                            isSigningIn={ statuses.isSigningIn() } />
                    </div>
                </div>
            );
        }

        return (
            <main style={ main }>
                <div style={ container }>
                    <form onSubmit={ (event) => this._submitOrder(event, checkout.getCustomer().isGuest) }>
                        <Customer
                            customer={ checkout.getCustomer() }
                            onChange={ (customer) => this.setState({ customer }) }
                            onClick={ () => this.setState({ isSigningIn: true }) }
                            signOut={ () => this.service.signOutCustomer() }
                            isSigningOut={ statuses.isSigningOut() } />

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
                            onClick={ (name, gateway) => this.service.initializePayment({ methodId: name, gatewayId: gateway }) } />

                        <Billing
                            address={ checkout.getBillingAddress() }
                            countries={ checkout.getBillingCountries() }
                            onChange ={ (billingAddress) => this.setState({ billingAddress }) }
                            onSelect ={ (billingAddressSameAsShippingAddress) => this.setState({ billingAddressSameAsShippingAddress })  } />

                        <div style={ actionContainer }>
                            <SubmitButton
                                label={ this.state.isPlacingOrder && (statuses.isSigningIn() || statuses.isUpdatingShippingAddress() || statuses.isUpdatingBillingAddress() || statuses.isSubmittingOrder()) ?
                                    'Placing your order...' : `Pay ${ formatMoney((checkout.getCart()).grandTotal.amount) }` }
                                isLoading={ this.state.isPlacingOrder && (statuses.isSigningIn() || statuses.isUpdatingShippingAddress() || statuses.isUpdatingBillingAddress() || statuses.isSubmittingOrder()) }/>
                        </div>
                    </form>
                </div>

                <Cart
                    cart={ checkout.getCart() }
                    cartLink={ (checkout.getConfig()).links.cartLink } />
            </main>
        );
    }

    _submitOrder(event, isGuest) {
        event.preventDefault();

        this.setState({ isPlacingOrder: true });

        let billingAddressPayload = this.state.billingAddressSameAsShippingAddress ? this.state.shippingAddress : this.state.billingAddress;

        let { payment } = this.state;

        Promise.all([
            isGuest ? this.service.signInCustomer(this.state.customer) : Promise.resolve(),
            this.service.updateShippingAddress(this.state.shippingAddress),
            this.service.updateBillingAddress(billingAddressPayload),
        ])
            .then(() => this.service.submitOrder({ payment }))
            .then(({ checkout }) => {
                window.location.href = checkout.getConfig().links.orderConfirmationLink;
            })
            .catch(() => this.setState({ isPlacingOrder: false }));
    }
}
