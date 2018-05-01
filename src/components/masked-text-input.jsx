import React from 'react';
import MaskedInput from 'react-text-mask';

const width = {
    twoThird: {
        flexBasis: '66.67%',
    },

    oneThird: {
        flexBasis: '33.33%',
    },
};

const container = {
    flexGrow: '1',
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

const expiry = {
    color: '#b8c2cc',
    fontSize: '10px',
};

export default class MaskedTextInput extends React.PureComponent {
    render() {
        const div = Object.assign({}, container, width[this.props.width]);

        return (
            <div style={ div }>
                <label
                    htmlFor={ this.props.id }
                    style={ label } >
                    { this.props.label } { this.props.id.includes('paymentExpiry') && <span style={ expiry }>(MM/YY)</span> }
                </label>

                <MaskedInput
                    id={ this.props.id }
                    value={ this.props.value }
                    mask={ this.props.mask }
                    onChange={ this.props.onChange }
                    required={ !this.props.optional }
                    placeholderChar={ '\u2000' }
                    style={ input }
                />
            </div>
        );
    }
}
