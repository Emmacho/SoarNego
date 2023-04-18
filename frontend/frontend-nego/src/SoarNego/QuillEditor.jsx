/**
 * @DEPRECIATED
 */

//import React from 'react';
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ContextMenu from "./ContextMenu";
import { SomeComponentAsString } from "./Contract";

//var editor = new quill('.editor'); 

const modules = {
  toolbar: [
    
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};

const formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

//const ReactQuill = require('react-quill');
//const { quill } = ReactQuill;


function Editor() {
  //const editorData = {SomeComponentAsString}
 
  //console.log({SomeComponentAsString})
  const [value, setValue] = useState(SomeComponentAsString);

  const handleChange = (content, delta, source, editor) => {
    //console.log(editor.getHTML()); // html 사용시
    //console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setValue(editor.getHTML());

    
  };

  const [css, setCSS] = useState({display: 'block'})
  const [selectedText, setSelectedText] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const handleChangeSelection =(range, oldRange, source) => {
    //console.log(range)
    //console.log(oldRange)
    //console.log(source)
    //var holder = quill.value
    //console.log("Selection chnaged")
   
    
      if (range) {
        if (range.length === 0) {
          console.log('User cursor is on', range.index);
          setShowMenu(false)
        } else {
          var text = source.getText(range.index, range.length);
          console.log('User has highlighted', text);
          

          const bounds = source.getBounds(range)
          const left = bounds.left + bounds.width/2 - 550
          const top  = bounds.bottom +75
          setShowMenu(true)
          setCSS({'display' : 'inline-block', top: top, left:left, position: 'relative'})
          setSelectedText(text)
      //     left: rangeBounds.left + rangeBounds.width/2 - $('#tooltip-controls').outerWidth()/2,
      // top: rangeBounds.bottom + 10
        }
      } else {
        console.log('Cursor not in the editor');
      }


   

    
    // if (range) {
    //   if (range.start == range.end) {
    //     console.log('User cursor is at index', range.start);
    //   } else {
    //     var text = source.getText(range.start, range.end);
    //     console.log('User has highlighted: ', text);
    //   }
    // } else {
    //   console.log('User cursor is not in editor');
    // }

  };

  

  return (
    <Container>

      {
        showMenu && (
          <ContextMenu css={css} selectedText={selectedText}/>
        )
      }
      

      <ReactQuill
        style={{ height: "750px" }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleChange}
        onChangeSelection={handleChangeSelection}
        
      />
    </Container>
  );
}

const Container = styled.div`
  height: 650px;
  
`;

export default Editor;