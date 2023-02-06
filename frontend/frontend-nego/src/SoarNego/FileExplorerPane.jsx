import React from "react"
import HelloWorldService from "../api/SoarNego/HelloWorldService.js"
import SoarNegoDataService from "../api/SoarNego/SoarNegoDataService.js"
import {useState, useEffect} from "react"
import axios from "axios";
import Tree from "react-d3-tree";
// to be implemented in replacement of react-d3-tree 
import FolderTree from "react-folder-tree";
import 'react-folder-tree/dist/style.css';




function Explorer(){
    
    //Future enhancement is to be able to read multiple files at a time
    
    const [fileList, setfileList] = useState([]);
    const [soarNegoDir, setSoarNegoDir] = useState(
        {
        name: "Root",
        children: [
        {
            name: "First File",
            attributes: {
            department: "Testing",
            }
        
        }
        ]
    })
    const treObjHolder = []
    const [selFileName, setSelFileName] = useState('');
    const [fileIndex, setfileIndex] = useState([]);
    const [content, setContent] = useState('');
    const [treeElemetLoaded, setTreeElemetLoaded] = useState(false);
    let fileReader
    
 //Sample of a function to load hardcoded data from backend   
  // function handleWorkFileDir(){
    // SoarNegoDataService.retrieveAllFiles()
    // .then(
    //     response => {
    //         setfileList(response.data)
            
    //     }
    // )
    // .catch()
//   }

   useEffect(() => {
     //These variables are called in useEffect to synchronize re-rendering of file retrieved data       
    const dummyRerender1= selFileName
    const dummyRerender2= content
    const dummytreObjHolder= treObjHolder

  });
    

  
    const handleFileRead = (e) => {
        setContent(fileReader.result)
    }

    const handleFileChosen = (file) => {
        
       

        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file)
        

        setSelFileName(file.name)
       
        const fileData = {
            fileId: 1,
            fileName:file.name,
            fileContent: content
          } 
          if (fileData.fileName !== "" && fileData.fileContent!== "")
          { console.log(fileData)
                axios.post('http://localhost:8080/api/save/files',fileData)
                .then(function (response){
                console.log(response)

                    setSoarNegoDir (prevState=>({...prevState,
                        name: 'File Directory',
                        children: [
                        {
                            name: fileData.fileName,
                            attributes: {
                            department: 'Production',
                            }
                        
                        }
                        ]
                    }))
                    

                })
                // treObjHolder.push(
                //     {name: 'File Directory',
                //     children: [
                //         {
                //             name: fileData.fileName,
                //             attributes: {
                //             department: 'Production',
                //             }
                        
                //         }
                //         ]}
                // )
               
                console.log("Concat arrays",treObjHolder.concat(soarNegoDir))
                console.log("This is it ", treObjHolder)
                setTreeElemetLoaded(true)
                .catch(function(error){
                console.log(error)
                })
                

            }
        
      }

      
   
  
    return(
        <>  

                        <div>
                            <label>Load a File</label>
                            <input type="file" onChange={e => handleFileChosen(e.target.files[0])} name="fileLoader" id="myFile" accept=".json" ></input>
                            

                        </div>
                       

                    <p></p>
                    <p></p>
                       
                   
                    <p></p>
                    <p></p>

                    {/* <div>
                        Click here to to load hardcoded files
                        <button onClick={handleWorkFileDir} className="btn btn-success"> Load Files </button>
                    
                    </div> */}
                
            <p></p>
            <p></p>
            <div>
                
                    {<ul>
                        {fileList.map((f) =>  (<li> { f.fileData} {f.id}</li>
                    
                       
                        
                        ))}

                    </ul>}

            </div>
            <p></p>
            <p></p>
            {treeElemetLoaded && <div id="treeWrapper" style={{ width: '20em', height: '20em' }}>
                            <Tree data={soarNegoDir} />
                                  </div>}

            
        
        </>

        
       
           
        
             
        
        
    )
}
export default Explorer;



