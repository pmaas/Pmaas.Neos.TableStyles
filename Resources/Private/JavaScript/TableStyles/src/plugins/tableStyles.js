import {Plugin} from 'ckeditor5-exports';
import TableStylesCommand from '../commands/tableStyles';

export default presetConfiguration => class TableStyles extends Plugin {
    static get pluginName() {
        return 'TableStyles';
    }

    init() {
        const {editor} = this;
        const options = {...presetConfiguration.options};

        editor.model.schema.extend('table', {
            allowAttributes: 'class'
        });

        // add default class to options
        options.table = {
            cssClass: 'table'
        };

        // model
        const config = {
            model: {
                name: 'table',
                key: 'class',
                values: Object.keys(options)
            },
            view: {}
        };

        // view
        Object.keys(options).forEach(option => {
            config.view[option] = {
                name: 'figure',
                key: 'class',
                value: ['table', options[option].cssClass]
            };
        });

        editor.conversion.attributeToAttribute(config);

        editor.commands.add('tableStyles', new TableStylesCommand(editor));
    }
};
