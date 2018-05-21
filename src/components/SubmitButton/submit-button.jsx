import React from 'react';
import styles from './submit-button.scss';

export default class SubmitButton extends React.PureComponent {
    render() {
        return (
            <button
                type="submit"
                disabled={ this.props.isLoading }
                className={ this.props.isLoading ? `${styles.button} ${styles.loadingState}` : styles.button }>
                { this.props.label }
            </button>
        );
    }
}
