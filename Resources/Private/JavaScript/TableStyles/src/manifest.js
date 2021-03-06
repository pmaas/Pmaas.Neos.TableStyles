import manifest from '@neos-project/neos-ui-extensibility';
import initializeRichtextToolbarRegistry from './manifest.richtextToolbar';
import initializeConfigRegistry from './manifest.config';

manifest('Pmaas.Neos:TableStyles', {}, (globalRegistry, {frontendConfiguration}) => {
    const ckEditorRegistry = globalRegistry.get('ckEditor5');
    const presetConfiguration = frontendConfiguration['Pmaas.Neos:TableStyles'].presets;

    if (presetConfiguration && presetConfiguration.options) {
        initializeRichtextToolbarRegistry(ckEditorRegistry, presetConfiguration);
        initializeConfigRegistry(ckEditorRegistry, presetConfiguration);
    }
});
