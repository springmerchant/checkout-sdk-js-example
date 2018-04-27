import React from 'react';

const width = {
    full: {
        flexBasis: '100%',
    },

    half: {
        flexBasis: '50%',
    },
};

const container = {
    marginBottom: '12px',
    paddingLeft: '12px',
    paddingRight: '12px',
};

const label = {
    color: '#606f7b',
    display: 'block',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.3px',
    marginBottom: '4px',
    textTransform: 'uppercase',
};

const select = {
    backgroundColor: '#f1f5f8',
    border: 'none',
    borderRadius: '4px',
    color: '#606f7b',
    cursor: 'pointer',
    display: 'block',
    height: '36px',
    padding: '8px 12px',
    width: '100%',
};

export default class Select extends React.PureComponent {
    render() {
        const div = Object.assign({}, container, width[this.props.width]);

        return (
            <div style={ div }>
                <label
                    htmlFor={ this.props.id }
                    style={ label } >
                    { this.props.label }
                </label>

                <select
                    id={ this.props.id }
                    value={ this.props.value || '' }
                    onChange={ this.props.onChange }
                    style={ select } >
                    <option value="" />
                    { this.props.options.map((option) => (
                        <option
                            key={ option.code }
                            value={ option.code } >
                            { option.name }
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}
