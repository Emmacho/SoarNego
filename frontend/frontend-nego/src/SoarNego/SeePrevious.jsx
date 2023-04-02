/*Import necessary modules from React
Import a function called "getCurrFile" from a file called "Editor"
Import a module called "jsondiffpatch-for-react"
Import two context objects called "ShowDiffContext" and "FileContext" from respective files
Import an Axios library*/ 
import { useState, useEffect, useContext } from "react";
import { getCurrFile } from "./Editor"
import JsonDiffReact from 'jsondiffpatch-for-react';
import ShowDiffContext from './ShowDiffContext';
import FileContext from "./providers/FileExporerContext";
import axios from "axios";
import { Fab } from "@mui/material";

/*Create a function called "compareJson" which takes in two objects "left" and "right" along with a callback function called "setDelta".
 This function uses the "jsondiffpatch" library to compare the two objects and updates the "delta" state by calling "setDelta" with the resulting delta*/ 
const compareJson = (left, right, setDelta) => {
  const jsondiffpatch = require('jsondiffpatch').create({
    objectHash: (obj) => obj._id || obj.id,
    arrays: {
      detectMove: true,
      includeValueOnMove: true,
    },
    textDiff: {
      minLength: 60,
    },
  });

  const delta = jsondiffpatch.diff(left, right);

  setDelta(delta);
};


export const SeePrevious = () => {//Define a functional component called "SeePrevious"
  const [fileList, setFileList] = useState([]);//Use the "useState" hook to initialize a state variable called "fileList" and set its initial value to an empty array
  const selectedFile = useContext(FileContext)//Use the "useContext" hook to get the value of "selectedFile" from the "FileContext"
  const [delta, setDelta] = useState(null);//Use the "useState" hook again to initialize a state variable called "delta" and set its initial value to null
  const { showDiff } = useContext(ShowDiffContext);//Use the "useContext" hook again to get the value of "showDiff" from the "ShowDiffContext"
  const [selectedListFile, setSelectedListFile] = useState(null);//Use the "useContext" hook again to get the value of "showDiff" from the "ShowDiffContext"
  

  var left//Define a variable called "left" but do not assign it a value yet
  
/*Use an "if" statement to check if "selectedFile" is not null. 
If it is not null, assign the "editorContent" property of "selectedFile" to the "left" variable
Define an asynchronous function called "fetchFileList" which makes an HTTP GET request to a URL and sets the "fileList" state variable to the response data.
If there is an error, log it to the console */
  if (selectedFile) {
    left = selectedFile.editorContent
  }
  
  async function fetchFileList() {
    try {
      const response = await axios.get("http://localhost:8080/api/get/all-files");
      const files = response.data;
  
      if (Array.isArray(files) && selectedFile) {
        
        console.log(selectedFile.currentFileId)
        const filteredFiles = files.filter((file) => file.fileId !== selectedFile.currentFileId);
        setFileList(filteredFiles);
      } else {
        setFileList(Array.isArray(files) ? files : []);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }
  

  useEffect(() => {//Use the "useEffect" hook to call "fetchFileList" once when the component is mounted
    fetchFileList();
    
  }, [selectedFile]);

  /**Use the "useEffect" hook again to watch for changes in the "showDiff", "delta", "left", and "selectedFile" variables. 
 * If "showDiff" is true and "delta" and "left" are not null and "selectedFile" is not null,
 * call the "compareJson" function with the "left" variable and the "selectedListFile" variable and pass in the "setDelta" function 
 * to update the "delta" state variable */
  useEffect(() => {

    if (showDiff && !delta && left && selectedFile) {

      compareJson(left, selectedListFile, setDelta);
    }

  }, [showDiff, delta, left, selectedFile]);

  /**Define a function called "handleFileSelect" which takes in an event parameter. 
   * This function gets the selected file name from the event,
   * finds the corresponding object in the "fileList" array, and sets its "fileContent" property to the "selectedListFile" state variable */

  const handleFileSelect = (event) => {

    const selectedFileName = event.target.value;
    const selectedFileObject = fileList.find(file => file.fileName === selectedFileName);
    if (selectedFileObject) {
      
      setSelectedListFile(JSON.parse(selectedFileObject.fileContent));
    }
  };


/*
*If "showDiff" is true, render a select element that has an "onChange" event listener that calls the "handleFileSelect" function. 
 * Inside the select element, map through the "fileList" array and render an option element for each file.
 * Also render a div element with some CSS styles that display the JSON diff using the "JsonDiffReact" component if "selectedFile" and "delta" and "left" are all not null.
 * Pass in the "left", "selectedListFile", "delta", and "jsondiffpatch" props to the "JsonDiffReact" component. */

  return (
    <div>
      {showDiff && (
        <>
          <select onChange={handleFileSelect}>
            <option value="">Select a file</option>
            {fileList.map((file) => (
              <option key={file.id} value={file.id}>
                {file.fileName}
              </option>
            ))}


          </select>
          <div style={
            {
              height: "800px",
              textAlign: "left",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word"
            }
          }>
            {selectedFile && delta && (
              <JsonDiffReact
                left={left}
                right={selectedListFile}
                delta ={delta}
                jsondiffpatch={{
                  objectHash: (obj) => obj._id || obj.id,
                  arrays: {
                    detectMove: true,
                    includeValueOnMove: true,
                  },
                  textDiff: {
                    minLength: 60,
                  },
                }}

              />
            )}
          </div>
        </>
      )}
    </div>
  );
}



