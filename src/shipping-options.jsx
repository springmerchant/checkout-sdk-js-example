import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Radio from 'material-ui/Radio';

export default class ShippingOptionsComponent extends React.PureComponent {
    render() {
        return (
            <List>
                { (this.props.options[this.props.address.id] || []).map(option => (
                    <ListItem
                        key={ option.id }
                        onClick={ () => this.props.onOptionSelect(option.id) }
                        button>
                        <Radio checked={ this.props.selectedOptionId === option.id } />
                        <ListItemText primary={ option.description } />
                    </ListItem>
                )) }
            </List>
        );
    }
}
