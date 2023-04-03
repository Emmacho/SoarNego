// FolderTreeWrapper.js

import React from "react";
import FolderTree from "react-folder-tree";
import FileContext from "./providers/FileExporerContext.jsx";
import { useContext } from "react";

function FolderTreeWrapper({ fileItems }) {
  const { sendToEditorContentLoader } = useContext(FileContext);

  const handleFileClick = (state, event) => {
    sendToEditorContentLoader(state.nodeData.fileIndex,state.nodeData.fileId);
  };

  return <FolderTree
  data={fileItems}
  onNameClick={handleFileClick}
/>
}

export default FolderTreeWrapper;
