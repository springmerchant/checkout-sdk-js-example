import React from 'react';

const div = {
    display: 'flex',
    paddingBottom: '12px',
};

const image = {
    border: '1px solid #e7e7e7',
    borderRadius: '8px',
    marginRight: '8px',
    maxHeight: '64px',
    maxWidth: '64px',
};

const label = {
    display: 'flex',
    flex: 1,
};

const itemLabel = {
    alignSelf: 'center',
    fontWeight: '500',
    marginRight: '16px',
};

const amount = {
    alignSelf: 'center',
    fontWeight: '600',
};

export default class ItemLine extends React.PureComponent {
    render() {
        return (
            <div style={ div }>
                <div style={ label }>
                    { this.props.imageUrl &&
                        <img
                            src={this.props.imageUrl}
                            style={image}/>
                    }

                    <div style={ itemLabel }>
                        { this.props.label }
                    </div>
                </div>

                <div style={ amount }>
                    { this.props.amount }
                </div>
            </div>
        );
    }
}
