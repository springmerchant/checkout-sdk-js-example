import React from 'react';

const container = {
    backgroundColor: '#38c172',
    borderRadius: '4px',
    color: '#f8fafc',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.3px',
    marginRight: '12px',
    padding: '16px',
    width: '100%',
};

const loadingState = {
    opacity: '0.5',
};

export default class SubmitButton extends React.PureComponent {
    render() {
        const button = this.props.isLoading ? Object.assign({}, container, loadingState) : container;

        return (
            <button
                type="submit"
                style={ button }>
                { this.props.label }
            </button>
        );
    }
}
