import React from 'react';
import styles from './loading-state.scss';

export default class LoadingState extends React.PureComponent {
    render() {
        return (
            <div className={ styles.container }>
                Loading...
            </div>
        );
    }
}
