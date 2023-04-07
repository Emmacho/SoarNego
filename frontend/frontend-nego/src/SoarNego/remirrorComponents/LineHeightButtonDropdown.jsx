import { useCommands,CommandButtonGroup,CommandMenuItem } from "@remirror/react";
import { DropdownButton} from "@remirror/react";
export const LineHeightButtonDropdown = () => {
    const { setLineHeight } = useCommands();
    return (
      <CommandButtonGroup>
        <DropdownButton aria-label='Line height' icon='lineHeight'>
          <CommandMenuItem
            commandName='setLineHeight'
            onSelect={() => setLineHeight(1)}
            enabled={setLineHeight.enabled(1)}
            label='Narrow'
          />
          <CommandMenuItem
            commandName='setLineHeight'
            onSelect={() => setLineHeight(2)}
            enabled={setLineHeight.enabled(2)}
            label='Wide'
          />
        </DropdownButton>
      </CommandButtonGroup>
    );
  };

  /*This class uses the dropdown in order to allow us to select if we would like our lines to be single or double spaced in terms of formatting. */