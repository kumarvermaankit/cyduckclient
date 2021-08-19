import React, { useEffect, useState,useCallback } from "react"
import ReactQuill from 'react-quill'
import EditorToolbar1,{formats} from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import EditorToolbar2 from "./editor_toolbar"
import Tinymce from "./tinymce";

// import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-build-classic-dna";
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
// import Editor from '@ckeditor/ckeditor5-build-balloon-block'
// import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import storage from "./fire_base"
// import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
// import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
export default function Quillanswer() {

    const url=`https://cyduck.herokuapp.com`;
    const [answerarr,setanswerarr]=useState([])
    const [modules,setmodules]=useState({
        toolbar: {
          container: "#toolbar",
          handlers: {
            // undo: undoChange,
            // redo: redoChange
           
          }
        },
      
      })
      

useEffect(() => {
    axios.get(`${url}/upload/answer/5/extra/ahsdkhajk`)
    .then((result)=>{
setanswerarr(result.data.ans)
    })
   .catch((err)=>{
       console.log(err)
   })
  
}, [])



const editorConfiguration = {
  // extraPlugins: [MyCustomAdapter],
  
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "indent",
    "outdent",
    "|",
    "code",
    "codeBlock",
    "blockQuote",
    "image",
    "mediaEmbed",
    "undo",
    "redo",
    "insertImage",
    "uploadImage",
    "ckfinder",
    "imageUpload",
     

  ],
  codeBlock: {
    languages: [
      { language: 'plaintext', label: 'Plain text' }, // The default language.
      { language: 'c', label: 'C' },
      { language: 'cs', label: 'C#' },
      { language: 'cpp', label: 'C++' },
      { language: 'css', label: 'CSS' },
      { language: 'diff', label: 'Diff' },
      { language: 'html', label: 'HTML' },
      { language: 'java', label: 'Java' },
      { language: 'javascript', label: 'JavaScript' },
      { language: 'php', label: 'PHP' },
      { language: 'python', label: 'Python' },
      { language: 'ruby', label: 'Ruby' },
      { language: 'typescript', label: 'TypeScript' },
      { language: 'xml', label: 'XML' }
    ]
},
ckFinder:{
  uploadUrl:"/firebase"
}
,


};

// console.log(answerarr)

class MyUploadAdapter {
  constructor( loader ) {
      // The file loader instance to use during the upload.
      this.loader = loader;
  }

  

  // Starts the upload process.
  upload() {

  

console.log(this.loader.file)
return this.loader.file
.then((file)=>{
    const uploadtask=storage.storage().ref(`images/${file.name}`).put(file)
    uploadtask.on(
      "state_changed",
      snapshot=>{},
        error=>{
          console.log(error)
        },
    ()=>{
      storage.storage()
      .ref("images")
      .child(file.name)
      .getDownloadURL()
      .then(imgurl=>{
    
    console.log(imgurl)
 
    
      })
  
    })

  })
      // Update the loader's progress.
     

      // Return a promise that will be resolved when the file is uploaded.
    
  }

  // Aborts the upload process.
  abort() {
      // Reject the promise returned from the upload() method.
      // server.abortUpload();
      console.log("error")
  }
}

function CustomAdapter(editor){
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
    console.log(loader)
    return new MyUploadAdapter(loader)
  }
}


    return (
        <div>
      
           <div style={{marginLeft:"50px"}}>
             
           {/* <CKEditor
                    editor={Editor}
                    config={ editorConfiguration }
                    
                    data="<p>Hello from CKEditor 5!</p>zzzzz"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }

                    onInit={editor => {
                      editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                        return new MyUploadAdapter(loader);
                      };
                    }}
                    
                    
                    // onBlur={ ( event, editor ) => {
                    //     console.log( 'Blur.', editor );
                    // } }
                    // onFocus={ ( event, editor ) => {
                    //     console.log( 'Focus.', editor );
                    // } }
                /> */}
               
                  {/* <CKEditor
        editor={ClassicEditor}
        config={{
          
          image: {
          	customClass: ["ui", "fluid", "image"], // Use whatever class names defined in your theme
          },
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "indent",
            "outdent",
            "|",
            "codeBlock",
            "blockQuote",
            
            "mediaEmbed",
            "undo",
            "redo",
            "insertImage",
            "uploadImage",
            
            "addImage",

          ],
        }}
        data=""
       
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data)
        }}
      /> */}
                  
                  <Tinymce 
                  t={answerarr.length!==0?answerarr[1].ans:""}
                    

                  />
                  {/* <AlloyEditor /> */}
                  {/* <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    
                    config={{
          extraPlugins: [EasyImage],
        }}
                    // onBlur={ ( event, editor ) => {
                    //     console.log( 'Blur.', editor );
                    // } }
                    // onFocus={ ( event, editor ) => {
                    //     console.log( 'Focus.', editor );
                    // } }
                /> */}
                  {/* <EditorToolbar1 codestate={true} username={"default"} view={true}/>
       
        
      <ReactQuill
        theme="snow"
        
        className="code_editor"
        value={answerarr.length!==0?answerarr[1].ans:""}
        // onChange={(val)=>valuesetter(val)}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
     
      /> */}
      </div>
         
 
        </div>
    )
}
