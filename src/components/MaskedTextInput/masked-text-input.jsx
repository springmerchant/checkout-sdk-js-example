import React from 'react';
import InputContainer from '../InputContainer/input-container'
import MaskedInput from 'react-text-mask';
import styles from './masked-text-input.scss';

export default class MaskedTextInput extends React.PureComponent {
    render() {
        return (
            <InputContainer
                id={ this.props.id }
                label={ this.props.label }
                helpText={ this.props.id.includes('paymentExpiry') ? 'MM/YY' : '' }
                width={ this.props.width }
                body={
                    <MaskedInput
                        id={ this.props.id }
                        value={ this.props.value }
                        mask={ this.props.mask }
                        onChange={ this.props.onChange }
                        required={ !this.props.optional }
                        placeholderChar={ '\u2000' }
                        className={ styles.input }
                    />
                } />
        );
    }
}
