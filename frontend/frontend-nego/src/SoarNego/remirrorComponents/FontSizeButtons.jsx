
import {useActive,useCommands,CommandMenuItem,DropdownButton} from '@remirror/react';

// This defines an array of `remirror` extensions that will be used in the editor. Each extension is instantiated as a new object.


const FONT_SIZES = ['8', '10', '12', '14', '16', '18', '24', '30'];


// This defines an array of font sizes that will be used in the editor.


export const FontSizeButtons = () => {
    const { setFontSize } = useCommands();
    const { fontSize } = useActive();
    return (
        <DropdownButton aria-label='Set font size' icon='fontSize'>
            {FONT_SIZES.map((size) => (
                <CommandMenuItem
                    key={size}
                    commandName='setFontSize'
                    onSelect={() => setFontSize(size)}
                    enabled={setFontSize.enabled(size)}
                    active={fontSize({ size })}
                    label={size}
                    icon={null}
                    displayDescription={false}
                />
            ))}
        </DropdownButton>
    );
};
// This defines a custom component called `FontSizeButtons` that renders a dropdown menu of font sizes. 
//It uses the `useCommands` and `useActive` hooks from `remirror` to set and retrieve the font size.
