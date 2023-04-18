/**
 * @Library https://github.com/mwilliamson/mammoth.js/
 */
/* global mammoth */
/** 
 * @Copyright (c) 2013, Michael Williamson
 * All rights reserved.
*/

import React from "react";//Importing the react library, which is needed to create React components.
import { useContext, useState, useEffect } from "react"; //Importing various hooks from the react library, which allow the component to use state and lifecycle methods.
import axios from "axios"; // Importing the axios package, which is used to make HTTP requests.
import FileContext from "./providers/FileExporerContext.jsx"; //Importing a custom context object from FileExporerContext.
import FolderTreeWrapper from "./FolderTreeWrapper";//Importing another custom component from FolderTreeWrapper.

export function Explorer() { //Defining a named function component called Explorer.
  const {
    fileItems,
    sendToEditorContentLoader,
    fetchAllFiles,
    filesLoaded,
    addToFileList,
  } = useContext(FileContext); //Using the useContext hook to get values from the FileContext object.

  const [content, setContent] = useState(""); //Using the useState hook to create a state variable called content and its setter function setContent with initial value "" (an empty string).

  let fileReader; //Defining a variable called fileReader with no initial value.

  const handleClick = (event) => {
    event.target.value = "";  //Defining an arrow function called handleClick that receives an event object as an argument and sets the value of the event.target.value property to an empty string.
  };

  const handleFileRead = (e) => {
    setContent(fileReader.result); //Defining an arrow function called handleFileRead that receives an object as an argument and sets the value of the content state variable to fileReader.result.
  };

/**Defining an arrow function called handleFileClick that receives state and event objects as arguments, 
 * and calls the sendToEditorContentLoader function with the fileIndex property of state.nodeData. */
  const handleFileClick = (state, event) => { 
    sendToEditorContentLoader(state.nodeData.fileIndex); 
  };

  /**Defining an asynchronous arrow function called handleFileChosen that receives a file object as an argument. 
   * This function converts a .docx file to HTML and then sends the resulting data to the server. */
  const handleFileChosen = async (file) => {
    const fileName = file.name;
  
    // Use mammoth (from the window object) to convert .docx to HTML
    const arrayBuffer = await file.arrayBuffer();
    mammoth
    .convertToHtml({ arrayBuffer })
    .then(async (result) => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(result.value, 'text/html');
      
      const head = htmlDoc.querySelector('head');
      if (head) {
        head.remove();
      }
   



      const serializer = new XMLSerializer();
      const modifiedHtml = serializer
        .serializeToString(htmlDoc)
        .replace(/ xmlns="[^"]+"/, "");
        
      console.log(modifiedHtml);
        const fileData = {
          fileId: 1,
          fileName,
          fileContent: modifiedHtml,
        };
  
        if (!fileData.fileName || !fileData.fileContent) return;
        axios
          .post("http://localhost:8080/api/save/files", fileData)
          .then(function (response) {
            addToFileList(
              response.data.fileName,
              0,
              true,
              response.data.fileName,
              response.data.fileId
            );
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("Error converting .docx to HTML:", error);
      });
  };
  
  

  useEffect(() => {
    if (!filesLoaded) {
      fetchAllFiles();
    }
  }, [filesLoaded, fetchAllFiles]);//Using the useEffect hook to fetch files when the page first loads, and every time filesLoaded or fetchAllFiles change.

  /**Returning a fragment of JSX code that includes an input element
   * for loading files and a FolderTreeWrapper component for displaying the file tree. */
  return (
    <>
      <div>
        <label>Load a File</label>
        <input
          type="file"
          onChange={(e) => handleFileChosen(e.target.files[0])}
          onClick={handleClick}
          name="fileLoader"
          id="myFile"
          accept=".docx" // Accept .docx files
        ></input>
      </div>

      <div>
        {filesLoaded ? (
          <FolderTreeWrapper fileItems={fileItems} />
        ) : (
          <p>Loading files...</p>
        )}
      </div>
    </>
  );
}

export default Explorer;
