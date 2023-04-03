import React, { useEffect } from 'react';
import '../App.css'
import '../bootstrap.css';
import Split from 'react-split';


//SoarNegoApp implements CKEditor that we are not using anymore
//import SoarNegoApp from './SoarNego/SoarNegoApp';

import BasicExample from './RightPane';
import BasicExample1 from './RightPane';
import Features from './FeaturesBar';
import Explorer from './FileExplorerPane';
import HeaderComponent from './HeaderComponent';
import Editor from './Editor';
import { getCurrFile } from './Editor';
import FileContext from './providers/FileExporerContext';
import { useContext } from 'react';
import { SeePrevious } from './SeePrevious';
import { Card } from '@mui/material';
function SoarNegoAppPage () {
  const { selectedFile } = useContext(FileContext);

   
  
        return (
          <>
          
          
          <HeaderComponent/>
          <div className="SoarNegoAppPage">
            
          {selectedFile ? <p>Selected file: {selectedFile}</p> : <p>Select a file</p>}

            <Split direction = 'vertical' sizes={[10,90]} style={{height: 'calc(100vh - 1rem)'}}>

              <div className="upperPane"> <Features/> </div>

              <Split   className="flex" sizes={[15,60,25]}>
                
                {/* This is component to display working file directory */}
                <div style={{overflow:"auto"}}> <Explorer/></div>
                {/* Text editor Component */}
      
               <Editor></Editor>

                {/* Right side pane, meant for display of text processing from the text editor central pane  */}
                <div>  
                  
                  <SeePrevious/>
                    
                 
                  
                       
                </div>
                
              </Split>
              
            </Split>
            
          </div>
          </>
           
      
            
        );
    
}

export default SoarNegoAppPage;
