import React from 'react';
import styles from './layout.scss';

export default class Layout extends React.PureComponent {
    render() {
        return (
            <main className={ styles.main }>
                <div className={ styles.container }>
                    { this.props.body }
                </div>
            </main>
        );
    }
}
