import React from 'react';

const container = {
    color: '#606f7b',
    display: 'flex',
    flexBasis: '100%',
};

const loadingState = {
    opacity: '0.5',
};

const input = {
    background: '#f1f5f8',
    borderRadius: '50%',
    marginBottom: '8px',
    marginRight: '12px',
    outline: 'none',
    height: '20px',
    width: '20px',
};

export default class RadioInput extends React.PureComponent {
    render() {
        const label = this.props.isLoading ? Object.assign({}, container, loadingState) : container;

        return (
            <label style={ label }>
                <input
                    type="radio"
                    name={ this.props.name }
                    value={ this.props.value }
                    checked={ this.props.checked }
                    disabled={ this.props.isLoading }
                    onChange={ this.props.onChange }
                    style={ input } />
                { this.props.label }
            </label>
        );
    }
}
