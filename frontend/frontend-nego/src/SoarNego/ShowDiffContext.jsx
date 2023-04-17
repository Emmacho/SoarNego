// ShowDiffContext.js
/**This code creates a context using React's createContext function and exports a provider component that wraps its child components with the context's value.  */
import { createContext, useState } from 'react';

const ShowDiffContext = createContext();



export const ShowDiffProvider = ({ children }) => {
  const [showDiff, setShowDiff] = useState(false); //The context holds the state of the showDiff variable, which is initially set to false using the useState hook. 

  //to delete later
  // const addFileToSessionStorage = (addFileIndexToStorage, content) => {
  //   sessionStorage.setItem(addFileIndexToStorage, content);

  // }

  
  function extractPlainTextFromRemirrorJson(json) {
    let plainText = '';
    
    Object.entries(json.content).forEach(([key, value]) => {
      
      if (value.type === 'text') {
        plainText += value.text +' ';
      } else if (value.content) {
        plainText += extractPlainTextFromRemirrorJson(value);
      }
    });
    
    return plainText;
  }


//The provider component returns the context's provider with the value of an object that contains the current state of showDiff and the function to update it, setShowDiff.
  return (
    <ShowDiffContext.Provider value={{ showDiff, setShowDiff, extractPlainTextFromRemirrorJson }}>
      {children}
    </ShowDiffContext.Provider>
  );
};

export default ShowDiffContext;
