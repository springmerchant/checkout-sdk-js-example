import React from 'react';
import styles from './alert.scss';

export default class Alert extends React.PureComponent {
    render() {
        return (
            <div className={ styles.container }>
                <div className={ styles.header }>
                    An error has occurred
                </div>

                <div>
                    { this.props.body }
                </div>
            </div>
        );
    }
}
