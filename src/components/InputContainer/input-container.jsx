import React from 'react';
import classNames from 'classnames';
import styles from './input-container.scss';

export default class InputContainer extends React.PureComponent {
    render() {
        return (
            <div className={ classNames(styles.container, styles[this.props.width ? this.props.width + 'Width' : 'fullWidth']) }>
                <label
                    htmlFor={ this.props.id }
                    className={ styles.label }>
                    { this.props.label } { this.props.helpText && <span className={ styles.helpText }>({ this.props.helpText })</span> }
                </label>

                { this.props.body }
            </div>
        );
    }
}
