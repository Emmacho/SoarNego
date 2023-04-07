import {useCommands, Button} from '@remirror/react';

export const HighlightButtons = () => {
    const commands = useCommands();
    return (
        <>
            <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commands.setTextHighlight('red')}
            >
                Highlight red
            </button>
            <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commands.setTextHighlight('green')}
            >
                Highlight green
            </button>
            <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commands.removeTextHighlight()}
            >
                Remove
            </button>
        </>
    );
};

/*This code imports the useCommands and Button components from the @remirror/react library. 
It defines a functional component called HighlightButtons. 
This component renders three buttons using the Button component.
Each button has an onMouseDown event handler that prevents the default behavior of the event.
Each button also has an onClick event handler that calls a different method from the commands object, which is obtained by calling the useCommands hook.
These methods are setTextHighlight, which accepts a string parameter representing the color of the highlight, and removeTextHighlight, which removes any existing highlight.
The first two buttons are used to set the highlight color to either red or green, while the third button removes any existing highlight.

*/ 
