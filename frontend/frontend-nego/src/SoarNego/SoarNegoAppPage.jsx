import React from 'react';
import '../App.css'
import '../bootstrap.css';
import Split from 'react-split';


//SoarNegoApp implements CKEditor that we are not using anymore
//import SoarNegoApp from './SoarNego/SoarNegoApp';

import BasicExample from './RightPane';
import BasicExample1 from './RightPane';
import Editor from './QuillEditor';
import Features from './FeaturesBar';
import Explorer from './FileExplorerPane';
import PromiseEditor from './PromiseMirrorEditor';
import HeaderComponent from './HeaderComponent';



function SoarNegoAppPage () {
  
  
        return (
          <>
          <HeaderComponent/>
          <div className="SoarNegoAppPage">
            <Split direction = 'vertical' sizes={[10,90]} style={{height: 'calc(100vh - 1rem)'}}>
              <div className="upperPane"> <Features/> </div>
              <Split className="flex" sizes={[15,70,15]}>
                {/* This is component to display working file directory */}
                <div > <Explorer/></div>
                {/* Text editor Component */}
                 {/* Quill component commented below */}
                {/* <div> <Editor/> </div> */}
                <div>  <PromiseEditor/></div>
                {/* Right side pane, meant for display of text processing from the text editor central pane  */}
                <div>  <BasicExample/>
                       <BasicExample1/>
                </div>
                
              </Split>
              
            </Split>
            
          </div>
          </>
           
      
            
        );
    
}

export default SoarNegoAppPage;
