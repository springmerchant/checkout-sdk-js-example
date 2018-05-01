import React from 'react';

const container = {
    border: '1px solid #e7e7e7',
    borderRadius: '4px',
    padding: '8px 12px',
};

const loadingState = {
    opacity: '0.5',
};

export default class Button extends React.PureComponent {
    render() {
        const button = this.props.isLoading ? Object.assign({}, container, loadingState) : container;

        return (
            <button
                type="button"
                disabled={ this.props.isLoading }
                onClick={ this.props.onClick }
                style={ button }>
                { this.props.label }
            </button>
        );
    }
}
