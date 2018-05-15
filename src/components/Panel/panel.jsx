import React from 'react';
import styles from './panel.scss';

export default class Panel extends React.PureComponent {
    render() {
        return (
            <div className={ styles.container }>
                { this.props.body }
            </div>
        );
    }
}
