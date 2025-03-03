/**
 * @DEPRECIATED
 */
import React, {useEffect} from "react";
import { EditorState, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser, Schema } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import '../App.css';
import FileContext from "./providers/FileExporerContext";
import { useContext } from "react";


function PromiseEditor(){
    const {UpdateProseMirrorEditorContent} = useContext(FileContext)
    useEffect(() => {
        const mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
            marks: schema.spec.marks
        })

        const view = new EditorView(document.querySelector("#editor"), {
            state: EditorState.create({
                doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
                plugins: exampleSetup({schema: mySchema})
                
            })
        })

        //modView is a variable sent to  UpdateProseMirrorEditorContent context API method to update the editor
        const modView = view 
        UpdateProseMirrorEditorContent(modView)

        // const transaction = modView.state.tr.insert(0, modView.state.schema.text("Hello World!"))
        // const newState = modView.state.apply(transaction);
        // modView.updateState(newState);

        return () => {
            view.destroy()
        }   

    });

  return (
    <div className="App">
        <div id="editor" />
        <div id="content" />
    </div>
  );

}
export default PromiseEditor