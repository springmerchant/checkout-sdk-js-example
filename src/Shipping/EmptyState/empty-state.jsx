import React from 'react';
import styles from './empty-state.scss';

export default class EmptyState extends React.PureComponent {
    render() {
        return (
            <div className={ this.props.isLoading ? `${styles.container} ${styles.loadingState}` : styles.container }>
                { this.props.body }
            </div>
        );
    }
}
