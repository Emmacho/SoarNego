import { createContext,useState, useEffect } from "react";
import { getEditorObject } from "../Editor";

const FileContext = createContext();

export function FileContextProvider({children}){

    const [editorContent, setEditorContent] = useState(
        {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'This is temp text',
                  },
                ],
              },
            ]
          }
    )

    const [fileContentToLoad, SetfileContentToLoad]=useState("Empty")
    const [indexToloadFromFileArrayObj, SetIndexToloadFromFileArrayObj]=useState("kkk")
    const [indexSel, SetIndexSel]=useState(0)
    

    const [dummyIndexSel1, setDummyIndexSel1] = useState(0)
    const [fileIdDataObj, setFileIdDataObj] = useState([])

    const [currentFile, setCurrentFile] = useState('')
    const [fileItems, setFileItems] = useState(
        {
                name: "Root Folder",
                checked: 0,
                isOpen: false, // this folder is opened, we can see it's children
                children: [
                ]
              }
    )
   const[counter, setCounter] = useState(1);

    const addToFileList = (name,checked,isOpen,fileIndex) =>{
        setFileItems({...fileItems,
            children:[...fileItems.children,{name, checked,isOpen,fileIndex}]})
    }

    //Saves file content in the session storage
    //const addFileToSessionStorage = (addFileIndexToStorage, content) =>{
    const readJsonFileContent = (jsonContent, fileIdentifier) =>{
        var partindex = 0
        var artindex = 0
        var secindex = 0
        var paraindex = 0
        var senindex = 0
        var ContractContent= ""
        
       

        
        for (partindex = 0; partindex < jsonContent.Part.length; partindex++)
        {
            //part loop
            ContractContent = ContractContent + jsonContent.Part[partindex].Heading + "/n "
            ContractContent = ContractContent + jsonContent.Part[partindex].Label + "/n "
            
            for (artindex = 0; artindex < jsonContent.Part[partindex].Article.length; artindex++)
            {
                //article loop
                ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Heading + "/n "
                ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Label + "/n "
                
                for (secindex = 0; secindex < jsonContent.Part[partindex].Article[artindex].Section.length; secindex++)
                {
                    //section loop
                    ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Section[secindex].Heading + "/n "
                    ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Section[secindex].Label + "/n "
                    
                    for (paraindex = 0; paraindex < jsonContent.Part[partindex].Article[artindex].Section[secindex].Paragraph.length; paraindex++)       
                    {
                        ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Section[secindex].Paragraph[paraindex].Heading + "/n "
                        ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Section[secindex].Paragraph[paraindex].Label + "/n "
                        ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Section[secindex].Paragraph[paraindex].Body + "/n "
                        //paragraph loop
                        for (senindex = 0; senindex < jsonContent.Part[partindex].Article[artindex].Section[secindex].Paragraph[paraindex].Sentence.length; senindex++)
                        
                        {
                            //sentence loop
                            ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Section[secindex].Paragraph[paraindex].Sentence[senindex].Heading + "/n "
                            ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Section[secindex].Paragraph[paraindex].Sentence[senindex].Label + "/n "
                            ContractContent = ContractContent + jsonContent.Part[partindex].Article[artindex].Section[secindex].Paragraph[paraindex].Sentence[senindex].Content + "/n "
                            
                

                        }
                
                    }
                

                }

            }    
        }
        //populate array that would be used to store all file loaded into the file directory with- File identity and content
        addFileIndexAndContentIntoObject(fileIdentifier,ContractContent)

        // Pass function to populate this object FileIdDataObj

    }
    

    const addFileIndexAndContentIntoObject= (fileId, fileContent )=>{
        
        
        setFileIdDataObj((prevVal)=>{
            
            fileIdDataObj.push( { ...prevVal, fileId: fileId, fileContent: fileContent});
                return fileIdDataObj;
        
        })

        loaderFromFileArrayObj(fileIdDataObj)

    }

    
    

   function filePointer(indexOfFileSel){
    
    SetIndexSel(indexOfFileSel)
    return(indexSel)
   }

    const getFileContent = (fileId) => {
        for (const file of fileIdDataObj) {
            if (file.fileId === fileId) {
                return file.fileContent
            }
        }
        return undefined
    }


    //set determinant
    //set fileContentToEditor
    const loaderFromFileArrayObj = (fileIdDataObj) =>{
        //Create an empty array to hold every file loaded into file tree. This serves like a working database
        let fileData = []
        //add data of the selected file on the file tree to fileData array
        fileData.push(fileIdDataObj) 
        fileData.forEach(function(item, index){    
            if (indexToloadFromFileArrayObj === item[index].fileId ){
                   SetfileContentToLoad(item[index].fileContent)
                }
              })
        
    }


     //Retrieves file content from the session storage
     //Use the index to retrieve from the object fileIdDataObj
        
       if(counter === 1) {
        var sendToEditorContentLoader = function(){};
       }
     
        sendToEditorContentLoader = (editorContentFromFileClick)=>{
            
            const content = getFileContent(editorContentFromFileClick)
    
                const newEditorContent = getEditorObject(content)
                setEditorContent(newEditorContent)
                setCurrentFile(editorContentFromFileClick)
            
            }
          
           
        
        
    return(
        <FileContext.Provider value = {{fileItems,addToFileList, readJsonFileContent, sendToEditorContentLoader, editorContent, currentFile, filePointer }}>
            {children}
        </FileContext.Provider>

    )
}

export default FileContext