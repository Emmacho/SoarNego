import { useState, useEffect, useContext } from "react";
import { getCurrFile } from "./Editor"
import JsonDiffReact from 'jsondiffpatch-for-react';
import ShowDiffContext from './ShowDiffContext';
import FileContext from "./providers/FileExporerContext";
import axios from "axios";
import { Fab } from "@mui/material";
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




export const SeePrevious = () => {
  const [fileList, setFileList] = useState([]);
  const selectedFile = useContext(FileContext)
  const [delta, setDelta] = useState(null);
  const { showDiff } = useContext(ShowDiffContext);
  const [selectedListFile, setSelectedListFile] = useState(null);
  

  var left
  

  if (selectedFile) {
    left = selectedFile.editorContent
  }
  
  async function fetchFileList() {
    try {
      const response = await axios.get("http://localhost:8080/api/get/all-files");
      const files = response.data;
      setFileList(Array.isArray(files) ? files : []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }

  useEffect(() => {
    fetchFileList();
    
  }, []);

  useEffect(() => {

    if (showDiff && !delta && left && selectedFile) {

      compareJson(left, selectedListFile, setDelta);
    }

  }, [showDiff, delta, left, selectedFile]);

  const handleFileSelect = (event) => {

    const selectedFileName = event.target.value;
    const selectedFileObject = fileList.find(file => file.fileName === selectedFileName);
    if (selectedFileObject) {
      
      setSelectedListFile(JSON.parse(selectedFileObject.fileContent));
    }
  };




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



