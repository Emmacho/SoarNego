/**
 * In this file, the SeePrevious component fetches a list of files 
 * from the server and allows the user to compare the difference between 
 * the current file and a selected file from the list using the HTMLDiff component. 
 * The FileContext and ShowDiffContext are used to access the current file and the 
 * visibility state of the SeePrevious component, 
 * respectively. The fetchFileList 
 * function fetches the list of files 
 * and updates the component state, while 
 * handleFileSelect handles the user's selection of a file from the list.
*/
import { useState, useEffect, useContext } from "react";
import ShowDiffContext from "./providers/ShowDiffContext";
import FileContext from "./providers/FileExporerContext";
import axios from "axios";
/** @library https://github.com/bem/html-differ*/
import HTMLDiff from "./HTMLdiff";

// The SeePrevious component is responsible for fetching a list of files
// and displaying the difference between a selected file and the current file
export const SeePrevious = () => {
  // Initialize state for the list of files and the selected file from the list
  const [fileList, setFileList] = useState([]);
  const selectedFile = useContext(FileContext);
  const { showDiff } = useContext(ShowDiffContext);
  const [selectedListFile, setSelectedListFile] = useState(null);

  // Store the content of the current file
  var left;
  if (selectedFile) {
    left = selectedFile.editorContent;
  }

  // Fetch the list of files from the server
  async function fetchFileList() {
    try {
      const response = await axios.get("http://localhost:8080/api/get/all-files");
      const files = response.data;
      
      // Filter out the current file from the list
      if (Array.isArray(files) && selectedFile) {
        const filteredFiles = files.filter((file) => file.fileId !== selectedFile.currentFileId);
        setFileList(filteredFiles);
      } else {
        setFileList(Array.isArray(files) ? files : []);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }

  // Fetch the list of files whenever the selected file changes
  useEffect(() => {
    fetchFileList();
  }, [selectedFile]);

  // Handle the selection of a file from the list
  const handleFileSelect = (event) => {
    const selectedFileName = event.target.value;
    const selectedFileObject = fileList.find(file => file.fileName === selectedFileName);
    if (selectedFileObject) {
      setSelectedListFile(selectedFileObject.fileContent);
    }
  };

  return (
    <div>
      {showDiff && (
        <>
          {/* Render the file selector and display the list of files */}
          <select onChange={handleFileSelect}>
            <option value="">Select a file</option>
            {fileList.map((file) => (
              <option key={file.id} value={file.id}>
                {file.fileName}
              </option>
            ))}
          </select>
          {/* Render the HTML difference between the current file and the selected file */}
          <div
            style={{
              height: "800px",
              textAlign: "left",
            }}
          >
            {selectedFile && selectedListFile && (
              <HTMLDiff left={left} right={selectedListFile} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
