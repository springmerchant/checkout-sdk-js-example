import React from 'react';

const div = {
    display: 'flex',
    flexFlow: 'row wrap',
    marginBottom: '12px',
    paddingLeft: '12px',
    paddingRight: '12px',
};

const label = {
    color: '#606f7b',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.3px',
    marginBottom: '4px',
    textTransform: 'uppercase',
    display: 'flex',
    alignContent: 'center',
};

export default class RadioContainer extends React.PureComponent {
    render() {
        return (
            <div style={ div }>
                <div style={ label }>
                    { this.props.label }
                </div>

                { this.props.body }
            </div>
        );
    }
}
