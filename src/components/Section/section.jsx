import React from 'react';
import styles from './section.scss';

export default class Section extends React.PureComponent {
    render() {
        return (
            <div className={ styles.section }>
                <div className={ styles.header }>
                    { this.props.header }
                </div>

                <div className={ styles.body }>
                    { this.props.body }
                </div>
            </div>
        );
    }
}
