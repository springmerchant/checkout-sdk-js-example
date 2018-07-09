import React, { Fragment } from 'react';
import { formatMoney } from 'accounting';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import Panel from '../components/Panel/panel';
import SubmitButton from '../components/SubmitButton/submit-button';
import Billing from '../Billing/billing';
import Cart from '../Cart/cart';
import Customer from '../Customer/customer';
import LoginPanel from '../LoginPanel/login-panel';
import Payment from '../Payment/payment';
import Shipping from '../Shipping/shipping';
import Layout from './Layout/layout';
import LoadingState from './LoadingState/loading-state';
import styles from './checkout.scss';

export default class Checkout extends React.PureComponent {
    constructor(props) {
        super(props);

        this.service = createCheckoutService();

        this.state = {
            isFirstLoad: true,
            isPlacingOrder: false,
            showSignInPanel: false,
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
                <Layout body={
                    <LoadingState />
                } />
            );
        }

        if (this.state.showSignInPanel) {
            return (
                <Layout body={
                    <LoginPanel
                        errors={ errors.getSignInError() }
                        isSigningIn={ statuses.isSigningIn() }
                        onClick={ (customer) => this.service.signInCustomer(customer)
                            .then(() => this.service.loadShippingOptions())
                        }
                        onClose={ () => this.setState({ showSignInPanel: false }) } />
                } />
            );
        }

        return (
            <Layout body={
                <Fragment>
                    <div className={ styles.body }>
                        <Panel body={
                            <form onSubmit={ (event) => this._submitOrder(event, checkout.getCustomer().isGuest) }>
                                <Customer
                                    customer={ checkout.getCustomer() }
                                    billingAddress={ checkout.getBillingAddress() }
                                    isSigningOut={ statuses.isSigningOut() }
                                    onClick={ () => this.service.signOutCustomer()
                                        .then(() => this.service.loadShippingOptions()) }
                                    onChange={ (customer) => this.setState({ customer }) }
                                    onSignIn={ () => this.setState({ showSignInPanel: true }) } />

                                <Shipping
                                    address={ checkout.getShippingAddress() }
                                    countries={ checkout.getShippingCountries() }
                                    options={ checkout.getShippingOptions() }
                                    selectedOptionId={ checkout.getSelectedShippingOption() ? checkout.getSelectedShippingOption().id : '' }
                                    isSelectingShippingOption ={ statuses.isSelectingShippingOption() }
                                    isUpdatingShippingAddress={ statuses.isUpdatingShippingAddress() }
                                    onChange ={ (shippingAddress) => this.setState({ shippingAddress }) }
                                    onSelect={ (optionId) => this.service.selectShippingOption(optionId) }
                                    onAddressChange={ (address) => this.service.updateShippingAddress(address) } />

                                <Payment
                                    errors={ errors.getSubmitOrderError() }
                                    methods={ checkout.getPaymentMethods() }
                                    onClick={ (name, gateway) => this.service.initializePayment({ methodId: name, gatewayId: gateway }) }
                                    onChange={ (payment) => this.setState({ payment }) } />

                                <Billing
                                    address={ checkout.getBillingAddress() }
                                    countries={ checkout.getBillingCountries() }
                                    sameAsShippingAddress={ (this.state.billingAddressSameAsShippingAddress === undefined) || this.state.billingAddressSameAsShippingAddress }
                                    onChange ={ (billingAddress) => this.setState({ billingAddress }) }
                                    onSelect ={ (billingAddressSameAsShippingAddress) => this.setState({ billingAddressSameAsShippingAddress })  } />

                                <div className={ styles.actionContainer }>
                                    <SubmitButton
                                        label={ this.state.isPlacingOrder && (statuses.isSigningIn() || statuses.isUpdatingShippingAddress() || statuses.isUpdatingBillingAddress() || statuses.isSubmittingOrder()) ? 'Placing your order...' : `Pay ${ formatMoney((checkout.getCheckout()).grandTotal) }` }
                                        isLoading={ this.state.isPlacingOrder && (statuses.isSigningIn() || statuses.isUpdatingShippingAddress() || statuses.isUpdatingBillingAddress() || statuses.isSubmittingOrder()) } />
                                </div>
                            </form>
                        } />
                    </div>

                    <div className={ styles.side }>
                        <Cart
                            checkout={ checkout.getCheckout() }
                            cartLink={ (checkout.getConfig()).links.cartLink } />
                    </div>
                </Fragment>
            } />
        );
    }

    _submitOrder(event, isGuest) {
        event.preventDefault();

        this.setState({ isPlacingOrder: true });

        let billingAddressPayload = this.state.billingAddressSameAsShippingAddress ? this.state.shippingAddress : this.state.billingAddress;

        let { payment } = this.state;

        Promise.all([
            isGuest ? this.service.continueAsGuest(this.state.customer) : Promise.resolve(),
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
