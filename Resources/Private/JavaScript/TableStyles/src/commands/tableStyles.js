import {Command} from 'ckeditor5-exports';
import {findAncestor} from '@ckeditor/ckeditor5-table/src/commands/utils';

export default class TableStylesCommand extends Command {
    refresh() {
        const table = this.getTable();

        this.isEnabled = Boolean(table);

        if (table) {
            this.value = (table.getAttribute('class') === 'table') ? undefined : table.getAttribute('class');
        }
    }

    execute(options = {}) {
        const cssClass = (options.value) ? options.value : 'table';

        this.editor.model.change(writer => {
            writer.setAttribute('class', cssClass, this.getTable());
        });
    }

    getTable() {
        const position = this.editor.model.document.selection.getFirstPosition();
        return findAncestor('table', position);
    }
}
