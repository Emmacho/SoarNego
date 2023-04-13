// src/SeePrevious.js
import { useState, useEffect, useContext } from "react";
import ShowDiffContext from "./providers/ShowDiffContext";
import FileContext from "./providers/FileExporerContext";
import axios from "axios";
import HTMLDiff from "./HTMLdiff";
// import { WysiwygToolbar } from "@remirror/react";
export const SeePrevious = () => {
  const [fileList, setFileList] = useState([]);
  const selectedFile = useContext(FileContext);
  const { showDiff } = useContext(ShowDiffContext);
  const [selectedListFile, setSelectedListFile] = useState(null);

  var left;

  if (selectedFile) {
    left = selectedFile.editorContent;
  }

  async function fetchFileList() {
    try {
      const response = await axios.get("http://localhost:8080/api/get/all-files");
      const files = response.data;

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

  useEffect(() => {
    fetchFileList();
  }, [selectedFile]);

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
          <select onChange={handleFileSelect}>
            <option value="">Select a file</option>
            {fileList.map((file) => (
              <option key={file.id} value={file.id}>
                {file.fileName}
              </option>
            ))}
          </select>
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
