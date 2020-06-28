import {$add, $get} from 'plow-js';
import TableStyles from './plugins/tableStyles';

const addPlugin = (Plugin, isEnabled) => (ckEditorConfiguration, options) => {
    if (!isEnabled || isEnabled(options.editorOptions, options)) {
        ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
        return $add('plugins', Plugin, ckEditorConfiguration);
    }

    return ckEditorConfiguration;
};

export default (ckEditorRegistry, presetConfiguration) => {
    const config = ckEditorRegistry.get('config');
    config.set('tableStyles', addPlugin(TableStyles(presetConfiguration), $get('tableStyles')));

    return config;
};
