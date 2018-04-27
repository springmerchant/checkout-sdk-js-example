import React, { Fragment } from 'react';
import { isEmpty } from 'lodash';
import Select from './select';
import TextInput from './text-input';

export default class ProvinceInput extends React.PureComponent {
    render() {
        return (
            <Fragment>
                { this.props.country && !isEmpty(this.props.country.subdivisions) ?
                    <Select
                        id={ `${ this.props.name }State` }
                        label={ 'State' }
                        value={ this.props.provinceCode }
                        onChange={ this.props.onCodeChange }
                        options={ this.props.country.subdivisions }
                        width={ 'half' } />
                    :

                    <TextInput
                        id={ `${ this.props.name }State` }
                        label={ 'State' }
                        value={ this.props.province }
                        onChange={ this.props.onChange }
                        width={ 'half' } />
                }
            </Fragment>
        );
    }
}
