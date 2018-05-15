import React from 'react';
import styles from './item-line.scss';

export default class ItemLine extends React.PureComponent {
    render() {
        return (
            <div className={ styles.container }>
                <div className={ styles.labelContainer }>
                    { this.props.imageUrl &&
                        <img
                            src={ this.props.imageUrl }
                            className={ styles.image }/>
                    }

                    <div className={ styles.label }>
                        { this.props.label }
                    </div>
                </div>

                <div className={ styles.amount }>
                    { this.props.amount }
                </div>
            </div>
        );
    }
}
