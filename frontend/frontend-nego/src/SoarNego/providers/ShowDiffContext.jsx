// This code creates a context using React's createContext function and exports
// a provider component that wraps its child components with the context's value.
import { createContext, useState } from 'react';

// Create a new context for handling the visibility of the differences view
const ShowDiffContext = createContext();

// Define the provider component for the ShowDiffContext
export const ShowDiffProvider = ({ children }) => {
  // The context holds the state of the showDiff variable, which is initially
  // set to false using the useState hook.
  const [showDiff, setShowDiff] = useState(false);

  // The provider component returns the context's provider with the value of an
  // object that contains the current state of showDiff and the function to
  // update it, setShowDiff.
  return (
    <ShowDiffContext.Provider value={{ showDiff, setShowDiff }}>
      {children}
    </ShowDiffContext.Provider>
  );
};

// Export the ShowDiffContext
export default ShowDiffContext;
