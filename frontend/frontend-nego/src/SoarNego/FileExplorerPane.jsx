
import React from 'react'
import SoarNegoDataService from "../api/SoarNego/SoarNegoDataService.js"
import {useState, useEffect} from "react"
import axios from "axios";

// to be implemented in replacement of react-d3-tree 
import FolderTree, {testData} from "react-folder-tree";
import 'react-folder-tree/dist/style.css';
import FileContext from "./providers/FileExporerContext.jsx";
import { useContext } from "react";
 

 function  Explorer(){

    const {fileItems, sendToEditorContentLoader,  } = useContext(FileContext)
    const {addToFileList, readJsonFileContent, filePointerContext} = useContext(FileContext)
    var {filePointer} = useContext(FileContext)

    const {editorContent} = useContext(FileContext)
    const id = Math.floor(Math.random() * 1000)

    
    //Future enhancement is to be able to read multiple files at a time
    
    const [fileList, setfileList] = useState([]);
    
    const treObjHolder = []
    const [selFileName, setSelFileName] = useState('');
    
   
    const [content, setContent] = useState('');
    
    let fileReader

   useEffect(() => {
     //These variables are called in useEffect to synchronize re-rendering of file retrieved data       
    const dummyRerender1= selFileName
    const dummyRerender2= content
    const dummytreObjHolder= treObjHolder

  });
    
    const handleClick = (event) => {
        //Initialize to '' so that when same file is clicked, OnChange will capture the event and chenge of file selection
        event.target.value = ''
    }
  
    const handleFileRead = (e) => {
        
        setContent(fileReader.result)
    }


    const handleFileClick = (state, event)=>{
        //sending the file content to a context function API that saves it in the session storage 
        filePointer(state.nodeData._id)
        sendToEditorContentLoader(state.nodeData.fileIndex)
        //console.log("Content sent to loader", state.nodeData.fileIndex)
        //console.log("File pointer is inside", filePointer)

    }
//May have to comment "handleFileChosen" function after loading JSON file works, works for laoding .txt
        // const handleFileChosen = (file) => {
        //     fileReader = new FileReader();

        //     const fileName = file.name

        //     const onLoaded = () => {
        //         const fileContent = fileReader.result
        //         const fileData = {
        //             fileId: 1,
        //             fileName,
        //             fileContent
        //         } 
        //         if (!fileData.fileName || !fileData.fileContent) return
        //         axios.post('http://localhost:8080/api/save/files',fileData)
        //         .then(function (response){
        //             addToFileList(response.data.fileName, 0,true,response.data.fileName+response.data.fileId)
        //             addFileToSessionStorage(response.data.fileName+response.data.fileId, response.data.fileContent)
        //         })
                
        //         .catch(function(error){
        //         console.log(error)
        //         })   
        //     }
            
        //     fileReader.onloadend = onLoaded;
        //     fileReader.readAsText(file)
            
        
        // } function PasswordField() {

        //const handleFileChosenJSON = (file) => {
        function handleFileChosenJSON (file) {
            fileReader = new FileReader();

            const fileName = file.name
            const fileId = fileName + id 

            const onLoaded = () => {
                const fileContent = fileReader.result  
               //console.log(fileData)
               
               const FileObjectDetails = JSON.parse(fileContent)
               readJsonFileContent(FileObjectDetails,fileId )
               addToFileList(fileName, 0,true,fileId)

            }
            
            fileReader.onloadend = onLoaded;
            fileReader.readAsText(file)
        
        }
        //console.log("File pointer is ", filePointer)

    return(
        <>  

                        <div>
                            <label>Load a File</label>
                            {
                            /* uncomenting next line works fine for loading .txt file
                            <input type="file" onChange={e => handleFileChosen(e.target.files[0])}  onClick = {handleClick } name="fileLoader" id="myFile" accept=".txt" ></input> */}
                            <input type="file" onChange={e => handleFileChosenJSON(e.target.files[0])}  onClick = {handleClick } name="fileLoader" id="myFile" accept=".json" ></input>

                        </div>
                       

            <div>
                
                   
            </div>
          
            
            {/* TODO: to uncomment and populate the tree after reading JSON file dynamically */}
            <FolderTree
                data={ fileItems}
                onNameClick ={handleFileClick}
                
               
                />

                

            
        
        </>

        
    )
}
export default Explorer;



