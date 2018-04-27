import React from 'react';

const container = {
    display: 'flex',
    justifyContent: 'center',
};

const div = {
    backgroundColor: '#22292f',
    borderRadius: '4px',
    color: '#f8fafc',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.3px',
    padding: '16px',
};

export default class LoadingModal extends React.PureComponent {
    render() {
        return (
            <div style={ container }>
                <div style={ div }>
                    Loading...
                </div>
            </div>
        );
    }
}
