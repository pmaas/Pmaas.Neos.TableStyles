import {$get} from 'plow-js';
import TableStylesSelectBox from './components/TableStylesSelectBox';

export default (ckEditorRegistry, presetConfiguration) => {
    const richtextToolbar = ckEditorRegistry.get('richtextToolbar');

    richtextToolbar.set('tableStyles', {
        component: TableStylesSelectBox,
        isVisible: (editorOptions, formattingUnderCursor) => $get('insideTable', formattingUnderCursor),
        isActive: $get('tableStyles'),
        presetConfiguration
    }, 'before tableColumn');

    return richtextToolbar;
};
