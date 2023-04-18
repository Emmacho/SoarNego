/**
 * This file sets up the main text editor using the 'remirror' library, including
 * importing necessary components and extensions, defining custom hooks, and 
 * rendering the editor along with its toolbar.
 * @library https://remirror.io/
*/ 

// Import the necessary CSS styles for the remirror library
import 'remirror/styles/all.css';
import { useCallback, useState, useEffect, useContext } from 'react';

// From remirror extensions: https://remirror.io/docs/extensions/
import {
  BoldExtension, ItalicExtension, ImageExtension, DropCursorExtension, FontSizeExtension, HeadingExtension, LinkExtension, NodeFormattingExtension,
  BulletListExtension, OrderedListExtension, TaskListExtension, TextHighlightExtension,
} from 'remirror/extensions';
//from https://remirror.io/docs/
// Import components and hooks from the @remirror/react module
import {
  EditorComponent, ThemeProvider, Remirror, useRemirror, useHelpers, useKeymap, Toolbar, ToggleItalicButton, ToggleBoldButton,
  CommandButtonGroup, DecreaseFontSizeButton, IncreaseFontSizeButton, HeadingLevelButtonGroup, UndoButton, RedoButton,
  TextAlignmentButtonGroup,
  ListButtonGroup, useSetState
} from '@remirror/react';

// Import custom components and hooks
import FileContext from "./providers/FileExporerContext";
import { ToggleListItemExtension } from "./remirrorCustomExtensions/ToggleListItemExtension.jsx"
import { HighlightButtons } from './remirrorComponents/HighlightButtons';
import { FontSizeButtons } from './remirrorComponents/FontSizeButtons';
import { LineHeightButtonDropdown } from './remirrorComponents/LineHeightButtonDropdown';

// Import axios for making HTTP requests and lodash for debounce functionality
import axios from 'axios';
import _ from 'lodash';

// Define the set of extensions to be used in the editor
const extensions = () => [
  new BoldExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new ImageExtension({ enableResizing: true }),
  new DropCursorExtension(),
  new FontSizeExtension({ defaultSize: '16', unit: 'px' }),
  new LinkExtension({ autoLink: true }),
  new BulletListExtension(),
  new OrderedListExtension(),
  new ToggleListItemExtension(),
  new TaskListExtension(),
  new TextHighlightExtension(),
  new NodeFormattingExtension()
];

// Define a custom hook for handling saving content
const hooks = ({ setSaving, state }) => [
  () => {
    const { getHTML } = useHelpers();
    const { currentFile, fileItems } = useContext(FileContext);

    const saveContent = useCallback(async () => {
      setSaving(true); // Indicate that a save is in progress
      const fileItem = fileItems.children.find(item => item.fileIndex === currentFile);
      const fileId = fileItem?.fileId;
      const url = `http://localhost:8080/api/update/files/${fileId}`;
      try {
        const response = await axios.put(url, {
          fileName: fileItem.name,
          fileContent: getHTML(),
        });
        console.log('File saved successfully');
      } catch (error) {
        console.error('Error saving file:', error.message);
      } finally {
        setTimeout(() => {
          setSaving('idle');
        }, 3000); // Reset the saving status to 'idle' after 2 seconds
      }
    }, [getHTML, currentFile, fileItems.children]);

    // Add a 100ms debounce delay to the saveContent function
    const debouncedSaveContent = useCallback(_.debounce(saveContent, 100), [saveContent]);
    useEffect(() => {
      debouncedSaveContent();
    }, [state]);
    const handleSaveShortcut = useCallback(
      async () => {
        await saveContent();
        return true; // Prevents any further key handlers from being

      },
      [debouncedSaveContent],
    );

    // Use the useKeymap hook to bind the handleSaveShortcut function to the 'Mod-s' key combination
    useKeymap('Mod-s', handleSaveShortcut);

    // Save content whenever the editor state changes
    useEffect(() => {
      saveContent();
    },[getHTML]);
  },
];

// Define the SaveButton component
function SaveButton() {
  const { getHTML } = useHelpers();
  const { currentFile, fileItems } = useContext(FileContext);

  const handleClick = useCallback(async () => {

    const fileItem = fileItems.children.find(item => item.fileIndex === currentFile);
    const fileId = fileItem?.fileId;
   // URL below with Spring Boot API endpoint
   const url = `http://localhost:8080/api/update/files/${fileId}`;
   try {
     const response = await axios.put(url, {
       fileName: fileItem.name,
       fileContent: getHTML(),
     });
     console.log('File saved successfully');
     
   } catch (error) {
     console.error('Error saving file:', error.message);
   }
  } 
  
  , [getHTML]);

  return (
    <button onMouseDown={(event) => event.preventDefault()} onClick={handleClick}>
      Save
    </button>
  );
}

// Define the getEditorObject function to parse JSON strings and return objects with a type and content property
export const getEditorObject = (text) => {
  try {
    const parsedText = JSON.parse(text);
    // Check if the parsed object has 'type' and 'content' properties
    if (parsedText.hasOwnProperty('type') && parsedText.hasOwnProperty('content')) {
      return {
        type: parsedText.type,
        content: parsedText.content,
      };
    }
  } catch (error) {
    // If it's not a JSON string, an error will be thrown, and we'll just return the original text as HTML
  }

  return text;
};

var currFile;

export function getCurrFile() {
  return currFile;
}

// Define the main Editor component
export const Editor = () => {
  const { setSelectedFile,editorContent, currentFile } = useContext(FileContext);
  const [file, setFile] = useState(currentFile);
  const [saving, setSaving] = useState(false);

  const { manager, state, setState, onChange } = useRemirror({
    extensions,
    content: editorContent,
    stringHandler: 'html',
  });

  useEffect(() => {
    if (file !== currentFile) {
      manager.view.updateState(manager.createState({ content: editorContent }));
      setFile(currentFile);
      setSelectedFile(currentFile);
      currFile = currentFile;
    }
  }, [currentFile, file]);

  // Render the main editor component, wrapped in a ThemeProvider and a Remirror component
  return (
    <>
      <ThemeProvider>
        <Remirror
          manager={manager}
          state={state}
          hooks={hooks({ setSaving, state })}
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
            <ToggleItalicButton />
            <ToggleBoldButton />
            <HeadingLevelButtonGroup showAll />
            <ListButtonGroup />
            <SaveButton />
            {saving !== 'idle' && (
              <div className="saving-label">
              {saving === 'saving' ? 'Saving...' : 'Saved'}
            </div>)} 
          </Toolbar>
          <EditorComponent />
        </Remirror>
      </ThemeProvider>
    </>
  );
};

export default Editor;