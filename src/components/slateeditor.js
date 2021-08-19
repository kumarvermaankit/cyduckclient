import React, { useEffect, useMemo, useState } from 'react'

import { createEditor } from 'slate'

import { Slate, Editable, withReact } from 'slate-react'

import ReactQuill from 'react-quill'
import EditorToolbar1,{formats} from "./EditorToolbar";

export default function Slateeditor() {

    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState([
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ])
      const [modules,setmodules]=useState({
        toolbar: {
          container: "#toolbar",
          handlers: {
            // undo: undoChange,
            // redo: redoChange
           
          }
        },
      
      })



    return (
        <div>
      <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
<label for="select">Select</label>
    <input style={{backgroundColor:"blue",width:"20px",height:"20px"}} type="file" name="select" />
      <Editable />
      <EditorToolbar1 codestate={true} username={"default"} view={true}/>
      <ReactQuill
        theme="snow"
        
        className="code_editor2"
        // value={givencode}
        // onChange={(val)=>valuesetter(val)}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
        contentEditable={false}
      />
    </Slate>

        </div>
    )
}
