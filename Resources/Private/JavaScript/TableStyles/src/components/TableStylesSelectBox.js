import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SelectBox} from '@neos-project/react-ui-components';
import {connect} from 'react-redux';
import {$transform} from 'plow-js';
import {selectors} from '@neos-project/neos-ui-redux-store';
import * as CkEditorApi from '@neos-project/neos-ui-ckeditor5-bindings';

@connect($transform({
    formattingUnderCursor: selectors.UI.ContentCanvas.formattingUnderCursor
}))

export default class TableStylesSelectBox extends PureComponent {
    static propTypes = {
        presetConfiguration: PropTypes.shape({
            label: PropTypes.string.isRequired,

            options: PropTypes.objectOf(PropTypes.shape({
                label: PropTypes.string.isRequired,
                cssClass: PropTypes.string.isRequired
            }))
        }),
        formattingUnderCursor: PropTypes.object
    };

    constructor(...args) {
        super(...args);
        this.handleOnSelect = this.handleOnSelect.bind(this);
    }

    render() {
        const selectOptions = Object.entries(this.props.presetConfiguration.options)
            .map(([optionIdentifier, optionConfiguration]) => ({
                value: optionIdentifier,
                label: optionConfiguration.label
            }));

        if (selectOptions.length === 0) {
            return null;
        }

        const currentValue = this.props.formattingUnderCursor.tableStyles;

        return (
            <SelectBox
                options={selectOptions}
                value={currentValue}
                allowEmpty={true}
                placeholder={this.props.presetConfiguration.label}
                onValueChange={this.handleOnSelect}
            />
        );
    }

    handleOnSelect(option) {
        CkEditorApi.executeCommand('tableStyles', {value: option});
    }
}
