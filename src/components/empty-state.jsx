import React from 'react';

const container = {
    border: '1px solid #e7e7e7',
    borderRadius: '4px',
    color: '#606f7b',
    flexBasis: '100%',
    padding: '16px',
    textAlign: 'center',
};

const loadingState = {
    opacity: '0.5',
};

export default class EmptyState extends React.PureComponent {
    render() {
        const div = this.props.isLoading ? Object.assign({}, container, loadingState) : container;

        return (
            <div style={ div }>
                { this.props.body }
            </div>
        );
    }
}
