import React from 'react';
import styles from './button.scss';

export default class Button extends React.PureComponent {
    render() {
        return (
            <button
                type="button"
                disabled={ this.props.isLoading }
                onClick={ this.props.onClick }
                className={ this.props.isLoading ? `${styles.button} ${styles.loadingState}` : styles.button }>
                { this.props.label }
            </button>
        );
    }
}
