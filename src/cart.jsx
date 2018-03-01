import React from 'react';
import { formatMoney } from 'accounting';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';

export default class CartComponent extends React.PureComponent {
    render() {
        return (
            <div>
                <Typography type="display1" gutterBottom>
                    Cart
                </Typography>

                <List>
                    { (this.props.cart.items || []).map((item) => (
                        <ListItem key={ item.id }>
                            <Avatar src={ item.imageUrl } />
                            <ListItemText primary={ `${item.quantity} x ${item.name}` } />
                            <ListItemSecondaryAction>
                                { formatMoney(item.amountAfterDiscount) }
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) }

                    <Divider />

                    <ListItem>
                        <ListItemText primary="Subtotal" />
                        <ListItemSecondaryAction>
                            { formatMoney(this.props.cart.subtotal.amount) }
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Shipping" />
                        <ListItemSecondaryAction>
                            { formatMoney(this.props.cart.shipping.amount) }
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Tax" />
                        <ListItemSecondaryAction>
                            { formatMoney(this.props.cart.taxTotal.amount) }
                        </ListItemSecondaryAction>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <ListItemText primary="Total" />
                        <ListItemSecondaryAction>
                            { formatMoney(this.props.cart.grandTotal.amount) }
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>
        );
    }
}
