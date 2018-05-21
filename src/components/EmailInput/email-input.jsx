import React from 'react';
import InputContainer from '../InputContainer/input-container'
import styles from './email-input.scss';

export default class EmailInput extends React.PureComponent {
    render() {
        return (
            <InputContainer
                id={ this.props.id }
                label={ this.props.label }
                width={ this.props.width }
                body={
                    <input
                        type="email"
                        id={ this.props.id }
                        value={ this.props.value || '' }
                        required
                        onChange={ this.props.onChange }
                        className={ styles.input } />
                } />
        );
    }
}
