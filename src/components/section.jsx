import React from 'react';

const div = {
    borderBottom: '1px solid #e7e7e7',
    display: 'flex',
    padding: '24px',
};

const headerContainer = {
    flex: 1,
    fontSize: '24px',
    fontWeight: 500,
};

const bodyContainer = {
    display: 'flex',
    flex: 2,
    flexFlow: 'row wrap',
    marginLeft: '-12px',
    marginRight: '-12px',
};

export default class Section extends React.PureComponent {
    render() {
        return (
            <div style={ div }>
                <div style={ headerContainer }>
                    { this.props.header }
                </div>

                <div style={ bodyContainer }>
                    { this.props.body }
                </div>
            </div>
        );
    }
}
