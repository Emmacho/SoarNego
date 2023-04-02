//imports 
import { createContext, useState, useCallback } from "react";
import { getEditorObject } from "../Editor";
import axios from "axios";
import { useReducer } from 'react';

const FileContext = createContext(); //The FileContext object is created using createContext(), and exported at the end of the code block.

/**The FileContextProvider component is defined
 * It takes in a single prop, children, which is standard in React for wrapping other components.
 * Inside the FileContextProvider component, several state variables are defined using the useState hook:
 * selectedFile: initially set to null
 * currentFileId: initially set to null
 * filesLoaded: initially set to false
 * editorContent: initially set to an object representing content for an empty document in the editor component.
 */
export function FileContextProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null)
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [editorContent, setEditorContent] = useState(

    {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          "attrs": {
            "nodeIndent": null,
            "nodeTextAlignment": "left",
            "nodeLineHeight": 2,
            "style": "",
            "level": 2
        },
          content: [
            
            {
              type: 'text',
              text: 'Load a file from the right panel',
            },
          ],
        },
      ]
    }

  )
  const [currentFile, setCurrentFile] = useState('')

  const initialState = {
    name: 'Root Folder',
    checked: 0,
    isOpen: true,
    children: [],
    _id: 0,
  };
  // prevents duplicated
  const fileItemsReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_FILE_LIST':
        // Check if file with the same name and fileId already exists in state
        const existingFileIndex = state.children.findIndex(
          (file) => file.name === action.payload.name && file.fileId === action.payload.fileId
        );
        if (existingFileIndex === -1) {
          return {
            ...state,
            children: [...state.children, action.payload],
          };
        } else {
          const newChildren = [...state.children];
          newChildren[existingFileIndex] = action.payload;
          return {
            ...state,
            children: newChildren,
          };
        }
      default:
        return state;
    }
  };
  
  
  const [fileItems, dispatch] = useReducer(fileItemsReducer, initialState);

  /**The addToFileList function uses the useCallback() hook to memoize/copy the function only if fileItems.children changes.
   *  If the same file already exists, it won't add a duplicate to file list. */
  const addToFileList = useCallback(
    (name, checked, isOpen, fileIndex, fileId) => {
      // Check if file with the same name and fileId already exists in state
      const existingFileIndex = fileItems.children.findIndex(
        (file) => file.name === name && file.fileId === fileId
      );
      if (existingFileIndex === -1) {
        dispatch({
          type: 'ADD_TO_FILE_LIST',
          payload: { name, checked, isOpen, fileIndex, fileId },
        });
      }
    },
    [fileItems.children]
  );
  
  
  
  

  //Saves file content in the session storage
  const addFileToSessionStorage = (addFileIndexToStorage, content) => {
    sessionStorage.setItem(addFileIndexToStorage, content);

  }

  //Retrieves file content from the session storage
  const sendToEditorContentLoader = async (editorContentFromFileClick, fileId) => {
    try {
      const url = `http://localhost:8080/api/find/files/${fileId}`;
      const response = await axios.get(url);
      const file = response.data;
      const fileContent = file.fileContent
      const newEditorContent = getEditorObject(fileContent)
      setEditorContent(newEditorContent)
      setCurrentFile(editorContentFromFileClick)
      setCurrentFileId(fileId)
    } catch (error) {
      console.error("Error fetching files:", error);
    }
    
  }
  /**The fetchAllFiles function also uses axios to get all files, which it adds to the file list if they don't already exist.
   * Once the files are loaded, filesLoaded is set to true. */
  const fetchAllFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/get/all-files");
      const files = response.data;
  
      files.forEach((file) => {
        addToFileList(file.fileName, 0, true, file.fileName + file.fileId, file.fileId);
      });
  
      setFilesLoaded(true); // Add this line
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  

  return (
    <FileContext.Provider value={{
      fileItems,
      addToFileList,
      addFileToSessionStorage,
      sendToEditorContentLoader,
      editorContent, 
      currentFile,
      currentFileId,
      selectedFile,
      setSelectedFile,
      fetchAllFiles,
      filesLoaded, // Add this line
      setFilesLoaded,
    }}>
      {children}
    </FileContext.Provider>

  )
}

export default FileContext