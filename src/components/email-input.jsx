import React from 'react';

const div = {
    flexBasis: '50%',
    marginBottom: '12px',
    paddingLeft: '12px',
    paddingRight: '12px',
};

const label = {
    color: '#606f7b',
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.3px',
    marginBottom: '4px',
    textTransform: 'uppercase',
};

const input = {
    backgroundColor: '#f1f5f8',
    border: 'none',
    borderRadius: '4px',
    color: '#606f7b',
    height: '36px',
    padding: '8px 12px',
    width: '100%',
};

export default class EmailInput extends React.PureComponent {
    render() {
        return (
            <div style={ div }>
                <label
                    htmlFor={ this.props.id }
                    style={ label } >
                    { this.props.label }
                </label>

                <input
                    type="email"
                    id={ this.props.id }
                    value={ this.props.value }
                    required
                    onChange={ this.props.onChange }
                    style={ input } />
            </div>
        );
    }
}
