import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import Command from '@ckeditor/ckeditor5-core/src/command';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { add } from '@ckeditor/ckeditor5-utils/src/translation-service';
import '../theme/style.css';

export default class SimpleGrid extends Plugin {
    static get requires() {
        return [ SimpleGridEditing, SimpleGridUI ];
    }
	 
	static get pluginName() {
		return 'SimpleGrid';
	}
}

class SimpleGridUI extends Plugin {
    init() {
        const editor = this.editor;
        const t = editor.t;

        add( 'ru', {
            'Simple Grid': [ 'Колонки' ]
        } );

        // The "simpleGrid" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'simpleGrid', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertSimpleGrid' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t( 'Simple Grid' ),
                withText: false,
                tooltip: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 768 768"><path d="M384 77h269a38 38 0 0 1 38 38v538a38 38 0 0 1-38 38H384a38 38 0 0 0 0 77h269a115 115 0 0 0 115-115V115A115 115 0 0 0 653 0H384a38 38 0 0 0 0 77zm0-77H115A115 115 0 0 0 0 115v538a115 115 0 0 0 115 115h269a38 38 0 0 0 0-77H115a38 38 0 0 1-38-38V115a38 38 0 0 1 38-38h269a38 38 0 0 0 0-77zm-38 38v692a38 38 0 0 0 76 0V38a38 38 0 0 0-76 0z"/></svg>'
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( 'insertSimpleGrid' ) );

            return buttonView;
        } );
    }
}

class SimpleGridEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertSimpleGrid', new InsertSimpleGridCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'simpleGrid', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'simpleGridContent', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleGrid',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'simpleGridContent' ) && childDefinition.name == 'simpleGrid' ) {
                return false;
            }
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <simpleGrid> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleGrid',
            view: {
                name: 'div',
                classes: 'simple-grid'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleGrid',
            view: {
                name: 'div',
                classes: 'simple-grid'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGrid',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'simple-grid' } );

                return toWidget( div, viewWriter, { label: 'Simple Grid widget' } );
            }
        } );

        // <simpleGridContent> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleGridContent',
            view: {
                name: 'div',
                classes: 'simple-grid-content'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleGridContent',
            view: {
                name: 'div',
                classes: 'simple-grid-content'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGridContent',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'simple-grid-content' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}

class InsertSimpleGridCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleGrid>*</simpleGrid> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleGrid( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simpleGrid' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleGrid( writer ) {
    // Define a number of columns in the container.
    const columns = 2;

    const simpleGrid = writer.createElement( 'simpleGrid' );

    for ( let i = 0; i < columns; i++ ) {
        const column = writer.createElement( 'simpleGridContent' );

        writer.append( column, simpleGrid );

        // There must be at least one paragraph for the description to be editable.
        // See https://github.com/ckeditor/ckeditor5/issues/1464.
        writer.appendElement( 'paragraph', column );
    }

    return simpleGrid;
}