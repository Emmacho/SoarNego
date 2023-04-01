/* global mammoth */

import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import FileContext from "./providers/FileExporerContext.jsx";
import FolderTreeWrapper from "./FolderTreeWrapper";

export function Explorer() {
  const {
    fileItems,
    sendToEditorContentLoader,
    fetchAllFiles,
    filesLoaded,
    addToFileList,
  } = useContext(FileContext);

  const [content, setContent] = useState("");

  let fileReader;

  const handleClick = (event) => {
    event.target.value = "";
  };

  const handleFileRead = (e) => {
    setContent(fileReader.result);
  };

  const handleFileClick = (state, event) => {
    sendToEditorContentLoader(state.nodeData.fileIndex);
  };

  const handleFileChosen = async (file) => {
    const fileName = file.name;
    
    // Use mammoth (from the window object) to convert .docx to HTML
    const arrayBuffer = await file.arrayBuffer();
    mammoth
      .convertToHtml({ arrayBuffer })
      .then(async (result) => {
        const html = result.value;
        const fileData = {
          fileId: 1,
          fileName,
          fileContent: html,
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
  }, [filesLoaded, fetchAllFiles]);

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
