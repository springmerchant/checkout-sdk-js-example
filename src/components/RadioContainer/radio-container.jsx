import React from 'react';
import styles from './radio-container.scss';

export default class RadioContainer extends React.PureComponent {
    render() {
        return (
            <div className={ styles.container }>
                <div className={ styles.label }>
                    { this.props.label }
                </div>

                { this.props.body }
            </div>
        );
    }
}
