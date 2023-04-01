
import 'remirror/styles/all.css';
import { useCallback, useState, useEffect,useContext } from 'react';
import {
    BoldExtension, ItalicExtension, ImageExtension, DropCursorExtension, FontSizeExtension, HeadingExtension, LinkExtension, NodeFormattingExtension,
    BulletListExtension, OrderedListExtension, TaskListExtension, TextHighlightExtension,EntityReferenceExtension,EntityReferenceMetaData,findMinMaxRange,
} from 'remirror/extensions';
import {
    EditorComponent,ThemeProvider,useActive,Remirror,useRemirror,useCommands,useHelpers,useKeymap,Toolbar,ToggleItalicButton,ToggleBoldButton,
    CommandButtonGroup,DecreaseFontSizeButton,DropdownButton,IncreaseFontSizeButton,HeadingLevelButtonGroup,UndoButton,RedoButton,
    TextAlignmentButtonGroup,
    ListButtonGroup,
} from '@remirror/react';


// The first line imports the CSS styles for the `remirror` library.
// The next few lines import various hooks and components from the `react` and `remirror` libraries.
// The following lines import various extensions from the `remirror/extensions` module.
// The remaining lines import various components and hooks from the `@remirror/react` module.


import FileContext from "./providers/FileExporerContext";

import { ToggleListItemExtension } from "./remirrorCustomExtensions/ToggleListItemExtension.jsx"
import { HighlightButtons} from './remirrorComponents/HighlightButtons';

import { FontSizeButtons } from './remirrorComponents/FontSizeButtons';
import { LineHeightButtonDropdown } from './remirrorComponents/LineHeightButtonDropdown';
// These lines import the `FileContext` and `useContext` hooks from the `react` library, as well as a custom extension called `ToggleListItemExtension`.
import axios from 'axios';


const extensions = () => [
    new BoldExtension(),
    new ItalicExtension(),
    new HeadingExtension(),
    new ImageExtension({ enableResizing: true }),
    new DropCursorExtension(),
    new FontSizeExtension({ defaultSize: '16', unit: 'px' }),
    new LinkExtension({ autoLink: true }),
    new NodeFormattingExtension(),
    new BulletListExtension(),
    new OrderedListExtension(),
    new ToggleListItemExtension(),
    new TaskListExtension(),
    new TextHighlightExtension(),
    
];




const hooks = [
    () => {
        const { getJSON } = useHelpers();
        const {currentFile, fileItems } = useContext(FileContext);
        const handleSaveShortcut = useCallback(
            async ({ state }) => {
              const content = JSON.stringify(getJSON(state));
              
                          
              // Get the fileId from the FileContext
              const fileItem = fileItems.children.find(item => item.fileIndex === currentFile);
              const fileId = fileItem?.fileId;
              console.log('File ID:', fileId);
          
              // Replace the URL below with your Spring Boot API endpoint
              const url = `http://localhost:8080/api/update/files/${fileId}`;
              try {
                const response = await axios.put(url, {
                
                    fileName: currentFile,
                    fileContent: content,
                });
                console.log('File saved successfully');
              } catch (error) {
                console.error('Error saving file:', error.message);
              }
              return true; // Prevents any further key handlers from being run.
            },
            [getJSON, currentFile, fileItems.children],
          
          
        );
        

        useKeymap('Mod-s', handleSaveShortcut);
    },
    ()=>{
        const { getJSON } = useHelpers();
        const {currentFile, fileItems } = useContext(FileContext);const handleSaveAutomatically = useCallback(
        async ({ state }) => {
          const content = JSON.stringify(getJSON(state));
          console.log(`Save to backend: ${content}`);
      
          // Get the fileId from the FileContext
          const fileItem = fileItems.children.find(
            (item) => item.fileIndex === currentFile
          );
          const fileId = fileItem?.fileId;
          console.log('File ID:', fileId);
      
          // Replace the URL below with your Spring Boot API endpoint
          const url = `http://localhost:8080/api/update/files/${fileId}`;
      
          setTimeout(async () => {
            try {
              const response = await axios.put(url, {
                fileName: currentFile,
                fileContent: content,
              });
              console.log('File saved successfully');
            } catch (error) {
              console.error('Error saving file:', error.message);
            }
          }, 1000);
      
          return true; // Prevents any further key handlers from being run.
        },
        [getJSON, currentFile, fileItems.children]
      );
    }
    
];


// This defines an array of hooks that will be used in the editor. The only hook defined here is a custom hook that listens for the `Ctrl/CMD+s` keyboard shortcut and logs the editor's content to the console.


export const getEditorObject = (text) => {
    text = JSON.parse(text)
    return {
        type: text.type,
        content: text.content
    }
};


// This defines a function called `getEditorObject` that takes a JSON string as input, parses it, and returns an object with a `type` and `content` property.

var currFile

export function getCurrFile(){
    
    
    return currFile
}

export const Editor = () => {
    const {setSelectedFile } = useContext(FileContext);
    
    const { editorContent, currentFile } = useContext(FileContext)

    const [file, setFile] = useState(currentFile)

    const html = String.raw; // Just for better editor support



    const { manager, state, onChange } = useRemirror({
        extensions,
        content: editorContent
    });






    useEffect(() => {
        if (file !== currentFile) {
            manager.view.updateState(manager.createState({ content: editorContent }));
            setFile(currentFile)
            setSelectedFile(currentFile);
            currFile = currentFile
        }

    }, [currentFile, file])

    // This is a useEffect hook that listens for changes to the `currentFile` state and updates the editor's content accordingly.

    return (
        <>
            <ThemeProvider>
                <Remirror
                    manager={manager}
                    state={state}
                    hooks={hooks}
                    onChange={onChange}
                >
                    <Toolbar>
                        <UndoButton />
                        <RedoButton />
                        <CommandButtonGroup>
                            <DecreaseFontSizeButton />
                            <FontSizeButtons />
                            <IncreaseFontSizeButton />
                        </CommandButtonGroup>
                        <TextAlignmentButtonGroup />
                        <ToggleItalicButton />
                        <ToggleBoldButton />
                        <LineHeightButtonDropdown/>
                        <HeadingLevelButtonGroup showAll />
                        <ListButtonGroup />
                        <HighlightButtons />
                        

                    </Toolbar>
                    <EditorComponent />
                </Remirror>
            </ThemeProvider>
        </>
    );

};
export default Editor;
// This returns the main editor component, which is wrapped in a `ThemeProvider` and a `Remirror` component. The `Toolbar` component contains various buttons and dropdowns for formatting text, and the `EditorComponent` renders the actual editor.