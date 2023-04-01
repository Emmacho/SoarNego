import React, { useState, useEffect, useContext } from "react";
import { EditorComponent, Remirror, useRemirror,setContent } from '@remirror/react';
import { getCurrFile } from "./Editor"
import JsonDiffReact from 'jsondiffpatch-for-react';
import ShowDiffContext from './ShowDiffContext';
import FileContext from "./providers/FileExporerContext";
import axios from "axios";
import {
  BoldExtension, ItalicExtension, ImageExtension, DropCursorExtension, FontSizeExtension, HeadingExtension, LinkExtension, NodeFormattingExtension,
  BulletListExtension, OrderedListExtension, TaskListExtension, TextHighlightExtension,
} from 'remirror/extensions';

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
  new TaskListExtension(),
  new TextHighlightExtension(),
];
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
  console.log(delta)
  setDelta(delta);
};




export const SeePrevious = () => {
  const [fileList, setFileList] = useState([]);

  const selectedFile = useContext(FileContext)
  const [delta, setDelta] = useState(null);
  const { showDiff } = useContext(ShowDiffContext);
  const [selectedListFile, setSelectedListFile] = useState(null);
  const [content,setContent]= useState([
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Load a file from the right panel',
        },
      ],
    },
  ])

  var left
  

  if (selectedFile) {
    left = selectedFile.editorContent
  }
  
  async function fetchFileList() {
    try {
      const response = await axios.get("http://localhost:8080/api/get/all-files");
      const files = response.data;
      setFileList(files);
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
    console.log(delta)

  }, [showDiff, delta, left, selectedFile]);

  const handleFileSelect = (event) => {

    const selectedFileName = event.target.value;
    const selectedFileObject = fileList.find(file => file.fileName === selectedFileName);
    if (selectedFileObject) {
      
      setSelectedListFile(JSON.parse(selectedFileObject.fileContent));
    }
  };

  
  const { manager, state, onChange } = useRemirror({
    extensions,
    content:{
      type: 'doc',
      content: content
    },
    stringHandler: 'html',
  });

  useEffect(() => {
    if (selectedFile && delta) {
      // const deltaString = JSON.stringify(delta, null, 2);
      
      // const content = delta[0]
      setContent(delta[0]);
      

    }
  }, [delta]);


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
            <div style={{ width: '100%', float: 'right' }}>
              <Remirror manager={manager} autoFocus state={state} onChange={onChange}>
                <EditorComponent />
              </Remirror>
            </div>
          </div>
        </>
      )}
    </div>
  );
}



