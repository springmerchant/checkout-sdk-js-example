import React from 'react';

const div = {
    backgroundColor: '#fcebea',
    borderLeft: '4px solid #cc1f1a',
    color: '#cc1f1a',
    flexBasis: '100%',
    padding: '12px',
    marginBottom: '24px',
    marginLeft: '12px',
    marginRight: '12px',
};

const header = {
    fontWeight:'600',
    marginBottom: '4px',
};

export default class Alert extends React.PureComponent {
    render() {
        return (
            <div style={ div }>
                <div style={ header } >
                    An error has occurred
                </div>

                <div>
                    { this.props.body }
                </div>
            </div>
        );
    }
}
