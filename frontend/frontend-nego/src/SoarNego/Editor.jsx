
import 'remirror/styles/all.css';
import { useCallback,useState, useEffect } from 'react';
import {
  BoldExtension, ItalicExtension, ImageExtension, DropCursorExtension, FontSizeExtension, HeadingExtension, LinkExtension, NodeFormattingExtension,
  BulletListExtension, OrderedListExtension,TaskListExtension
} from 'remirror/extensions';
import {
  EditorComponent,
  ThemeProvider,
  useActive,
  Remirror,
  useRemirror,
  useCommands,
  useHelpers,
  useKeymap,
  Toolbar,
  ToggleItalicButton,
  ToggleBoldButton,
  CommandButtonGroup,
  CommandMenuItem,
  DecreaseFontSizeButton,
  DropdownButton,
  IncreaseFontSizeButton,
  HeadingLevelButtonGroup,
  UndoButton,
  RedoButton,
  TextAlignmentButtonGroup,
  ListButtonGroup
  
} from '@remirror/react';


import FileContext from "./providers/FileExporerContext";
import { useContext } from "react";
import {ToggleListItemExtension} from "./remirrorCustomExtensions/ToggleListItemExtension.jsx"

const extensions = () => [
  new BoldExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new ImageExtension({ enableResizing: true }),
  new DropCursorExtension(),
  new FontSizeExtension({ defaultSize: '16', unit: 'px' }),
  new LinkExtension({ autoLink: true }),
  new NodeFormattingExtension(),
  new BulletListExtension(),
  new OrderedListExtension(),
  new ToggleListItemExtension(),
  new TaskListExtension(),

];

const FONT_SIZES = ['8', '10', '12', '14', '16', '18', '24', '30'];
//Used for handeling Font size Buttons
const FontSizeButtons = () => {
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
//used for saving to .JSON
const hooks = [
  () => {
    const { getJSON } = useHelpers();

    const handleSaveShortcut = useCallback(
      ({ state }) => {
        console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);


        return true; // Prevents any further key handlers from being run.
      },
      [getJSON],
    );


    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap('Mod-s', handleSaveShortcut);
  },


];


export const getEditorObject = (text) => {
  text = JSON.parse(text)
  return {
    type: text.type,
    content: text.content
  }
}



export const Editor = () => {
  const { editorContent, currentFile } = useContext(FileContext)

  const [file, setFile] = useState(currentFile)
 
  const html = String.raw; // Just for better editor support
  
 const content =html`<html>

  <head>
      <meta content="text/html; charset=UTF-8" http-equiv="content-type">
      <style type="text/css">
          @import url('https://themes.googleusercontent.com/fonts/css?kit=tKLL3UDOEolLNLmIs0YRYA');
  
          ol.lst-kix_list_7-0 {
              list-style-type: none
          }
  
          .lst-kix_list_2-1>li {
              counter-increment: lst-ctn-kix_list_2-1
          }
  
          .lst-kix_list_21-8>li {
              counter-increment: lst-ctn-kix_list_21-8
          }
  
          ol.lst-kix_list_9-0.start {
              counter-reset: lst-ctn-kix_list_9-0 0
          }
  
          ol.lst-kix_list_13-4.start {
              counter-reset: lst-ctn-kix_list_13-4 0
          }
  
          .lst-kix_list_13-0>li {
              counter-increment: lst-ctn-kix_list_13-0
          }
  
          .lst-kix_list_5-0>li {
              counter-increment: lst-ctn-kix_list_5-0
          }
  
          ol.lst-kix_list_2-3.start {
              counter-reset: lst-ctn-kix_list_2-3 0
          }
  
          ol.lst-kix_list_7-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_23-2.start {
              counter-reset: lst-ctn-kix_list_23-2 0
          }
  
          ol.lst-kix_list_5-3.start {
              counter-reset: lst-ctn-kix_list_5-3 0
          }
  
          .lst-kix_list_4-3>li {
              counter-increment: lst-ctn-kix_list_4-3
          }
  
          ol.lst-kix_list_17-1.start {
              counter-reset: lst-ctn-kix_list_17-1 0
          }
  
          .lst-kix_list_24-7>li {
              counter-increment: lst-ctn-kix_list_24-7
          }
  
          ol.lst-kix_list_8-8.start {
              counter-reset: lst-ctn-kix_list_8-8 0
          }
  
          ol.lst-kix_list_10-4.start {
              counter-reset: lst-ctn-kix_list_10-4 0
          }
  
          .lst-kix_list_7-2>li {
              counter-increment: lst-ctn-kix_list_7-2
          }
  
          .lst-kix_list_24-7>li:before {
              content: "" counter(lst-ctn-kix_list_24-7, decimal) ". "
          }
  
          ol.lst-kix_list_16-5 {
              list-style-type: none
          }
  
          .lst-kix_list_1-4>li {
              counter-increment: lst-ctn-kix_list_1-4
          }
  
          ol.lst-kix_list_16-6 {
              list-style-type: none
          }
  
          .lst-kix_list_24-8>li:before {
              content: "" counter(lst-ctn-kix_list_24-8, decimal) ". "
          }
  
          ol.lst-kix_list_16-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_1-6.start {
              counter-reset: lst-ctn-kix_list_1-6 0
          }
  
          ol.lst-kix_list_16-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_9-5.start {
              counter-reset: lst-ctn-kix_list_9-5 0
          }
  
          ol.lst-kix_list_16-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_16-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_16-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_16-4 {
              list-style-type: none
          }
  
          .lst-kix_list_24-2>li:before {
              content: "" counter(lst-ctn-kix_list_24-2, decimal) ". "
          }
  
          ol.lst-kix_list_16-0 {
              list-style-type: none
          }
  
          .lst-kix_list_24-3>li:before {
              content: "" counter(lst-ctn-kix_list_24-3, decimal) ". "
          }
  
          .lst-kix_list_24-4>li:before {
              content: "" counter(lst-ctn-kix_list_24-4, decimal) ". "
          }
  
          .lst-kix_list_9-4>li {
              counter-increment: lst-ctn-kix_list_9-4
          }
  
          .lst-kix_list_24-5>li:before {
              content: "" counter(lst-ctn-kix_list_24-5, decimal) ". "
          }
  
          .lst-kix_list_24-6>li:before {
              content: "" counter(lst-ctn-kix_list_24-6, decimal) ". "
          }
  
          ol.lst-kix_list_16-4.start {
              counter-reset: lst-ctn-kix_list_16-4 0
          }
  
          .lst-kix_list_23-6>li:before {
              content: "" counter(lst-ctn-kix_list_23-6, decimal) ". "
          }
  
          .lst-kix_list_6-5>li {
              counter-increment: lst-ctn-kix_list_6-5
          }
  
          .lst-kix_list_23-3>li:before {
              content: "" counter(lst-ctn-kix_list_23-3, decimal) ". "
          }
  
          .lst-kix_list_23-7>li:before {
              content: "" counter(lst-ctn-kix_list_23-7, decimal) ". "
          }
  
          .lst-kix_list_23-2>li:before {
              content: "" counter(lst-ctn-kix_list_23-2, decimal) ". "
          }
  
          ol.lst-kix_list_23-7.start {
              counter-reset: lst-ctn-kix_list_23-7 0
          }
  
          .lst-kix_list_23-0>li:before {
              content: "" counter(lst-ctn-kix_list_23-0, decimal) ". "
          }
  
          .lst-kix_list_23-8>li:before {
              content: "" counter(lst-ctn-kix_list_23-8, decimal) ". "
          }
  
          .lst-kix_list_3-6>li {
              counter-increment: lst-ctn-kix_list_3-6
          }
  
          .lst-kix_list_23-1>li:before {
              content: "" counter(lst-ctn-kix_list_23-1, decimal) ". "
          }
  
          .lst-kix_list_24-1>li:before {
              content: "" counter(lst-ctn-kix_list_24-1, decimal) ". "
          }
  
          .lst-kix_list_2-8>li {
              counter-increment: lst-ctn-kix_list_2-8
          }
  
          .lst-kix_list_24-0>li:before {
              content: "" counter(lst-ctn-kix_list_24-0, decimal) ". "
          }
  
          .lst-kix_list_23-4>li:before {
              content: "" counter(lst-ctn-kix_list_23-4, decimal) ". "
          }
  
          .lst-kix_list_23-5>li:before {
              content: "" counter(lst-ctn-kix_list_23-5, decimal) ". "
          }
  
          .lst-kix_list_22-2>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) "." counter(lst-ctn-kix_list_22-1, decimal) "." counter(lst-ctn-kix_list_22-2, decimal) " "
          }
  
          .lst-kix_list_22-6>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) "." counter(lst-ctn-kix_list_22-1, decimal) "." counter(lst-ctn-kix_list_22-2, decimal) "." counter(lst-ctn-kix_list_22-3, decimal) "." counter(lst-ctn-kix_list_22-4, decimal) "." counter(lst-ctn-kix_list_22-5, decimal) "." counter(lst-ctn-kix_list_22-6, decimal) " "
          }
  
          .lst-kix_list_8-6>li {
              counter-increment: lst-ctn-kix_list_8-6
          }
  
          .lst-kix_list_22-0>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) " "
          }
  
          .lst-kix_list_22-8>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) "." counter(lst-ctn-kix_list_22-1, decimal) "." counter(lst-ctn-kix_list_22-2, decimal) "." counter(lst-ctn-kix_list_22-3, decimal) "." counter(lst-ctn-kix_list_22-4, decimal) "." counter(lst-ctn-kix_list_22-5, decimal) "." counter(lst-ctn-kix_list_22-6, decimal) "." counter(lst-ctn-kix_list_22-7, decimal) "." counter(lst-ctn-kix_list_22-8, decimal) " "
          }
  
          ol.lst-kix_list_4-6.start {
              counter-reset: lst-ctn-kix_list_4-6 0
          }
  
          ol.lst-kix_list_9-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_9-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_22-5.start {
              counter-reset: lst-ctn-kix_list_22-5 0
          }
  
          ol.lst-kix_list_3-0.start {
              counter-reset: lst-ctn-kix_list_3-0 0
          }
  
          ol.lst-kix_list_9-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_9-4 {
              list-style-type: none
          }
  
          .lst-kix_list_5-7>li {
              counter-increment: lst-ctn-kix_list_5-7
          }
  
          ol.lst-kix_list_9-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_9-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_9-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_9-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_9-2 {
              list-style-type: none
          }
  
          .lst-kix_list_22-4>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) "." counter(lst-ctn-kix_list_22-1, decimal) "." counter(lst-ctn-kix_list_22-2, decimal) "." counter(lst-ctn-kix_list_22-3, decimal) "." counter(lst-ctn-kix_list_22-4, decimal) " "
          }
  
          ol.lst-kix_list_25-5.start {
              counter-reset: lst-ctn-kix_list_25-5 0
          }
  
          .lst-kix_list_25-5>li:before {
              content: "" counter(lst-ctn-kix_list_25-5, decimal) ". "
          }
  
          .lst-kix_list_25-7>li:before {
              content: "" counter(lst-ctn-kix_list_25-7, decimal) ". "
          }
  
          .lst-kix_list_3-5>li {
              counter-increment: lst-ctn-kix_list_3-5
          }
  
          ol.lst-kix_list_1-1.start {
              counter-reset: lst-ctn-kix_list_1-1 0
          }
  
          ol.lst-kix_list_24-4.start {
              counter-reset: lst-ctn-kix_list_24-4 0
          }
  
          .lst-kix_list_6-4>li {
              counter-increment: lst-ctn-kix_list_6-4
          }
  
          .lst-kix_list_9-3>li {
              counter-increment: lst-ctn-kix_list_9-3
          }
  
          ol.lst-kix_list_15-2.start {
              counter-reset: lst-ctn-kix_list_15-2 0
          }
  
          ol.lst-kix_list_2-8.start {
              counter-reset: lst-ctn-kix_list_2-8 0
          }
  
          ol.lst-kix_list_7-6.start {
              counter-reset: lst-ctn-kix_list_7-6 0
          }
  
          ol.lst-kix_list_15-3.start {
              counter-reset: lst-ctn-kix_list_15-3 0
          }
  
          ul.lst-kix_list_18-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_5-8.start {
              counter-reset: lst-ctn-kix_list_5-8 0
          }
  
          .lst-kix_list_1-3>li {
              counter-increment: lst-ctn-kix_list_1-3
          }
  
          ul.lst-kix_list_18-8 {
              list-style-type: none
          }
  
          ul.lst-kix_list_18-7 {
              list-style-type: none
          }
  
          ul.lst-kix_list_18-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-2.start {
              counter-reset: lst-ctn-kix_list_12-2 0
          }
  
          ul.lst-kix_list_18-5 {
              list-style-type: none
          }
  
          ul.lst-kix_list_18-4 {
              list-style-type: none
          }
  
          ul.lst-kix_list_18-3 {
              list-style-type: none
          }
  
          ul.lst-kix_list_18-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_6-0.start {
              counter-reset: lst-ctn-kix_list_6-0 2
          }
  
          ul.lst-kix_list_18-1 {
              list-style-type: none
          }
  
          .lst-kix_list_4-2>li {
              counter-increment: lst-ctn-kix_list_4-2
          }
  
          ol.lst-kix_list_3-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_3-2 {
              list-style-type: none
          }
  
          .lst-kix_list_24-8>li {
              counter-increment: lst-ctn-kix_list_24-8
          }
  
          ol.lst-kix_list_3-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_3-4.start {
              counter-reset: lst-ctn-kix_list_3-4 0
          }
  
          .lst-kix_list_5-1>li {
              counter-increment: lst-ctn-kix_list_5-1
          }
  
          ol.lst-kix_list_3-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-0.start {
              counter-reset: lst-ctn-kix_list_19-0 1
          }
  
          ol.lst-kix_list_21-3.start {
              counter-reset: lst-ctn-kix_list_21-3 0
          }
  
          ol.lst-kix_list_3-0 {
              list-style-type: none
          }
  
          .lst-kix_list_7-1>li {
              counter-increment: lst-ctn-kix_list_7-1
          }
  
          ol.lst-kix_list_25-6.start {
              counter-reset: lst-ctn-kix_list_25-6 0
          }
  
          .lst-kix_list_21-8>li:before {
              content: "" counter(lst-ctn-kix_list_21-8, decimal) ". "
          }
  
          .lst-kix_list_16-0>li {
              counter-increment: lst-ctn-kix_list_16-0
          }
  
          .lst-kix_list_8-0>li {
              counter-increment: lst-ctn-kix_list_8-0
          }
  
          .lst-kix_list_10-0>li {
              counter-increment: lst-ctn-kix_list_10-0
          }
  
          ol.lst-kix_list_3-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_3-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_3-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_3-8 {
              list-style-type: none
          }
  
          .lst-kix_list_21-0>li:before {
              content: "" counter(lst-ctn-kix_list_21-0, decimal) ". "
          }
  
          .lst-kix_list_13-1>li {
              counter-increment: lst-ctn-kix_list_13-1
          }
  
          .lst-kix_list_21-1>li:before {
              content: "" counter(lst-ctn-kix_list_21-1, decimal) ". "
          }
  
          ol.lst-kix_list_15-8.start {
              counter-reset: lst-ctn-kix_list_15-8 0
          }
  
          .lst-kix_list_10-2>li {
              counter-increment: lst-ctn-kix_list_10-2
          }
  
          .lst-kix_list_21-5>li:before {
              content: "" counter(lst-ctn-kix_list_21-5, decimal) ". "
          }
  
          .lst-kix_list_21-4>li:before {
              content: "" counter(lst-ctn-kix_list_21-4, decimal) ". "
          }
  
          ol.lst-kix_list_7-2.start {
              counter-reset: lst-ctn-kix_list_7-2 0
          }
  
          ol.lst-kix_list_19-5.start {
              counter-reset: lst-ctn-kix_list_19-5 0
          }
  
          ol.lst-kix_list_12-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-0 {
              list-style-type: none
          }
  
          .lst-kix_list_21-0>li {
              counter-increment: lst-ctn-kix_list_21-0
          }
  
          .lst-kix_list_25-1>li:before {
              content: "" counter(lst-ctn-kix_list_25-1, decimal) ". "
          }
  
          .lst-kix_list_25-0>li:before {
              content: "" counter(lst-ctn-kix_list_25-0, decimal) ". "
          }
  
          ol.lst-kix_list_10-8.start {
              counter-reset: lst-ctn-kix_list_10-8 0
          }
  
          ol.lst-kix_list_7-1.start {
              counter-reset: lst-ctn-kix_list_7-1 0
          }
  
          ol.lst-kix_list_23-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_23-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_23-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_23-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_23-2 {
              list-style-type: none
          }
  
          .lst-kix_list_16-7>li {
              counter-increment: lst-ctn-kix_list_16-7
          }
  
          ol.lst-kix_list_21-4.start {
              counter-reset: lst-ctn-kix_list_21-4 0
          }
  
          ol.lst-kix_list_23-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_23-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_23-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_23-0 {
              list-style-type: none
          }
  
          .lst-kix_list_13-8>li {
              counter-increment: lst-ctn-kix_list_13-8
          }
  
          .lst-kix_list_2-2>li {
              counter-increment: lst-ctn-kix_list_2-2
          }
  
          ol.lst-kix_list_4-7.start {
              counter-reset: lst-ctn-kix_list_4-7 0
          }
  
          .lst-kix_list_16-5>li {
              counter-increment: lst-ctn-kix_list_16-5
          }
  
          ol.lst-kix_list_5-0 {
              list-style-type: none
          }
  
          .lst-kix_list_3-7>li {
              counter-increment: lst-ctn-kix_list_3-7
          }
  
          ol.lst-kix_list_5-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_5-2 {
              list-style-type: none
          }
  
          .lst-kix_list_22-5>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) "." counter(lst-ctn-kix_list_22-1, decimal) "." counter(lst-ctn-kix_list_22-2, decimal) "." counter(lst-ctn-kix_list_22-3, decimal) "." counter(lst-ctn-kix_list_22-4, decimal) "." counter(lst-ctn-kix_list_22-5, decimal) " "
          }
  
          .lst-kix_list_21-2>li {
              counter-increment: lst-ctn-kix_list_21-2
          }
  
          .lst-kix_list_22-1>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) "." counter(lst-ctn-kix_list_22-1, decimal) " "
          }
  
          .lst-kix_list_6-6>li {
              counter-increment: lst-ctn-kix_list_6-6
          }
  
          ol.lst-kix_list_15-7.start {
              counter-reset: lst-ctn-kix_list_15-7 0
          }
  
          .lst-kix_list_23-3>li {
              counter-increment: lst-ctn-kix_list_23-3
          }
  
          .lst-kix_list_13-6>li {
              counter-increment: lst-ctn-kix_list_13-6
          }
  
          ol.lst-kix_list_5-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_5-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_5-3 {
              list-style-type: none
          }
  
          .lst-kix_list_8-7>li {
              counter-increment: lst-ctn-kix_list_8-7
          }
  
          .lst-kix_list_19-6>li {
              counter-increment: lst-ctn-kix_list_19-6
          }
  
          ol.lst-kix_list_5-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_5-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_5-6 {
              list-style-type: none
          }
  
          .lst-kix_list_9-5>li {
              counter-increment: lst-ctn-kix_list_9-5
          }
  
          .lst-kix_list_5-8>li {
              counter-increment: lst-ctn-kix_list_5-8
          }
  
          ol.lst-kix_list_19-4.start {
              counter-reset: lst-ctn-kix_list_19-4 0
          }
  
          ol.lst-kix_list_2-2.start {
              counter-reset: lst-ctn-kix_list_2-2 0
          }
  
          .lst-kix_list_25-4>li:before {
              content: "" counter(lst-ctn-kix_list_25-4, decimal) ". "
          }
  
          .lst-kix_list_19-4>li {
              counter-increment: lst-ctn-kix_list_19-4
          }
  
          .lst-kix_list_24-1>li {
              counter-increment: lst-ctn-kix_list_24-1
          }
  
          .lst-kix_list_25-8>li:before {
              content: "" counter(lst-ctn-kix_list_25-8, decimal) ". "
          }
  
          ol.lst-kix_list_25-1.start {
              counter-reset: lst-ctn-kix_list_25-1 0
          }
  
          ol.lst-kix_list_21-8.start {
              counter-reset: lst-ctn-kix_list_21-8 0
          }
  
          .lst-kix_list_15-2>li {
              counter-increment: lst-ctn-kix_list_15-2
          }
  
          .lst-kix_list_22-5>li {
              counter-increment: lst-ctn-kix_list_22-5
          }
  
          .lst-kix_list_20-5>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_20-1>li:before {
              content: "o  "
          }
  
          .lst-kix_list_12-3>li {
              counter-increment: lst-ctn-kix_list_12-3
          }
  
          .lst-kix_list_24-6>li {
              counter-increment: lst-ctn-kix_list_24-6
          }
  
          .lst-kix_list_17-3>li {
              counter-increment: lst-ctn-kix_list_17-3
          }
  
          ol.lst-kix_list_8-4.start {
              counter-reset: lst-ctn-kix_list_8-4 0
          }
  
          ol.lst-kix_list_3-5.start {
              counter-reset: lst-ctn-kix_list_3-5 0
          }
  
          .lst-kix_list_21-7>li {
              counter-increment: lst-ctn-kix_list_21-7
          }
  
          ol.lst-kix_list_25-0.start {
              counter-reset: lst-ctn-kix_list_25-0 0
          }
  
          ol.lst-kix_list_25-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-7 {
              list-style-type: none
          }
  
          ul.lst-kix_list_14-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-4 {
              list-style-type: none
          }
  
          ul.lst-kix_list_14-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_13-0.start {
              counter-reset: lst-ctn-kix_list_13-0 0
          }
  
          ul.lst-kix_list_14-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-6 {
              list-style-type: none
          }
  
          ul.lst-kix_list_14-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-5 {
              list-style-type: none
          }
  
          ul.lst-kix_list_14-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-2 {
              list-style-type: none
          }
  
          .lst-kix_list_10-7>li {
              counter-increment: lst-ctn-kix_list_10-7
          }
  
          ol.lst-kix_list_25-1 {
              list-style-type: none
          }
  
          ul.lst-kix_list_14-8 {
              list-style-type: none
          }
  
          ul.lst-kix_list_14-7 {
              list-style-type: none
          }
  
          .lst-kix_list_25-4>li {
              counter-increment: lst-ctn-kix_list_25-4
          }
  
          ol.lst-kix_list_8-3.start {
              counter-reset: lst-ctn-kix_list_8-3 0
          }
  
          ul.lst-kix_list_14-6 {
              list-style-type: none
          }
  
          .lst-kix_list_11-5>li {
              counter-increment: lst-ctn-kix_list_11-5
          }
  
          ul.lst-kix_list_14-5 {
              list-style-type: none
          }
  
          .lst-kix_list_4-1>li {
              counter-increment: lst-ctn-kix_list_4-1
          }
  
          .lst-kix_list_19-1>li:before {
              content: "" counter(lst-ctn-kix_list_19-1, decimal) ". "
          }
  
          .lst-kix_list_19-4>li:before {
              content: "" counter(lst-ctn-kix_list_19-4, decimal) ". "
          }
  
          .lst-kix_list_19-3>li:before {
              content: "" counter(lst-ctn-kix_list_19-3, decimal) ". "
          }
  
          .lst-kix_list_15-0>li {
              counter-increment: lst-ctn-kix_list_15-0
          }
  
          ol.lst-kix_list_24-5.start {
              counter-reset: lst-ctn-kix_list_24-5 0
          }
  
          ol.lst-kix_list_6-6.start {
              counter-reset: lst-ctn-kix_list_6-6 0
          }
  
          .lst-kix_list_11-0>li {
              counter-increment: lst-ctn-kix_list_11-0
          }
  
          ol.lst-kix_list_1-5.start {
              counter-reset: lst-ctn-kix_list_1-5 0
          }
  
          ol.lst-kix_list_9-6.start {
              counter-reset: lst-ctn-kix_list_9-6 0
          }
  
          ol.lst-kix_list_16-3.start {
              counter-reset: lst-ctn-kix_list_16-3 0
          }
  
          ol.lst-kix_list_22-4.start {
              counter-reset: lst-ctn-kix_list_22-4 0
          }
  
          .lst-kix_list_22-7>li {
              counter-increment: lst-ctn-kix_list_22-7
          }
  
          ol.lst-kix_list_4-5.start {
              counter-reset: lst-ctn-kix_list_4-5 0
          }
  
          .lst-kix_list_5-2>li {
              counter-increment: lst-ctn-kix_list_5-2
          }
  
          .lst-kix_list_19-6>li:before {
              content: "" counter(lst-ctn-kix_list_19-6, decimal) ". "
          }
  
          ol.lst-kix_list_8-7.start {
              counter-reset: lst-ctn-kix_list_8-7 0
          }
  
          .lst-kix_list_17-2>li {
              counter-increment: lst-ctn-kix_list_17-2
          }
  
          .lst-kix_list_22-0>li {
              counter-increment: lst-ctn-kix_list_22-0
          }
  
          ol.lst-kix_list_24-0.start {
              counter-reset: lst-ctn-kix_list_24-0 1
          }
  
          .lst-kix_list_21-6>li {
              counter-increment: lst-ctn-kix_list_21-6
          }
  
          .lst-kix_list_10-3>li {
              counter-increment: lst-ctn-kix_list_10-3
          }
  
          ol.lst-kix_list_1-0.start {
              counter-reset: lst-ctn-kix_list_1-0 0
          }
  
          .lst-kix_list_18-0>li:before {
              content: "\0025cf  "
          }
  
          ol.lst-kix_list_13-3.start {
              counter-reset: lst-ctn-kix_list_13-3 0
          }
  
          .lst-kix_list_3-0>li {
              counter-increment: lst-ctn-kix_list_3-0
          }
  
          .lst-kix_list_18-2>li:before {
              content: "\0025aa  "
          }
  
          ol.lst-kix_list_4-0.start {
              counter-reset: lst-ctn-kix_list_4-0 0
          }
  
          ol.lst-kix_list_11-7.start {
              counter-reset: lst-ctn-kix_list_11-7 0
          }
  
          .lst-kix_list_16-1>li {
              counter-increment: lst-ctn-kix_list_16-1
          }
  
          .lst-kix_list_25-2>li {
              counter-increment: lst-ctn-kix_list_25-2
          }
  
          .lst-kix_list_17-5>li {
              counter-increment: lst-ctn-kix_list_17-5
          }
  
          ol.lst-kix_list_9-4.start {
              counter-reset: lst-ctn-kix_list_9-4 0
          }
  
          .lst-kix_list_21-3>li {
              counter-increment: lst-ctn-kix_list_21-3
          }
  
          .lst-kix_list_18-8>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_17-6>li {
              counter-increment: lst-ctn-kix_list_17-6
          }
  
          ol.lst-kix_list_4-3.start {
              counter-reset: lst-ctn-kix_list_4-3 0
          }
  
          .lst-kix_list_10-7>li:before {
              content: "" counter(lst-ctn-kix_list_10-7, lower-latin) ". "
          }
  
          .lst-kix_list_7-8>li {
              counter-increment: lst-ctn-kix_list_7-8
          }
  
          .lst-kix_list_10-5>li:before {
              content: "" counter(lst-ctn-kix_list_10-5, lower-roman) ". "
          }
  
          ol.lst-kix_list_13-5.start {
              counter-reset: lst-ctn-kix_list_13-5 0
          }
  
          ol.lst-kix_list_13-8.start {
              counter-reset: lst-ctn-kix_list_13-8 0
          }
  
          .lst-kix_list_11-7>li {
              counter-increment: lst-ctn-kix_list_11-7
          }
  
          .lst-kix_list_9-2>li:before {
              content: "" counter(lst-ctn-kix_list_9-2, lower-roman) ". "
          }
  
          .lst-kix_list_12-5>li {
              counter-increment: lst-ctn-kix_list_12-5
          }
  
          .lst-kix_list_5-5>li {
              counter-increment: lst-ctn-kix_list_5-5
          }
  
          .lst-kix_list_9-0>li:before {
              content: "" counter(lst-ctn-kix_list_9-0, upper-roman) ". "
          }
  
          .lst-kix_list_16-8>li {
              counter-increment: lst-ctn-kix_list_16-8
          }
  
          ol.lst-kix_list_24-3.start {
              counter-reset: lst-ctn-kix_list_24-3 0
          }
  
          .lst-kix_list_23-5>li {
              counter-increment: lst-ctn-kix_list_23-5
          }
  
          .lst-kix_list_11-3>li:before {
              content: "" counter(lst-ctn-kix_list_11-3, decimal) ". "
          }
  
          .lst-kix_list_6-3>li {
              counter-increment: lst-ctn-kix_list_6-3
          }
  
          ol.lst-kix_list_1-3.start {
              counter-reset: lst-ctn-kix_list_1-3 0
          }
  
          ol.lst-kix_list_1-2.start {
              counter-reset: lst-ctn-kix_list_1-2 0
          }
  
          .lst-kix_list_20-4>li:before {
              content: "o  "
          }
  
          ol.lst-kix_list_22-7.start {
              counter-reset: lst-ctn-kix_list_22-7 0
          }
  
          ol.lst-kix_list_6-1.start {
              counter-reset: lst-ctn-kix_list_6-1 0
          }
  
          .lst-kix_list_20-2>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_9-8>li:before {
              content: "" counter(lst-ctn-kix_list_9-8, lower-roman) ". "
          }
  
          ol.lst-kix_list_16-8.start {
              counter-reset: lst-ctn-kix_list_16-8 0
          }
  
          .lst-kix_list_4-8>li {
              counter-increment: lst-ctn-kix_list_4-8
          }
  
          .lst-kix_list_1-7>li:before {
              content: "" counter(lst-ctn-kix_list_1-7, lower-latin) ". "
          }
  
          .lst-kix_list_1-5>li:before {
              content: "" counter(lst-ctn-kix_list_1-5, lower-roman) ". "
          }
  
          ol.lst-kix_list_9-1.start {
              counter-reset: lst-ctn-kix_list_9-1 0
          }
  
          ol.lst-kix_list_24-2.start {
              counter-reset: lst-ctn-kix_list_24-2 0
          }
  
          .lst-kix_list_5-6>li {
              counter-increment: lst-ctn-kix_list_5-6
          }
  
          ol.lst-kix_list_22-6.start {
              counter-reset: lst-ctn-kix_list_22-6 0
          }
  
          .lst-kix_list_2-1>li:before {
              content: "" counter(lst-ctn-kix_list_2-1, lower-latin) ". "
          }
  
          .lst-kix_list_19-8>li {
              counter-increment: lst-ctn-kix_list_19-8
          }
  
          .lst-kix_list_2-3>li:before {
              content: "" counter(lst-ctn-kix_list_2-3, decimal) ". "
          }
  
          .lst-kix_list_11-8>li {
              counter-increment: lst-ctn-kix_list_11-8
          }
  
          ol.lst-kix_list_24-8.start {
              counter-reset: lst-ctn-kix_list_24-8 0
          }
  
          .lst-kix_list_9-1>li {
              counter-increment: lst-ctn-kix_list_9-1
          }
  
          .lst-kix_list_3-2>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) "." counter(lst-ctn-kix_list_3-1, decimal) "." counter(lst-ctn-kix_list_3-2, decimal) ". "
          }
  
          .lst-kix_list_8-1>li:before {
              content: "" counter(lst-ctn-kix_list_8-1, lower-latin) ". "
          }
  
          ol.lst-kix_list_1-8.start {
              counter-reset: lst-ctn-kix_list_1-8 0
          }
  
          .lst-kix_list_6-0>li {
              counter-increment: lst-ctn-kix_list_6-0
          }
  
          .lst-kix_list_3-5>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) "." counter(lst-ctn-kix_list_3-1, decimal) "." counter(lst-ctn-kix_list_3-2, decimal) "." counter(lst-ctn-kix_list_3-3, decimal) "." counter(lst-ctn-kix_list_3-4, decimal) "." counter(lst-ctn-kix_list_3-5, decimal) ". "
          }
  
          ol.lst-kix_list_11-5.start {
              counter-reset: lst-ctn-kix_list_11-5 0
          }
  
          .lst-kix_list_11-1>li {
              counter-increment: lst-ctn-kix_list_11-1
          }
  
          .lst-kix_list_8-6>li:before {
              content: "" counter(lst-ctn-kix_list_8-6, decimal) ". "
          }
  
          .lst-kix_list_21-6>li:before {
              content: "" counter(lst-ctn-kix_list_21-6, decimal) ". "
          }
  
          ol.lst-kix_list_16-6.start {
              counter-reset: lst-ctn-kix_list_16-6 0
          }
  
          ol.lst-kix_list_22-1.start {
              counter-reset: lst-ctn-kix_list_22-1 1
          }
  
          ol.lst-kix_list_4-2.start {
              counter-reset: lst-ctn-kix_list_4-2 0
          }
  
          ol.lst-kix_list_16-0.start {
              counter-reset: lst-ctn-kix_list_16-0 0
          }
  
          .lst-kix_list_21-3>li:before {
              content: "" counter(lst-ctn-kix_list_21-3, decimal) ". "
          }
  
          .lst-kix_list_25-5>li {
              counter-increment: lst-ctn-kix_list_25-5
          }
  
          ol.lst-kix_list_11-6.start {
              counter-reset: lst-ctn-kix_list_11-6 0
          }
  
          .lst-kix_list_4-4>li {
              counter-increment: lst-ctn-kix_list_4-4
          }
  
          ol.lst-kix_list_6-4.start {
              counter-reset: lst-ctn-kix_list_6-4 0
          }
  
          .lst-kix_list_17-1>li:before {
              content: "" counter(lst-ctn-kix_list_17-1, lower-latin) ". "
          }
  
          .lst-kix_list_25-3>li:before {
              content: "" counter(lst-ctn-kix_list_25-3, decimal) ". "
          }
  
          ol.lst-kix_list_4-1.start {
              counter-reset: lst-ctn-kix_list_4-1 0
          }
  
          .lst-kix_list_16-2>li:before {
              content: "" counter(lst-ctn-kix_list_16-2, decimal) ". "
          }
  
          .lst-kix_list_16-5>li:before {
              content: "" counter(lst-ctn-kix_list_16-5, decimal) ". "
          }
  
          .lst-kix_list_15-3>li {
              counter-increment: lst-ctn-kix_list_15-3
          }
  
          ol.lst-kix_list_22-2.start {
              counter-reset: lst-ctn-kix_list_22-2 0
          }
  
          ol.lst-kix_list_11-0.start {
              counter-reset: lst-ctn-kix_list_11-0 3
          }
  
          .lst-kix_list_3-3>li {
              counter-increment: lst-ctn-kix_list_3-3
          }
  
          .lst-kix_list_16-4>li {
              counter-increment: lst-ctn-kix_list_16-4
          }
  
          ol.lst-kix_list_6-3.start {
              counter-reset: lst-ctn-kix_list_6-3 0
          }
  
          ol.lst-kix_list_16-5.start {
              counter-reset: lst-ctn-kix_list_16-5 0
          }
  
          .lst-kix_list_17-6>li:before {
              content: "" counter(lst-ctn-kix_list_17-6, decimal) ". "
          }
  
          .lst-kix_list_2-6>li:before {
              content: "" counter(lst-ctn-kix_list_2-6, decimal) ". "
          }
  
          ol.lst-kix_list_16-2.start {
              counter-reset: lst-ctn-kix_list_16-2 0
          }
  
          .lst-kix_list_7-5>li:before {
              content: "" counter(lst-ctn-kix_list_7-5, lower-roman) ". "
          }
  
          .lst-kix_list_19-5>li {
              counter-increment: lst-ctn-kix_list_19-5
          }
  
          .lst-kix_list_22-7>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) "." counter(lst-ctn-kix_list_22-1, decimal) "." counter(lst-ctn-kix_list_22-2, decimal) "." counter(lst-ctn-kix_list_22-3, decimal) "." counter(lst-ctn-kix_list_22-4, decimal) "." counter(lst-ctn-kix_list_22-5, decimal) "." counter(lst-ctn-kix_list_22-6, decimal) "." counter(lst-ctn-kix_list_22-7, decimal) " "
          }
  
          .lst-kix_list_23-2>li {
              counter-increment: lst-ctn-kix_list_23-2
          }
  
          ol.lst-kix_list_11-1.start {
              counter-reset: lst-ctn-kix_list_11-1 0
          }
  
          .lst-kix_list_18-5>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_13-6>li:before {
              content: "" counter(lst-ctn-kix_list_13-6, decimal) ". "
          }
  
          .lst-kix_list_6-7>li {
              counter-increment: lst-ctn-kix_list_6-7
          }
  
          .lst-kix_list_10-6>li {
              counter-increment: lst-ctn-kix_list_10-6
          }
  
          .lst-kix_list_1-7>li {
              counter-increment: lst-ctn-kix_list_1-7
          }
  
          .lst-kix_list_7-5>li {
              counter-increment: lst-ctn-kix_list_7-5
          }
  
          .lst-kix_list_15-6>li:before {
              content: "" counter(lst-ctn-kix_list_15-6, decimal) ". "
          }
  
          .lst-kix_list_11-4>li {
              counter-increment: lst-ctn-kix_list_11-4
          }
  
          ol.lst-kix_list_24-7.start {
              counter-reset: lst-ctn-kix_list_24-7 0
          }
  
          .lst-kix_list_22-4>li {
              counter-increment: lst-ctn-kix_list_22-4
          }
  
          ol.lst-kix_list_6-8.start {
              counter-reset: lst-ctn-kix_list_6-8 0
          }
  
          .lst-kix_list_10-2>li:before {
              content: "" counter(lst-ctn-kix_list_10-2, lower-roman) ". "
          }
  
          .lst-kix_list_13-7>li {
              counter-increment: lst-ctn-kix_list_13-7
          }
  
          ol.lst-kix_list_1-7.start {
              counter-reset: lst-ctn-kix_list_1-7 0
          }
  
          .lst-kix_list_20-7>li:before {
              content: "o  "
          }
  
          ol.lst-kix_list_6-5.start {
              counter-reset: lst-ctn-kix_list_6-5 0
          }
  
          .lst-kix_list_4-6>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) "." counter(lst-ctn-kix_list_4-1, decimal) "." counter(lst-ctn-kix_list_4-2, decimal) "." counter(lst-ctn-kix_list_4-3, decimal) "." counter(lst-ctn-kix_list_4-4, decimal) "." counter(lst-ctn-kix_list_4-5, decimal) "." counter(lst-ctn-kix_list_4-6, decimal) " "
          }
  
          .lst-kix_list_25-6>li:before {
              content: "" counter(lst-ctn-kix_list_25-6, decimal) ". "
          }
  
          ol.lst-kix_list_6-7.start {
              counter-reset: lst-ctn-kix_list_6-7 0
          }
  
          .lst-kix_list_12-2>li {
              counter-increment: lst-ctn-kix_list_12-2
          }
  
          .lst-kix_list_9-5>li:before {
              content: "" counter(lst-ctn-kix_list_9-5, lower-roman) ". "
          }
  
          ol.lst-kix_list_22-0.start {
              counter-reset: lst-ctn-kix_list_22-0 18
          }
  
          .lst-kix_list_24-0>li {
              counter-increment: lst-ctn-kix_list_24-0
          }
  
          .lst-kix_list_12-2>li:before {
              content: "" counter(lst-ctn-kix_list_12-2, lower-roman) ". "
          }
  
          .lst-kix_list_11-6>li:before {
              content: "" counter(lst-ctn-kix_list_11-6, decimal) ". "
          }
  
          ol.lst-kix_list_11-3.start {
              counter-reset: lst-ctn-kix_list_11-3 0
          }
  
          .lst-kix_list_1-2>li:before {
              content: "" counter(lst-ctn-kix_list_1-2, lower-roman) ". "
          }
  
          .lst-kix_list_1-0>li {
              counter-increment: lst-ctn-kix_list_1-0
          }
  
          ol.lst-kix_list_16-1.start {
              counter-reset: lst-ctn-kix_list_16-1 0
          }
  
          li.li-bullet-0:before {
              margin-left: -18pt;
              white-space: nowrap;
              display: inline-block;
              min-width: 18pt
          }
  
          ol.lst-kix_list_11-4.start {
              counter-reset: lst-ctn-kix_list_11-4 0
          }
  
          .lst-kix_list_14-1>li:before {
              content: "o  "
          }
  
          .lst-kix_list_14-3>li:before {
              content: "\0025cf  "
          }
  
          ol.lst-kix_list_15-6 {
              list-style-type: none
          }
  
          .lst-kix_list_25-8>li {
              counter-increment: lst-ctn-kix_list_25-8
          }
  
          ol.lst-kix_list_15-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_15-8 {
              list-style-type: none
          }
  
          .lst-kix_list_14-0>li:before {
              content: "\0025cf  "
          }
  
          .lst-kix_list_14-4>li:before {
              content: "o  "
          }
  
          ol.lst-kix_list_15-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_15-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_15-4 {
              list-style-type: none
          }
  
          .lst-kix_list_6-1>li {
              counter-increment: lst-ctn-kix_list_6-1
          }
  
          .lst-kix_list_14-5>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_14-7>li:before {
              content: "o  "
          }
  
          ol.lst-kix_list_15-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_15-0 {
              list-style-type: none
          }
  
          .lst-kix_list_14-6>li:before {
              content: "\0025cf  "
          }
  
          ol.lst-kix_list_15-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-4.start {
              counter-reset: lst-ctn-kix_list_7-4 0
          }
  
          .lst-kix_list_17-0>li {
              counter-increment: lst-ctn-kix_list_17-0
          }
  
          .lst-kix_list_9-0>li {
              counter-increment: lst-ctn-kix_list_9-0
          }
  
          ol.lst-kix_list_25-3.start {
              counter-reset: lst-ctn-kix_list_25-3 0
          }
  
          ol.lst-kix_list_11-8.start {
              counter-reset: lst-ctn-kix_list_11-8 0
          }
  
          .lst-kix_list_14-2>li:before {
              content: "\0025aa  "
          }
  
          ol.lst-kix_list_12-0.start {
              counter-reset: lst-ctn-kix_list_12-0 3
          }
  
          ol.lst-kix_list_21-6.start {
              counter-reset: lst-ctn-kix_list_21-6 0
          }
  
          ol.lst-kix_list_3-7.start {
              counter-reset: lst-ctn-kix_list_3-7 0
          }
  
          .lst-kix_list_14-8>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_3-2>li {
              counter-increment: lst-ctn-kix_list_3-2
          }
  
          ol.lst-kix_list_15-5.start {
              counter-reset: lst-ctn-kix_list_15-5 0
          }
  
          .lst-kix_list_5-0>li:before {
              content: "" counter(lst-ctn-kix_list_5-0, upper-roman) ". "
          }
  
          ol.lst-kix_list_6-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_6-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_22-3.start {
              counter-reset: lst-ctn-kix_list_22-3 0
          }
  
          .lst-kix_list_5-4>li {
              counter-increment: lst-ctn-kix_list_5-4
          }
  
          .lst-kix_list_5-3>li:before {
              content: "" counter(lst-ctn-kix_list_5-3, decimal) ". "
          }
  
          ol.lst-kix_list_24-6.start {
              counter-reset: lst-ctn-kix_list_24-6 0
          }
  
          .lst-kix_list_5-2>li:before {
              content: "" counter(lst-ctn-kix_list_5-2, lower-roman) ". "
          }
  
          .lst-kix_list_8-3>li {
              counter-increment: lst-ctn-kix_list_8-3
          }
  
          .lst-kix_list_5-1>li:before {
              content: "" counter(lst-ctn-kix_list_5-1, lower-roman) ". "
          }
  
          .lst-kix_list_5-7>li:before {
              content: "" counter(lst-ctn-kix_list_5-7, lower-latin) ". "
          }
  
          .lst-kix_list_5-6>li:before {
              content: "" counter(lst-ctn-kix_list_5-6, decimal) ". "
          }
  
          .lst-kix_list_5-8>li:before {
              content: "" counter(lst-ctn-kix_list_5-8, lower-roman) ". "
          }
  
          ol.lst-kix_list_6-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_6-7 {
              list-style-type: none
          }
  
          .lst-kix_list_5-4>li:before {
              content: "" counter(lst-ctn-kix_list_5-4, lower-latin) ". "
          }
  
          ol.lst-kix_list_6-8 {
              list-style-type: none
          }
  
          .lst-kix_list_5-5>li:before {
              content: "" counter(lst-ctn-kix_list_5-5, lower-roman) ". "
          }
  
          ol.lst-kix_list_6-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_6-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_6-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_6-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-5.start {
              counter-reset: lst-ctn-kix_list_12-5 0
          }
  
          .lst-kix_list_6-1>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) "." counter(lst-ctn-kix_list_6-1, decimal) " "
          }
  
          .lst-kix_list_6-3>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) "." counter(lst-ctn-kix_list_6-1, decimal) "." counter(lst-ctn-kix_list_6-2, decimal) "." counter(lst-ctn-kix_list_6-3, decimal) " "
          }
  
          .lst-kix_list_6-8>li {
              counter-increment: lst-ctn-kix_list_6-8
          }
  
          .lst-kix_list_6-0>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) " "
          }
  
          .lst-kix_list_6-4>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) "." counter(lst-ctn-kix_list_6-1, decimal) "." counter(lst-ctn-kix_list_6-2, decimal) "." counter(lst-ctn-kix_list_6-3, decimal) "." counter(lst-ctn-kix_list_6-4, decimal) " "
          }
  
          .lst-kix_list_6-2>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) "." counter(lst-ctn-kix_list_6-1, decimal) "." counter(lst-ctn-kix_list_6-2, decimal) " "
          }
  
          ol.lst-kix_list_15-0.start {
              counter-reset: lst-ctn-kix_list_15-0 2
          }
  
          .lst-kix_list_2-5>li {
              counter-increment: lst-ctn-kix_list_2-5
          }
  
          ol.lst-kix_list_3-2.start {
              counter-reset: lst-ctn-kix_list_3-2 0
          }
  
          .lst-kix_list_6-8>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) "." counter(lst-ctn-kix_list_6-1, decimal) "." counter(lst-ctn-kix_list_6-2, decimal) "." counter(lst-ctn-kix_list_6-3, decimal) "." counter(lst-ctn-kix_list_6-4, decimal) "." counter(lst-ctn-kix_list_6-5, decimal) "." counter(lst-ctn-kix_list_6-6, decimal) "." counter(lst-ctn-kix_list_6-7, decimal) "." counter(lst-ctn-kix_list_6-8, decimal) " "
          }
  
          .lst-kix_list_6-5>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) "." counter(lst-ctn-kix_list_6-1, decimal) "." counter(lst-ctn-kix_list_6-2, decimal) "." counter(lst-ctn-kix_list_6-3, decimal) "." counter(lst-ctn-kix_list_6-4, decimal) "." counter(lst-ctn-kix_list_6-5, decimal) " "
          }
  
          .lst-kix_list_6-7>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) "." counter(lst-ctn-kix_list_6-1, decimal) "." counter(lst-ctn-kix_list_6-2, decimal) "." counter(lst-ctn-kix_list_6-3, decimal) "." counter(lst-ctn-kix_list_6-4, decimal) "." counter(lst-ctn-kix_list_6-5, decimal) "." counter(lst-ctn-kix_list_6-6, decimal) "." counter(lst-ctn-kix_list_6-7, decimal) " "
          }
  
          .lst-kix_list_6-6>li:before {
              content: "" counter(lst-ctn-kix_list_6-0, decimal) "." counter(lst-ctn-kix_list_6-1, decimal) "." counter(lst-ctn-kix_list_6-2, decimal) "." counter(lst-ctn-kix_list_6-3, decimal) "." counter(lst-ctn-kix_list_6-4, decimal) "." counter(lst-ctn-kix_list_6-5, decimal) "." counter(lst-ctn-kix_list_6-6, decimal) " "
          }
  
          ol.lst-kix_list_17-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_10-6.start {
              counter-reset: lst-ctn-kix_list_10-6 0
          }
  
          .lst-kix_list_7-4>li:before {
              content: "" counter(lst-ctn-kix_list_7-4, lower-latin) ". "
          }
  
          .lst-kix_list_7-6>li:before {
              content: "" counter(lst-ctn-kix_list_7-6, decimal) ". "
          }
  
          ol.lst-kix_list_17-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-7.start {
              counter-reset: lst-ctn-kix_list_19-7 0
          }
  
          ol.lst-kix_list_17-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_6-2.start {
              counter-reset: lst-ctn-kix_list_6-2 0
          }
  
          .lst-kix_list_15-5>li {
              counter-increment: lst-ctn-kix_list_15-5
          }
  
          ol.lst-kix_list_17-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_24-1.start {
              counter-reset: lst-ctn-kix_list_24-1 0
          }
  
          ol.lst-kix_list_17-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_17-0 {
              list-style-type: none
          }
  
          .lst-kix_list_22-2>li {
              counter-increment: lst-ctn-kix_list_22-2
          }
  
          ol.lst-kix_list_17-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_17-2 {
              list-style-type: none
          }
  
          .lst-kix_list_7-2>li:before {
              content: "" counter(lst-ctn-kix_list_7-2, lower-roman) ". "
          }
  
          ol.lst-kix_list_17-3 {
              list-style-type: none
          }
  
          .lst-kix_list_7-6>li {
              counter-increment: lst-ctn-kix_list_7-6
          }
  
          ol.lst-kix_list_22-8.start {
              counter-reset: lst-ctn-kix_list_22-8 0
          }
  
          .lst-kix_list_12-6>li {
              counter-increment: lst-ctn-kix_list_12-6
          }
  
          .lst-kix_list_24-3>li {
              counter-increment: lst-ctn-kix_list_24-3
          }
  
          .lst-kix_list_13-7>li:before {
              content: "" counter(lst-ctn-kix_list_13-7, lower-latin) ". "
          }
  
          .lst-kix_list_7-8>li:before {
              content: "" counter(lst-ctn-kix_list_7-8, lower-roman) ". "
          }
  
          ol.lst-kix_list_23-0.start {
              counter-reset: lst-ctn-kix_list_23-0 0
          }
  
          .lst-kix_list_15-6>li {
              counter-increment: lst-ctn-kix_list_15-6
          }
  
          .lst-kix_list_4-7>li {
              counter-increment: lst-ctn-kix_list_4-7
          }
  
          ol.lst-kix_list_2-5.start {
              counter-reset: lst-ctn-kix_list_2-5 0
          }
  
          .lst-kix_list_15-5>li:before {
              content: "" counter(lst-ctn-kix_list_15-5, decimal) ". "
          }
  
          .lst-kix_list_9-8>li {
              counter-increment: lst-ctn-kix_list_9-8
          }
  
          .lst-kix_list_13-4>li {
              counter-increment: lst-ctn-kix_list_13-4
          }
  
          .lst-kix_list_4-1>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) "." counter(lst-ctn-kix_list_4-1, decimal) " "
          }
  
          .lst-kix_list_15-7>li:before {
              content: "" counter(lst-ctn-kix_list_15-7, decimal) ". "
          }
  
          .lst-kix_list_17-7>li {
              counter-increment: lst-ctn-kix_list_17-7
          }
  
          .lst-kix_list_4-3>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) "." counter(lst-ctn-kix_list_4-1, decimal) "." counter(lst-ctn-kix_list_4-2, decimal) "." counter(lst-ctn-kix_list_4-3, decimal) " "
          }
  
          .lst-kix_list_4-5>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) "." counter(lst-ctn-kix_list_4-1, decimal) "." counter(lst-ctn-kix_list_4-2, decimal) "." counter(lst-ctn-kix_list_4-3, decimal) "." counter(lst-ctn-kix_list_4-4, decimal) "." counter(lst-ctn-kix_list_4-5, decimal) " "
          }
  
          .lst-kix_list_1-8>li {
              counter-increment: lst-ctn-kix_list_1-8
          }
  
          .lst-kix_list_10-5>li {
              counter-increment: lst-ctn-kix_list_10-5
          }
  
          .lst-kix_list_15-1>li:before {
              content: "" counter(lst-ctn-kix_list_15-1, decimal) ". "
          }
  
          ol.lst-kix_list_1-4.start {
              counter-reset: lst-ctn-kix_list_1-4 0
          }
  
          .lst-kix_list_24-4>li {
              counter-increment: lst-ctn-kix_list_24-4
          }
  
          .lst-kix_list_15-3>li:before {
              content: "" counter(lst-ctn-kix_list_15-3, decimal) ". "
          }
  
          .lst-kix_list_22-1>li {
              counter-increment: lst-ctn-kix_list_22-1
          }
  
          ol.lst-kix_list_4-4.start {
              counter-reset: lst-ctn-kix_list_4-4 0
          }
  
          .lst-kix_list_16-2>li {
              counter-increment: lst-ctn-kix_list_16-2
          }
  
          ol.lst-kix_list_9-2.start {
              counter-reset: lst-ctn-kix_list_9-2 0
          }
  
          ol.lst-kix_list_16-7.start {
              counter-reset: lst-ctn-kix_list_16-7 0
          }
  
          .lst-kix_list_19-2>li {
              counter-increment: lst-ctn-kix_list_19-2
          }
  
          ol.lst-kix_list_8-8 {
              list-style-type: none
          }
  
          .lst-kix_list_12-3>li:before {
              content: "" counter(lst-ctn-kix_list_12-3, decimal) ". "
          }
  
          ol.lst-kix_list_8-4 {
              list-style-type: none
          }
  
          .lst-kix_list_12-1>li:before {
              content: "" counter(lst-ctn-kix_list_12-1, lower-latin) ". "
          }
  
          ol.lst-kix_list_8-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_8-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_8-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_8-0 {
              list-style-type: none
          }
  
          .lst-kix_list_16-3>li {
              counter-increment: lst-ctn-kix_list_16-3
          }
  
          ol.lst-kix_list_8-1 {
              list-style-type: none
          }
  
          .lst-kix_list_23-6>li {
              counter-increment: lst-ctn-kix_list_23-6
          }
  
          ol.lst-kix_list_8-2 {
              list-style-type: none
          }
  
          .lst-kix_list_13-3>li {
              counter-increment: lst-ctn-kix_list_13-3
          }
  
          ol.lst-kix_list_13-6.start {
              counter-reset: lst-ctn-kix_list_13-6 0
          }
  
          ol.lst-kix_list_8-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-8.start {
              counter-reset: lst-ctn-kix_list_25-8 0
          }
  
          .lst-kix_list_10-4>li {
              counter-increment: lst-ctn-kix_list_10-4
          }
  
          .lst-kix_list_21-4>li {
              counter-increment: lst-ctn-kix_list_21-4
          }
  
          .lst-kix_list_13-3>li:before {
              content: "" counter(lst-ctn-kix_list_13-3, decimal) ". "
          }
  
          .lst-kix_list_13-5>li:before {
              content: "" counter(lst-ctn-kix_list_13-5, lower-roman) ". "
          }
  
          .lst-kix_list_12-5>li:before {
              content: "" counter(lst-ctn-kix_list_12-5, lower-roman) ". "
          }
  
          ol.lst-kix_list_13-7.start {
              counter-reset: lst-ctn-kix_list_13-7 0
          }
  
          .lst-kix_list_12-7>li:before {
              content: "" counter(lst-ctn-kix_list_12-7, lower-latin) ". "
          }
  
          ol.lst-kix_list_21-1.start {
              counter-reset: lst-ctn-kix_list_21-1 0
          }
  
          .lst-kix_list_25-1>li {
              counter-increment: lst-ctn-kix_list_25-1
          }
  
          .lst-kix_list_13-1>li:before {
              content: "" counter(lst-ctn-kix_list_13-1, lower-latin) ". "
          }
  
          .lst-kix_list_22-8>li {
              counter-increment: lst-ctn-kix_list_22-8
          }
  
          ol.lst-kix_list_11-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_11-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_11-8 {
              list-style-type: none
          }
  
          .lst-kix_list_1-1>li {
              counter-increment: lst-ctn-kix_list_1-1
          }
  
          ol.lst-kix_list_11-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_2-6.start {
              counter-reset: lst-ctn-kix_list_2-6 0
          }
  
          .lst-kix_list_3-0>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) ". "
          }
  
          ol.lst-kix_list_11-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_11-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_13-1.start {
              counter-reset: lst-ctn-kix_list_13-1 0
          }
  
          ol.lst-kix_list_11-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_11-1 {
              list-style-type: none
          }
  
          .lst-kix_list_4-0>li {
              counter-increment: lst-ctn-kix_list_4-0
          }
  
          .lst-kix_list_3-4>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) "." counter(lst-ctn-kix_list_3-1, decimal) "." counter(lst-ctn-kix_list_3-2, decimal) "." counter(lst-ctn-kix_list_3-3, decimal) "." counter(lst-ctn-kix_list_3-4, decimal) ". "
          }
  
          .lst-kix_list_3-3>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) "." counter(lst-ctn-kix_list_3-1, decimal) "." counter(lst-ctn-kix_list_3-2, decimal) "." counter(lst-ctn-kix_list_3-3, decimal) ". "
          }
  
          .lst-kix_list_8-0>li:before {
              content: "" counter(lst-ctn-kix_list_8-0, lower-roman) ". "
          }
  
          .lst-kix_list_8-7>li:before {
              content: "" counter(lst-ctn-kix_list_8-7, lower-latin) ". "
          }
  
          .lst-kix_list_3-8>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) "." counter(lst-ctn-kix_list_3-1, decimal) "." counter(lst-ctn-kix_list_3-2, decimal) "." counter(lst-ctn-kix_list_3-3, decimal) "." counter(lst-ctn-kix_list_3-4, decimal) "." counter(lst-ctn-kix_list_3-5, decimal) "." counter(lst-ctn-kix_list_3-6, decimal) "." counter(lst-ctn-kix_list_3-7, decimal) "." counter(lst-ctn-kix_list_3-8, decimal) ". "
          }
  
          ol.lst-kix_list_10-7.start {
              counter-reset: lst-ctn-kix_list_10-7 0
          }
  
          .lst-kix_list_8-3>li:before {
              content: "" counter(lst-ctn-kix_list_8-3, decimal) ". "
          }
  
          ol.lst-kix_list_22-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_22-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_22-8 {
              list-style-type: none
          }
  
          .lst-kix_list_3-7>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) "." counter(lst-ctn-kix_list_3-1, decimal) "." counter(lst-ctn-kix_list_3-2, decimal) "." counter(lst-ctn-kix_list_3-3, decimal) "." counter(lst-ctn-kix_list_3-4, decimal) "." counter(lst-ctn-kix_list_3-5, decimal) "." counter(lst-ctn-kix_list_3-6, decimal) "." counter(lst-ctn-kix_list_3-7, decimal) ". "
          }
  
          ol.lst-kix_list_22-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_22-2 {
              list-style-type: none
          }
  
          .lst-kix_list_8-4>li:before {
              content: "" counter(lst-ctn-kix_list_8-4, lower-latin) ". "
          }
  
          ol.lst-kix_list_22-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_22-4 {
              list-style-type: none
          }
  
          .lst-kix_list_19-1>li {
              counter-increment: lst-ctn-kix_list_19-1
          }
  
          ol.lst-kix_list_22-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_22-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_8-5.start {
              counter-reset: lst-ctn-kix_list_8-5 0
          }
  
          .lst-kix_list_17-1>li {
              counter-increment: lst-ctn-kix_list_17-1
          }
  
          .lst-kix_list_11-1>li:before {
              content: "" counter(lst-ctn-kix_list_11-1, decimal) ". "
          }
  
          .lst-kix_list_11-0>li:before {
              content: "" counter(lst-ctn-kix_list_11-0, decimal) ". "
          }
  
          ol.lst-kix_list_9-3.start {
              counter-reset: lst-ctn-kix_list_9-3 0
          }
  
          .lst-kix_list_8-8>li:before {
              content: "" counter(lst-ctn-kix_list_8-8, lower-roman) ". "
          }
  
          ol.lst-kix_list_2-2 {
              list-style-type: none
          }
  
          .lst-kix_list_16-8>li:before {
              content: "" counter(lst-ctn-kix_list_16-8, decimal) ". "
          }
  
          ol.lst-kix_list_2-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_2-4 {
              list-style-type: none
          }
  
          .lst-kix_list_16-7>li:before {
              content: "" counter(lst-ctn-kix_list_16-7, decimal) ". "
          }
  
          ol.lst-kix_list_2-5 {
              list-style-type: none
          }
  
          .lst-kix_list_17-8>li {
              counter-increment: lst-ctn-kix_list_17-8
          }
  
          ol.lst-kix_list_2-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_2-1 {
              list-style-type: none
          }
  
          .lst-kix_list_4-8>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) "." counter(lst-ctn-kix_list_4-1, decimal) "." counter(lst-ctn-kix_list_4-2, decimal) "." counter(lst-ctn-kix_list_4-3, decimal) "." counter(lst-ctn-kix_list_4-4, decimal) "." counter(lst-ctn-kix_list_4-5, decimal) "." counter(lst-ctn-kix_list_4-6, decimal) "." counter(lst-ctn-kix_list_4-7, decimal) "." counter(lst-ctn-kix_list_4-8, decimal) " "
          }
  
          .lst-kix_list_21-5>li {
              counter-increment: lst-ctn-kix_list_21-5
          }
  
          .lst-kix_list_4-7>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) "." counter(lst-ctn-kix_list_4-1, decimal) "." counter(lst-ctn-kix_list_4-2, decimal) "." counter(lst-ctn-kix_list_4-3, decimal) "." counter(lst-ctn-kix_list_4-4, decimal) "." counter(lst-ctn-kix_list_4-5, decimal) "." counter(lst-ctn-kix_list_4-6, decimal) "." counter(lst-ctn-kix_list_4-7, decimal) " "
          }
  
          .lst-kix_list_17-0>li:before {
              content: "" counter(lst-ctn-kix_list_17-0, upper-roman) ". "
          }
  
          .lst-kix_list_16-0>li:before {
              content: "" counter(lst-ctn-kix_list_16-0, decimal) ". "
          }
  
          ol.lst-kix_list_4-8.start {
              counter-reset: lst-ctn-kix_list_4-8 0
          }
  
          .lst-kix_list_8-4>li {
              counter-increment: lst-ctn-kix_list_8-4
          }
  
          .lst-kix_list_16-4>li:before {
              content: "" counter(lst-ctn-kix_list_16-4, decimal) ". "
          }
  
          ol.lst-kix_list_3-3.start {
              counter-reset: lst-ctn-kix_list_3-3 0
          }
  
          .lst-kix_list_16-3>li:before {
              content: "" counter(lst-ctn-kix_list_16-3, decimal) ". "
          }
  
          ol.lst-kix_list_2-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_2-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_2-8 {
              list-style-type: none
          }
  
          .lst-kix_list_11-3>li {
              counter-increment: lst-ctn-kix_list_11-3
          }
  
          ol.lst-kix_list_8-6.start {
              counter-reset: lst-ctn-kix_list_8-6 0
          }
  
          .lst-kix_list_17-7>li:before {
              content: "" counter(lst-ctn-kix_list_17-7, lower-latin) ". "
          }
  
          .lst-kix_list_17-8>li:before {
              content: "" counter(lst-ctn-kix_list_17-8, lower-roman) ". "
          }
  
          .lst-kix_list_17-3>li:before {
              content: "" counter(lst-ctn-kix_list_17-3, decimal) ". "
          }
  
          .lst-kix_list_17-4>li:before {
              content: "" counter(lst-ctn-kix_list_17-4, lower-latin) ". "
          }
  
          ol.lst-kix_list_8-0.start {
              counter-reset: lst-ctn-kix_list_8-0 0
          }
  
          .lst-kix_list_7-0>li:before {
              content: "" counter(lst-ctn-kix_list_7-0, lower-roman) ". "
          }
  
          ol.lst-kix_list_19-6.start {
              counter-reset: lst-ctn-kix_list_19-6 0
          }
  
          ol.lst-kix_list_9-7.start {
              counter-reset: lst-ctn-kix_list_9-7 0
          }
  
          ol.lst-kix_list_13-8 {
              list-style-type: none
          }
  
          .lst-kix_list_2-4>li:before {
              content: "" counter(lst-ctn-kix_list_2-4, lower-latin) ". "
          }
  
          .lst-kix_list_2-8>li:before {
              content: "" counter(lst-ctn-kix_list_2-8, lower-roman) ". "
          }
  
          ol.lst-kix_list_13-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_13-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_13-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_13-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_13-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_13-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_13-2 {
              list-style-type: none
          }
  
          .lst-kix_list_7-3>li:before {
              content: "" counter(lst-ctn-kix_list_7-3, decimal) ". "
          }
  
          ol.lst-kix_list_13-3 {
              list-style-type: none
          }
  
          .lst-kix_list_10-0>li:before {
              content: "" counter(lst-ctn-kix_list_10-0, decimal) ". "
          }
  
          .lst-kix_list_9-7>li {
              counter-increment: lst-ctn-kix_list_9-7
          }
  
          ol.lst-kix_list_21-7.start {
              counter-reset: lst-ctn-kix_list_21-7 0
          }
  
          .lst-kix_list_13-8>li:before {
              content: "" counter(lst-ctn-kix_list_13-8, lower-roman) ". "
          }
  
          .lst-kix_list_18-3>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_18-7>li:before {
              content: "\0025aa  "
          }
  
          ol.lst-kix_list_3-8.start {
              counter-reset: lst-ctn-kix_list_3-8 0
          }
  
          .lst-kix_list_7-7>li:before {
              content: "" counter(lst-ctn-kix_list_7-7, lower-latin) ". "
          }
  
          ol.lst-kix_list_8-1.start {
              counter-reset: lst-ctn-kix_list_8-1 0
          }
  
          .lst-kix_list_15-4>li:before {
              content: "" counter(lst-ctn-kix_list_15-4, decimal) ". "
          }
  
          ol.lst-kix_list_19-1.start {
              counter-reset: lst-ctn-kix_list_19-1 0
          }
  
          ol.lst-kix_list_24-8 {
              list-style-type: none
          }
  
          .lst-kix_list_10-4>li:before {
              content: "" counter(lst-ctn-kix_list_10-4, lower-latin) ". "
          }
  
          .lst-kix_list_10-8>li:before {
              content: "" counter(lst-ctn-kix_list_10-8, lower-roman) ". "
          }
  
          .lst-kix_list_4-0>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) " "
          }
  
          ol.lst-kix_list_24-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_24-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_24-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_25-2.start {
              counter-reset: lst-ctn-kix_list_25-2 0
          }
  
          .lst-kix_list_15-0>li:before {
              content: "" counter(lst-ctn-kix_list_15-0, decimal) ". "
          }
  
          .lst-kix_list_15-8>li:before {
              content: "" counter(lst-ctn-kix_list_15-8, decimal) ". "
          }
  
          ol.lst-kix_list_24-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_24-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_24-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_24-3 {
              list-style-type: none
          }
  
          .lst-kix_list_15-7>li {
              counter-increment: lst-ctn-kix_list_15-7
          }
  
          ol.lst-kix_list_24-2 {
              list-style-type: none
          }
  
          .lst-kix_list_4-4>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) "." counter(lst-ctn-kix_list_4-1, decimal) "." counter(lst-ctn-kix_list_4-2, decimal) "." counter(lst-ctn-kix_list_4-3, decimal) "." counter(lst-ctn-kix_list_4-4, decimal) " "
          }
  
          .lst-kix_list_9-3>li:before {
              content: "" counter(lst-ctn-kix_list_9-3, decimal) ". "
          }
  
          ol.lst-kix_list_7-0.start {
              counter-reset: lst-ctn-kix_list_7-0 0
          }
  
          .lst-kix_list_12-8>li {
              counter-increment: lst-ctn-kix_list_12-8
          }
  
          ol.lst-kix_list_13-2.start {
              counter-reset: lst-ctn-kix_list_13-2 0
          }
  
          ol.lst-kix_list_4-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_4-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_4-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_4-3 {
              list-style-type: none
          }
  
          .lst-kix_list_9-7>li:before {
              content: "" counter(lst-ctn-kix_list_9-7, lower-latin) ". "
          }
  
          .lst-kix_list_2-4>li {
              counter-increment: lst-ctn-kix_list_2-4
          }
  
          ol.lst-kix_list_3-6.start {
              counter-reset: lst-ctn-kix_list_3-6 0
          }
  
          .lst-kix_list_11-4>li:before {
              content: "" counter(lst-ctn-kix_list_11-4, decimal) ". "
          }
  
          .lst-kix_list_12-4>li:before {
              content: "" counter(lst-ctn-kix_list_12-4, lower-latin) ". "
          }
  
          .lst-kix_list_5-3>li {
              counter-increment: lst-ctn-kix_list_5-3
          }
  
          ol.lst-kix_list_4-8 {
              list-style-type: none
          }
  
          .lst-kix_list_7-4>li {
              counter-increment: lst-ctn-kix_list_7-4
          }
  
          .lst-kix_list_1-0>li:before {
              content: "" counter(lst-ctn-kix_list_1-0, decimal) ". "
          }
  
          ol.lst-kix_list_19-2.start {
              counter-reset: lst-ctn-kix_list_19-2 0
          }
  
          ol.lst-kix_list_4-4 {
              list-style-type: none
          }
  
          .lst-kix_list_11-8>li:before {
              content: "" counter(lst-ctn-kix_list_11-8, decimal) ". "
          }
  
          ol.lst-kix_list_4-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_2-0.start {
              counter-reset: lst-ctn-kix_list_2-0 0
          }
  
          ol.lst-kix_list_4-6 {
              list-style-type: none
          }
  
          .lst-kix_list_12-0>li:before {
              content: "(" counter(lst-ctn-kix_list_12-0, lower-latin) ") "
          }
  
          ol.lst-kix_list_4-7 {
              list-style-type: none
          }
  
          .lst-kix_list_1-4>li:before {
              content: "" counter(lst-ctn-kix_list_1-4, lower-latin) ". "
          }
  
          .lst-kix_list_13-0>li:before {
              content: "(" counter(lst-ctn-kix_list_13-0, lower-latin) ") "
          }
  
          .lst-kix_list_1-6>li {
              counter-increment: lst-ctn-kix_list_1-6
          }
  
          .lst-kix_list_13-4>li:before {
              content: "" counter(lst-ctn-kix_list_13-4, lower-latin) ". "
          }
  
          ol.lst-kix_list_19-3.start {
              counter-reset: lst-ctn-kix_list_19-3 0
          }
  
          .lst-kix_list_2-0>li:before {
              content: "" counter(lst-ctn-kix_list_2-0, decimal) ". "
          }
  
          ol.lst-kix_list_2-1.start {
              counter-reset: lst-ctn-kix_list_2-1 0
          }
  
          .lst-kix_list_4-5>li {
              counter-increment: lst-ctn-kix_list_4-5
          }
  
          ol.lst-kix_list_9-8.start {
              counter-reset: lst-ctn-kix_list_9-8 0
          }
  
          .lst-kix_list_1-8>li:before {
              content: "" counter(lst-ctn-kix_list_1-8, lower-roman) ". "
          }
  
          .lst-kix_list_12-8>li:before {
              content: "" counter(lst-ctn-kix_list_12-8, lower-roman) ". "
          }
  
          .lst-kix_list_8-2>li {
              counter-increment: lst-ctn-kix_list_8-2
          }
  
          ul.lst-kix_list_20-2 {
              list-style-type: none
          }
  
          ul.lst-kix_list_20-3 {
              list-style-type: none
          }
  
          .lst-kix_list_19-0>li:before {
              content: "" counter(lst-ctn-kix_list_19-0, decimal) ". "
          }
  
          ul.lst-kix_list_20-4 {
              list-style-type: none
          }
  
          ul.lst-kix_list_20-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_17-7.start {
              counter-reset: lst-ctn-kix_list_17-7 0
          }
  
          ul.lst-kix_list_20-6 {
              list-style-type: none
          }
  
          ul.lst-kix_list_20-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-6.start {
              counter-reset: lst-ctn-kix_list_12-6 0
          }
  
          ul.lst-kix_list_20-8 {
              list-style-type: none
          }
  
          .lst-kix_list_23-8>li {
              counter-increment: lst-ctn-kix_list_23-8
          }
  
          .lst-kix_list_8-1>li {
              counter-increment: lst-ctn-kix_list_8-1
          }
  
          ol.lst-kix_list_8-2.start {
              counter-reset: lst-ctn-kix_list_8-2 0
          }
  
          .lst-kix_list_19-2>li:before {
              content: "" counter(lst-ctn-kix_list_19-2, decimal) ". "
          }
  
          ol.lst-kix_list_3-1.start {
              counter-reset: lst-ctn-kix_list_3-1 0
          }
  
          ul.lst-kix_list_20-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_21-0.start {
              counter-reset: lst-ctn-kix_list_21-0 1
          }
  
          ul.lst-kix_list_20-1 {
              list-style-type: none
          }
  
          .lst-kix_list_7-0>li {
              counter-increment: lst-ctn-kix_list_7-0
          }
  
          .lst-kix_list_19-0>li {
              counter-increment: lst-ctn-kix_list_19-0
          }
  
          .lst-kix_list_2-3>li {
              counter-increment: lst-ctn-kix_list_2-3
          }
  
          ol.lst-kix_list_19-8.start {
              counter-reset: lst-ctn-kix_list_19-8 0
          }
  
          .lst-kix_list_1-2>li {
              counter-increment: lst-ctn-kix_list_1-2
          }
  
          .lst-kix_list_19-8>li:before {
              content: "" counter(lst-ctn-kix_list_19-8, decimal) ". "
          }
  
          .lst-kix_list_19-5>li:before {
              content: "" counter(lst-ctn-kix_list_19-5, decimal) ". "
          }
  
          .lst-kix_list_19-7>li:before {
              content: "" counter(lst-ctn-kix_list_19-7, decimal) ". "
          }
  
          .lst-kix_list_9-2>li {
              counter-increment: lst-ctn-kix_list_9-2
          }
  
          ol.lst-kix_list_23-8.start {
              counter-reset: lst-ctn-kix_list_23-8 0
          }
  
          .lst-kix_list_24-5>li {
              counter-increment: lst-ctn-kix_list_24-5
          }
  
          ol.lst-kix_list_17-2.start {
              counter-reset: lst-ctn-kix_list_17-2 0
          }
  
          .lst-kix_list_13-2>li {
              counter-increment: lst-ctn-kix_list_13-2
          }
  
          ol.lst-kix_list_21-5.start {
              counter-reset: lst-ctn-kix_list_21-5 0
          }
  
          .lst-kix_list_19-7>li {
              counter-increment: lst-ctn-kix_list_19-7
          }
  
          ol.lst-kix_list_15-6.start {
              counter-reset: lst-ctn-kix_list_15-6 0
          }
  
          .lst-kix_list_25-6>li {
              counter-increment: lst-ctn-kix_list_25-6
          }
  
          .lst-kix_list_12-1>li {
              counter-increment: lst-ctn-kix_list_12-1
          }
  
          .lst-kix_list_18-1>li:before {
              content: "o  "
          }
  
          ol.lst-kix_list_25-4.start {
              counter-reset: lst-ctn-kix_list_25-4 0
          }
  
          .lst-kix_list_23-4>li {
              counter-increment: lst-ctn-kix_list_23-4
          }
  
          ol.lst-kix_list_23-1.start {
              counter-reset: lst-ctn-kix_list_23-1 0
          }
  
          ol.lst-kix_list_2-4.start {
              counter-reset: lst-ctn-kix_list_2-4 0
          }
  
          .lst-kix_list_23-1>li {
              counter-increment: lst-ctn-kix_list_23-1
          }
  
          ol.lst-kix_list_1-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_1-4 {
              list-style-type: none
          }
  
          .lst-kix_list_2-7>li:before {
              content: "" counter(lst-ctn-kix_list_2-7, lower-latin) ". "
          }
  
          .lst-kix_list_2-7>li {
              counter-increment: lst-ctn-kix_list_2-7
          }
  
          ol.lst-kix_list_1-5 {
              list-style-type: none
          }
  
          .lst-kix_list_24-2>li {
              counter-increment: lst-ctn-kix_list_24-2
          }
  
          ol.lst-kix_list_1-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_1-0 {
              list-style-type: none
          }
  
          .lst-kix_list_2-5>li:before {
              content: "" counter(lst-ctn-kix_list_2-5, lower-roman) ". "
          }
  
          ol.lst-kix_list_1-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_1-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_17-0.start {
              counter-reset: lst-ctn-kix_list_17-0 0
          }
  
          ol.lst-kix_list_10-3.start {
              counter-reset: lst-ctn-kix_list_10-3 0
          }
  
          .lst-kix_list_22-3>li {
              counter-increment: lst-ctn-kix_list_22-3
          }
  
          .lst-kix_list_18-6>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_10-1>li:before {
              content: "" counter(lst-ctn-kix_list_10-1, lower-latin) ". "
          }
  
          .lst-kix_list_18-4>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_7-7>li {
              counter-increment: lst-ctn-kix_list_7-7
          }
  
          ol.lst-kix_list_15-1.start {
              counter-reset: lst-ctn-kix_list_15-1 0
          }
  
          ol.lst-kix_list_15-4.start {
              counter-reset: lst-ctn-kix_list_15-4 0
          }
  
          ol.lst-kix_list_1-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_1-8 {
              list-style-type: none
          }
  
          li.li-bullet-1:before {
              margin-left: -23pt;
              white-space: nowrap;
              display: inline-block;
              min-width: 23pt
          }
  
          .lst-kix_list_10-3>li:before {
              content: "" counter(lst-ctn-kix_list_10-3, decimal) ". "
          }
  
          .lst-kix_list_15-4>li {
              counter-increment: lst-ctn-kix_list_15-4
          }
  
          .lst-kix_list_2-6>li {
              counter-increment: lst-ctn-kix_list_2-6
          }
  
          ol.lst-kix_list_7-3.start {
              counter-reset: lst-ctn-kix_list_7-3 0
          }
  
          ul.lst-kix_list_11-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_5-7.start {
              counter-reset: lst-ctn-kix_list_5-7 0
          }
  
          .lst-kix_list_20-8>li:before {
              content: "\0025aa  "
          }
  
          .lst-kix_list_3-4>li {
              counter-increment: lst-ctn-kix_list_3-4
          }
  
          .lst-kix_list_20-0>li:before {
              content: "\0025cf  "
          }
  
          ol.lst-kix_list_10-7 {
              list-style-type: none
          }
  
          .lst-kix_list_9-6>li:before {
              content: "" counter(lst-ctn-kix_list_9-6, decimal) ". "
          }
  
          ol.lst-kix_list_10-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_10-3 {
              list-style-type: none
          }
  
          .lst-kix_list_9-4>li:before {
              content: "" counter(lst-ctn-kix_list_9-4, lower-latin) ". "
          }
  
          ol.lst-kix_list_10-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_10-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_10-6 {
              list-style-type: none
          }
  
          .lst-kix_list_20-6>li:before {
              content: "\0025cf  "
          }
  
          .lst-kix_list_23-0>li {
              counter-increment: lst-ctn-kix_list_23-0
          }
  
          ol.lst-kix_list_10-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_10-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_10-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_12-1.start {
              counter-reset: lst-ctn-kix_list_12-1 0
          }
  
          .lst-kix_list_11-5>li:before {
              content: "" counter(lst-ctn-kix_list_11-5, decimal) ". "
          }
  
          ol.lst-kix_list_21-2.start {
              counter-reset: lst-ctn-kix_list_21-2 0
          }
  
          .lst-kix_list_1-1>li:before {
              content: "" counter(lst-ctn-kix_list_1-1, lower-latin) ". "
          }
  
          .lst-kix_list_11-7>li:before {
              content: "" counter(lst-ctn-kix_list_11-7, decimal) ". "
          }
  
          .lst-kix_list_8-5>li {
              counter-increment: lst-ctn-kix_list_8-5
          }
  
          ol.lst-kix_list_25-7.start {
              counter-reset: lst-ctn-kix_list_25-7 0
          }
  
          .lst-kix_list_1-3>li:before {
              content: "" counter(lst-ctn-kix_list_1-3, decimal) ". "
          }
  
          ol.lst-kix_list_10-5.start {
              counter-reset: lst-ctn-kix_list_10-5 0
          }
  
          ol.lst-kix_list_21-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_21-7 {
              list-style-type: none
          }
  
          ol.lst-kix_list_2-7.start {
              counter-reset: lst-ctn-kix_list_2-7 0
          }
  
          ol.lst-kix_list_21-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_21-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_21-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_21-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_21-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-5.start {
              counter-reset: lst-ctn-kix_list_7-5 0
          }
  
          ol.lst-kix_list_21-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_21-1 {
              list-style-type: none
          }
  
          .lst-kix_list_25-7>li {
              counter-increment: lst-ctn-kix_list_25-7
          }
  
          ol.lst-kix_list_19-6 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-7 {
              list-style-type: none
          }
  
          .lst-kix_list_3-1>li {
              counter-increment: lst-ctn-kix_list_3-1
          }
  
          ol.lst-kix_list_19-8 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-2 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-3 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-4 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-5 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-0 {
              list-style-type: none
          }
  
          ol.lst-kix_list_19-1 {
              list-style-type: none
          }
  
          ol.lst-kix_list_7-7.start {
              counter-reset: lst-ctn-kix_list_7-7 0
          }
  
          .lst-kix_list_3-1>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) "." counter(lst-ctn-kix_list_3-1, decimal) ". "
          }
  
          ol.lst-kix_list_17-4.start {
              counter-reset: lst-ctn-kix_list_17-4 0
          }
  
          .lst-kix_list_8-2>li:before {
              content: "" counter(lst-ctn-kix_list_8-2, lower-roman) ". "
          }
  
          .lst-kix_list_12-0>li {
              counter-increment: lst-ctn-kix_list_12-0
          }
  
          ol.lst-kix_list_12-3.start {
              counter-reset: lst-ctn-kix_list_12-3 0
          }
  
          .lst-kix_list_21-2>li:before {
              content: "" counter(lst-ctn-kix_list_21-2, decimal) ". "
          }
  
          .lst-kix_list_8-5>li:before {
              content: "" counter(lst-ctn-kix_list_8-5, lower-roman) ". "
          }
  
          .lst-kix_list_2-0>li {
              counter-increment: lst-ctn-kix_list_2-0
          }
  
          .lst-kix_list_15-1>li {
              counter-increment: lst-ctn-kix_list_15-1
          }
  
          .lst-kix_list_3-6>li:before {
              content: "" counter(lst-ctn-kix_list_3-0, decimal) "." counter(lst-ctn-kix_list_3-1, decimal) "." counter(lst-ctn-kix_list_3-2, decimal) "." counter(lst-ctn-kix_list_3-3, decimal) "." counter(lst-ctn-kix_list_3-4, decimal) "." counter(lst-ctn-kix_list_3-5, decimal) "." counter(lst-ctn-kix_list_3-6, decimal) ". "
          }
  
          .lst-kix_list_21-7>li:before {
              content: "" counter(lst-ctn-kix_list_21-7, decimal) ". "
          }
  
          ol.lst-kix_list_5-0.start {
              counter-reset: lst-ctn-kix_list_5-0 0
          }
  
          .lst-kix_list_11-2>li:before {
              content: "\0025aa  "
          }
  
          ol.lst-kix_list_12-4.start {
              counter-reset: lst-ctn-kix_list_12-4 0
          }
  
          .lst-kix_list_16-6>li:before {
              content: "" counter(lst-ctn-kix_list_16-6, decimal) ". "
          }
  
          ol.lst-kix_list_10-1.start {
              counter-reset: lst-ctn-kix_list_10-1 0
          }
  
          .lst-kix_list_25-2>li:before {
              content: "" counter(lst-ctn-kix_list_25-2, decimal) ". "
          }
  
          ol.lst-kix_list_5-6.start {
              counter-reset: lst-ctn-kix_list_5-6 0
          }
  
          .lst-kix_list_22-6>li {
              counter-increment: lst-ctn-kix_list_22-6
          }
  
          .lst-kix_list_16-1>li:before {
              content: "" counter(lst-ctn-kix_list_16-1, decimal) ". "
          }
  
          .lst-kix_list_7-3>li {
              counter-increment: lst-ctn-kix_list_7-3
          }
  
          .lst-kix_list_25-0>li {
              counter-increment: lst-ctn-kix_list_25-0
          }
  
          .lst-kix_list_19-3>li {
              counter-increment: lst-ctn-kix_list_19-3
          }
  
          ol.lst-kix_list_7-8.start {
              counter-reset: lst-ctn-kix_list_7-8 0
          }
  
          .lst-kix_list_12-4>li {
              counter-increment: lst-ctn-kix_list_12-4
          }
  
          .lst-kix_list_23-7>li {
              counter-increment: lst-ctn-kix_list_23-7
          }
  
          ol.lst-kix_list_10-2.start {
              counter-reset: lst-ctn-kix_list_10-2 0
          }
  
          .lst-kix_list_12-7>li {
              counter-increment: lst-ctn-kix_list_12-7
          }
  
          .lst-kix_list_17-2>li:before {
              content: "" counter(lst-ctn-kix_list_17-2, lower-roman) ". "
          }
  
          ol.lst-kix_list_5-5.start {
              counter-reset: lst-ctn-kix_list_5-5 0
          }
  
          ol.lst-kix_list_17-3.start {
              counter-reset: lst-ctn-kix_list_17-3 0
          }
  
          .lst-kix_list_17-5>li:before {
              content: "" counter(lst-ctn-kix_list_17-5, lower-roman) ". "
          }
  
          .lst-kix_list_6-2>li {
              counter-increment: lst-ctn-kix_list_6-2
          }
  
          .lst-kix_list_22-3>li:before {
              content: "" counter(lst-ctn-kix_list_22-0, decimal) "." counter(lst-ctn-kix_list_22-1, decimal) "." counter(lst-ctn-kix_list_22-2, decimal) "." counter(lst-ctn-kix_list_22-3, decimal) " "
          }
  
          .lst-kix_list_7-1>li:before {
              content: "" counter(lst-ctn-kix_list_7-1, lower-latin) ". "
          }
  
          .lst-kix_list_13-5>li {
              counter-increment: lst-ctn-kix_list_13-5
          }
  
          .lst-kix_list_9-6>li {
              counter-increment: lst-ctn-kix_list_9-6
          }
  
          ol.lst-kix_list_23-3.start {
              counter-reset: lst-ctn-kix_list_23-3 0
          }
  
          ol.lst-kix_list_5-4.start {
              counter-reset: lst-ctn-kix_list_5-4 0
          }
  
          ol.lst-kix_list_5-1.start {
              counter-reset: lst-ctn-kix_list_5-1 0
          }
  
          .lst-kix_list_25-3>li {
              counter-increment: lst-ctn-kix_list_25-3
          }
  
          .lst-kix_list_16-6>li {
              counter-increment: lst-ctn-kix_list_16-6
          }
  
          .lst-kix_list_11-6>li {
              counter-increment: lst-ctn-kix_list_11-6
          }
  
          ol.lst-kix_list_10-0.start {
              counter-reset: lst-ctn-kix_list_10-0 0
          }
  
          ol.lst-kix_list_17-8.start {
              counter-reset: lst-ctn-kix_list_17-8 0
          }
  
          .lst-kix_list_3-8>li {
              counter-increment: lst-ctn-kix_list_3-8
          }
  
          .lst-kix_list_4-6>li {
              counter-increment: lst-ctn-kix_list_4-6
          }
  
          .lst-kix_list_1-5>li {
              counter-increment: lst-ctn-kix_list_1-5
          }
  
          ol.lst-kix_list_17-5.start {
              counter-reset: lst-ctn-kix_list_17-5 0
          }
  
          .lst-kix_list_4-2>li:before {
              content: "" counter(lst-ctn-kix_list_4-0, decimal) "." counter(lst-ctn-kix_list_4-1, decimal) "." counter(lst-ctn-kix_list_4-2, decimal) " "
          }
  
          ol.lst-kix_list_23-6.start {
              counter-reset: lst-ctn-kix_list_23-6 0
          }
  
          .lst-kix_list_17-4>li {
              counter-increment: lst-ctn-kix_list_17-4
          }
  
          .lst-kix_list_15-2>li:before {
              content: "" counter(lst-ctn-kix_list_15-2, decimal) ". "
          }
  
          .lst-kix_list_10-8>li {
              counter-increment: lst-ctn-kix_list_10-8
          }
  
          .lst-kix_list_10-6>li:before {
              content: "" counter(lst-ctn-kix_list_10-6, decimal) ". "
          }
  
          .lst-kix_list_9-1>li:before {
              content: "" counter(lst-ctn-kix_list_9-1, lower-latin) ". "
          }
  
          ol.lst-kix_list_12-7.start {
              counter-reset: lst-ctn-kix_list_12-7 0
          }
  
          .lst-kix_list_15-8>li {
              counter-increment: lst-ctn-kix_list_15-8
          }
  
          ol.lst-kix_list_12-8.start {
              counter-reset: lst-ctn-kix_list_12-8 0
          }
  
          .lst-kix_list_20-3>li:before {
              content: "\0025cf  "
          }
  
          ol.lst-kix_list_23-5.start {
              counter-reset: lst-ctn-kix_list_23-5 0
          }
  
          .lst-kix_list_21-1>li {
              counter-increment: lst-ctn-kix_list_21-1
          }
  
          .lst-kix_list_10-1>li {
              counter-increment: lst-ctn-kix_list_10-1
          }
  
          .lst-kix_list_8-8>li {
              counter-increment: lst-ctn-kix_list_8-8
          }
  
          ol.lst-kix_list_17-6.start {
              counter-reset: lst-ctn-kix_list_17-6 0
          }
  
          .lst-kix_list_1-6>li:before {
              content: "" counter(lst-ctn-kix_list_1-6, decimal) ". "
          }
  
          .lst-kix_list_12-6>li:before {
              content: "" counter(lst-ctn-kix_list_12-6, decimal) ". "
          }
  
          ol.lst-kix_list_23-4.start {
              counter-reset: lst-ctn-kix_list_23-4 0
          }
  
          .lst-kix_list_2-2>li:before {
              content: "" counter(lst-ctn-kix_list_2-2, lower-roman) ". "
          }
  
          .lst-kix_list_13-2>li:before {
              content: "" counter(lst-ctn-kix_list_13-2, lower-roman) ". "
          }
  
          ol.lst-kix_list_5-2.start {
              counter-reset: lst-ctn-kix_list_5-2 0
          }
  
          ol {
              margin: 0;
              padding: 0
          }
  
          table td,
          table th {
              padding: 0
          }
  
          .c7 {
              color: #000000;
              font-weight: 700;
              text-decoration: none;
              vertical-align: baseline;
              font-size: 12pt;
              font-family: "Arial";
              font-style: normal
          }
  
          .c10 {
              color: #000000;
              font-weight: 400;
              text-decoration: none;
              vertical-align: baseline;
              font-size: 12pt;
              font-family: "Times";
              font-style: normal
          }
  
          .c0 {
              color: #000000;
              font-weight: 400;
              text-decoration: none;
              vertical-align: baseline;
              font-size: 12pt;
              font-family: "Times New Roman";
              font-style: normal
          }
  
          .c16 {
              color: #000000;
              font-weight: 400;
              text-decoration: none;
              vertical-align: baseline;
              font-size: 12pt;
              font-family: "Arial";
              font-style: italic
          }
  
          .c5 {
              color: #000000;
              font-weight: 400;
              text-decoration: none;
              vertical-align: baseline;
              font-size: 12pt;
              font-family: "ArialMT";
              font-style: normal
          }
  
          .c1 {
              padding-top: 0pt;
              padding-bottom: 0pt;
              line-height: 1.0;
              orphans: 2;
              widows: 2;
              text-align: left
          }
  
          .c17 {
              text-decoration: none;
              vertical-align: baseline;
              font-size: 12pt;
              font-style: normal
          }
  
          .c13 {
              font-family: "Times";
              font-style: italic;
              color: #000000;
              font-weight: 400
          }
  
          .c14 {
              font-family: "Times New Roman";
              color: #000000;
              font-weight: 700
          }
  
          .c15 {
              background-color: #ffffff;
              max-width: 468pt;
              padding: 72pt 72pt 72pt 72pt
          }
  
          .c18 {
              font-weight: 400;
              font-family: "ArialMT"
          }
  
          .c4 {
              padding: 0;
              margin: 0
          }
  
          .c3 {
              margin-left: 18pt
          }
  
          .c8 {
              margin-left: 72pt
          }
  
          .c2 {
              margin-left: 36pt
          }
  
          .c6 {
              padding-left: 0pt
          }
  
          .c11 {
              padding-left: 5pt
          }
  
          .c9 {
              height: 12pt
          }
  
          .c12 {
              margin-left: 81.8pt
          }
  
          .title {
              padding-top: 24pt;
              color: #000000;
              font-weight: 700;
              font-size: 36pt;
              padding-bottom: 6pt;
              font-family: "Times New Roman";
              line-height: 1.0;
              page-break-after: avoid;
              orphans: 2;
              widows: 2;
              text-align: left
          }
  
          .subtitle {
              padding-top: 18pt;
              color: #666666;
              font-size: 24pt;
              padding-bottom: 4pt;
              font-family: "Georgia";
              line-height: 1.0;
              page-break-after: avoid;
              font-style: italic;
              orphans: 2;
              widows: 2;
              text-align: left
          }
  
          li {
              color: #000000;
              font-size: 12pt;
              font-family: "Times New Roman"
          }
  
          p {
              margin: 0;
              color: #000000;
              font-size: 12pt;
              font-family: "Times New Roman"
          }
  
          h1 {
              padding-top: 24pt;
              color: #000000;
              font-weight: 700;
              font-size: 24pt;
              padding-bottom: 6pt;
              font-family: "Times New Roman";
              line-height: 1.0;
              page-break-after: avoid;
              orphans: 2;
              widows: 2;
              text-align: left
          }
  
          h2 {
              padding-top: 18pt;
              color: #000000;
              font-weight: 700;
              font-size: 18pt;
              padding-bottom: 4pt;
              font-family: "Times New Roman";
              line-height: 1.0;
              page-break-after: avoid;
              orphans: 2;
              widows: 2;
              text-align: left
          }
  
          h3 {
              padding-top: 14pt;
              color: #000000;
              font-weight: 700;
              font-size: 14pt;
              padding-bottom: 4pt;
              font-family: "Times New Roman";
              line-height: 1.0;
              page-break-after: avoid;
              orphans: 2;
              widows: 2;
              text-align: left
          }
  
          h4 {
              padding-top: 12pt;
              color: #000000;
              font-weight: 700;
              font-size: 12pt;
              padding-bottom: 2pt;
              font-family: "Times New Roman";
              line-height: 1.0;
              page-break-after: avoid;
              orphans: 2;
              widows: 2;
              text-align: left
          }
  
          h5 {
              padding-top: 11pt;
              color: #000000;
              font-weight: 700;
              font-size: 11pt;
              padding-bottom: 2pt;
              font-family: "Times New Roman";
              line-height: 1.0;
              page-break-after: avoid;
              orphans: 2;
              widows: 2;
              text-align: left
          }
  
          h6 {
              padding-top: 10pt;
              color: #000000;
              font-weight: 700;
              font-size: 10pt;
              padding-bottom: 2pt;
              font-family: "Times New Roman";
              line-height: 1.0;
              page-break-after: avoid;
              orphans: 2;
              widows: 2;
              text-align: left
          }
      </style>
  </head>
  
  <body class="c15 doc-content">
      <p class="c1 c9"><span class="c0"></span></p>
      <p class="c1"><span class="c14">PART I </span></p>
      <p class="c1"><span class="c14">GENERALAL PROVISIONS </span></p>
      <p class="c1"><span class="c13">Article 1 </span></p>
      <p class="c1"><span class="c7">ANTI-DISCRIMINATION AND ANTI-HARASSMENT </span></p>
      <p class="c1"><span class="c5">1.1 &nbsp;</span><span class="c7">Complaint Process </span></p>
      <ol class="c4 lst-kix_list_13-0 start" start="1">
          <li class="c1 c2 c6 li-bullet-0"><span class="c5">The Employer and the Union agree that all employees of the
                  University are responsible to adhere to the University&rsquo;s policies on human rights as well as those
                  on the prevention of workplace/sexual violence and workplace/sexual harassment. </span></li>
      </ol>
      <ol class="c4 lst-kix_list_13-1 start" start="1">
          <li class="c1 c8 c6 li-bullet-0"><span class="c5">Carleton University&rsquo;s Human Rights Policies and
                  Procedures </span><span class="c16">(</span><span class="c5">including such Discrimination and
                  Harassment Policies as the Sexual Harassment Prevention Policy at Part IV s.4); </span></li>
          <li class="c1 c8 c6 li-bullet-0"><span class="c5">Carleton&rsquo;s Workplace Harassment Prevention Policy; .
              </span></li>
      </ol>
      <ol class="c4 lst-kix_list_13-0" start="2">
          <li class="c1 c2 c6 li-bullet-0"><span class="c5">A copy of the following documents shall be retained on the
                  University website; in Human Resources; and in the Union Office: </span></li>
      </ol>
      <ul class="c4 lst-kix_list_14-0 start">
          <li class="c1 c6 c12 li-bullet-0"><span class="c5">Carleton</span><span class="c18">&rsquo;</span><span
                  class="c5">s Workplace Harassment Prevention Program; </span></li>
          <li class="c1 c6 c12 li-bullet-0"><span class="c5">Carleton&rsquo;s Workplace Violence Prevention Policy;
              </span></li>
          <li class="c1 c6 c12 li-bullet-0"><span class="c5">Carleton&rsquo;s Workplace Violence Prevention Program;
              </span></li>
      </ul>
      <p class="c1"><span class="c5">1.2 </span><span class="c0">&nbsp;</span><span class="c7">Consideration for CUASA
              Position </span></p>
      <p class="c1 c2"><span class="c5">(a) &nbsp;Bargaining unit members who apply for and meet the stated requirements
              as posted for faculty positions shall be evaluated in the same manner as all other candidates when the
              University advertises for a faculty position covered by the CUASA collective agreement. </span></p>
      <p class="c1 c2"><span class="c5">(b) &nbsp;A copy of the advertisement for all faculty and instructor posts in the
              CUASA bargaining unit shall be sent to the Union within ten (10) working days of it&rsquo;s placement in
              University Affairs, the CAUT Bulletin, and/or websites. </span></p>
      <p class="c1 c9"><span class="c0"></span></p>
      <p class="c1 c9"><span class="c0"></span></p>
      <p class="c1"><span class="c7">ARTICLE 2 - CONFIDENTIALITY &amp; ACCESS TO PERSONNEL FILES </span></p>
      <p class="c1"><span class="c5">2.1 (a) An employee shall have the right to examine the contents of the
              employee&#39;s personnel file(s) during normal business hours, with the exception of confidential letters of
              reference. The employee may request and the Employer shall provide the names of authors of such confidential
              letters. </span></p>
      <p class="c1"><span class="c5">(b) Except for confidential letters of reference and student teaching evaluations, no
              material on the employee&#39;s file related to the employee&#39;s performance shall be used in a hiring
              decision unless the employee has been notified that it has been placed on the file. </span></p>
      <p class="c1"><span class="c5">2.2 &nbsp;</span><span class="c7">Disciplinary Documents </span></p>
      <p class="c1 c8"><span class="c5">(a) &nbsp;Subject to Article 12.5, where a letter imposing discipline, or other
              disciplinary documents, or both is being added to an employee&rsquo;s file, the employee must, where
              possible, be notified and asked to initial any documents relating to the disciplinary action </span></p>
      <p class="c1 c8"><span class="c5">(b) &nbsp;In the event of alleged distortion or error, the employee may request
              the inclusion of material pertinent to the alleged distortion or error. In the event of an error being
              established, the file shall be corrected and any erroneous material removed. </span></p>
      <p class="c1 c9"><span class="c14 c17"></span></p>
      <p class="c1 c9"><span class="c0"></span></p>
      <p class="c1"><span class="c14">PART II </span></p>
      <p class="c1"><span class="c14">STRATEGIC PRIORITIES </span></p>
      <p class="c1"><span class="c14">TITLE I </span></p>
      <p class="c1"><span class="c14">HUMAN RIGHTS, DEMOCRACY, AND GOVERNANCE </span></p>
      <p class="c1"><span class="c14">IN PEOPLE-CENTRED AND RIGHTS-BASED SOCIETIES </span></p>
      <p class="c1 c9"><span class="c10"></span></p>
      <p class="c1"><span class="c7">ARTICLE 3 - POSTINGS AND APPLICATIONS </span></p>
      <p class="c1"><span class="c5">15.1 </span></p>
      <p class="c1"><span class="c5">Except as provided in Article 17 and Article 16, all positions shall be advertised
              and applications solicited in accordance with this Article. </span></p>
      <ol class="c4 lst-kix_list_17-0 start" start="1">
          <li class="c1 c2 c6 li-bullet-0"><span class="c5">Departments that anticipate hiring Contract Instructors shall
                  post their notices and send a copy to the Union by May 1st for courses being offered for the following
                  fall and winter and by December 15th for courses being offered in the summer. </span></li>
          <li class="c1 c2 c6 li-bullet-0"><span class="c5">If no courses are available by these deadlines, the department
                  shall post a notice, with a copy sent to the union, indicating whether it will not hire Contract
                  Instructors in the following term(s), or whether the posting is simply delayed. A timeline for posting
                  may be included if known. </span></li>
      </ol>
      <p class="c1 c9"><span class="c0"></span></p>
      <p class="c1"><span class="c5">15.2 </span></p>
      <p class="c1"><span class="c5">(a) Except for needs which arise within ten weeks of the start of classes (Article
              16.9), courses which become available after the May 1st and December 15th deadlines must be posted as
              quickly as possible, and an electronic copy provided to the Union within five (5) business days.
              Additionally, departments shall make an effort to notify members of the added postings. </span></p>
      <p class="c1"><span class="c5">(b) Notices shall be posted for at least twenty-one (21) calendar days on websites,
              with a copy to the Union. Each notice shall include: </span></p>
      <ol class="c4 lst-kix_list_16-0 start" start="1">
          <li class="c1 c2 c6 li-bullet-0"><span class="c5">(i) &nbsp;the course number, title and description, </span>
          </li>
          <li class="c1 c2 c6 li-bullet-0"><span class="c5">(ii) &nbsp;the qualifications required for the position,
              </span></li>
      </ol>
      <p class="c1 c9"><span class="c10"></span></p>
      <p class="c1"><span class="c7">ARTICLE 4 - WORKING CONDITIONS </span></p>
      <p class="c1"><span class="c5">19.1 (a) </span></p>
      <p class="c1"><span class="c5">To the extent that departmental resources permit, and as are required for the
              performance of their duties, departments shall provide employees with: </span></p>
      <ul class="c4 lst-kix_list_20-0 start">
          <li class="c1 c2 c6 li-bullet-0"><span class="c5">appropriate space and use of other facilities, services and
                  equipment; </span></li>
          <li class="c1 c2 c6 li-bullet-0"><span class="c5">library, computing and audio-visual facilities; </span></li>
      </ul>
      <p class="c1 c3"><span class="c5">(b) &nbsp;Upon proof of having been hired for a course(s) in the upcoming Academic
              Year, Employees or prospective employees shall have access to library, computing and e-mail facilities as
              provided in Article 19.1 (a) for the purpose of performing their functions as a contract instructor. </span>
      </p>
      <p class="c1 c2"><span class="c5">Library access shall be maintained for a period of twelve (12) months from the
              last day of the end of the academic term in which the employee worked as a Contract Instructor. The parties
              acknowledge that any extension of library access must be consistent with the Library&rsquo;s obligations
              under the provisions of applicable licensing agreements. </span></p>
      <ol class="c4 lst-kix_list_22-1 start" start="2">
          <li class="c1 c3 c11 li-bullet-1"><span class="c5">An employee may request, in writing stating reasons, that the
                  Employer complete the form required by Canada Revenue Agency (currently the T2200 Form) for the employee
                  to use in support of a claim for home office expenses. Such request shall not be unreasonably denied.
              </span></li>
      </ol>
      <p class="c1 c9"><span class="c0"></span></p>
  </body>
  
  </html>`
  
  const { manager, state, onChange } = useRemirror({
    extensions,
    stringHandler: 'html',
    content
  });

 


  // const handleClick = useCallback(() => {
  //   // Clear out old state when setting data from outside
  //   // This prevents e.g. the user from using CTRL-Z to go back to the old state
  //   manager.view.updateState(manager.createState({ content: editorContent}));
  // }, [manager]);


  useEffect(() => {
    if (file !== currentFile) {
      manager.view.updateState(manager.createState({ content: editorContent }));
      
      setFile(currentFile)

    }

  }, [currentFile, file])


  return (
    <>

      <ThemeProvider>
        <Remirror
          manager={manager}
          state={state}
          hooks={hooks}
          onChange={onChange}
        >
          <Toolbar>
            <UndoButton />
            <RedoButton />
            <CommandButtonGroup>
              <DecreaseFontSizeButton />
              <FontSizeButtons />
              <IncreaseFontSizeButton />
            </CommandButtonGroup>
            <TextAlignmentButtonGroup />

            <ToggleItalicButton />
            <ToggleBoldButton />
            <HeadingLevelButtonGroup showAll />
            <ListButtonGroup />

          </Toolbar>
          <EditorComponent />
        </Remirror>
      </ThemeProvider>
    </>
  );

  
};
export default Editor;