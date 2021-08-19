


import AceEditor from "react-ace";
import { Editor } from '@tinymce/tinymce-react'; 

import 'brace/mode/javascript';
import 'brace/theme/ambiance';
import { useEffect } from "react";
// import EditorJs from 'react-editor-js';

// import { EDITOR_JS_TOOLS } from "./constants";


function CodeM(props){
 



// useEffect(()=>{

  
// document.getElementsByClassName("ace_content")[0].style.fontSize="16px"
// document.getElementsByClassName("ace_content")[0].style.fontSize="16px"
  
// })

function editorfncn(api,ot){
  console.log(api)
  console.log(ot)
}


  return(
    <div>

{/* <AceEditor
mode="javascript"
// theme="ambiance"

    
    onChange={props.Change}
   showPrintMargin={false}
   showGutter={false}
    editorProps={{ $blockScrolling: true }}
     name={props.name}  value={props.val}    placeholder={props.plh}
   style={{width:`${props.wdt}`, margin:"30px", zIndex:"5" ,height:`${props.hght}`,background:"white",color:"black",visibility:`${props.visible}`,fontSize:"16px"}}
   readOnly={props.read}
  autofocus="autofocus"
  
  /> */}

  {/* <Editor
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image', 
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
     
      /> */}

      

      {/* <EditorJs
       onChange={(api,ot) => editorfncn(api,ot)}
        // tools={EDITOR_JS_TOOLS}
        data={{
          time: 1556098174501,
          blocks: [
            // {
            //   type: "header",
            //   data: {
            //     text: "Editor.js",
            //     level: 2
            //   }
            // },
            // {
            //   type: "pa567graph",
            //   data: {
            //     text:
            //       "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
            //   }
            // },
            // {
            //   type: "header",
            //   data: {
            //     text: "Key features",
            //     level: 3
            //   }
            // },
            // {
            //   type: "list",
            //   data: {
            //     style: "unordered",
            //     items: [
            //       "It is a block-styled editor",
            //       "It returns clean data output in JSON",
            //       "Designed to be extendable and pluggable with a simple API"
            //     ]
            //   }
            // },
            // {
            //   type: "header",
            //   data: {
            //     text: "What does it mean «block-styled editor»",
            //     level: 3
            //   }
            // },
            // {
            //   type: "paragraph",
            //   data: {
            //     text:
            //       'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
            //   }
            // },
            // {
            //   type: "paragraph",
            //   data: {
            //     text:
            //       'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
            //   }
            // },
            // {
            //   type: "header",
            //   data: {
            //     text: "What does it mean clean data output",
            //     level: 3
            //   }
            // },
            // {
            //   type: "paragraph",
            //   data: {
            //     text:
            //       "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
            //   }
            // },
            // {
            //   type: "paragraph",
            //   data: {
            //     text:
            //       'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
            //   }
            // },
            // {
            //   type: "paragraph",
            //   data: {
            //     text:
            //       "Clean data is useful to sanitize, validate and process on the backend."
            //   }
            // },
            // {
            //   type: "delimiter",
            //   data: {}
            // },
            // {
            //   type: "paragraph",
            //   data: {
            //     text:
            //       "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
            //   }
            // },
            // {
            //   type: "image",
            //   data: {
            //     file: {
            //       url:
            //         "https://firebasestorage.googleapis.com/v0/b/cyduck-3be89.appspot.com/o/images%2FCyduck%20logo.jpeg?alt=media&token=A-6de4-4055-b933-f0f9f5e563ac"
            //     },
            //     caption: "",
            //     withBorder: true,
            //     stretched: false,
            //     withBackground: false
            //   }
            // }
          ],
          version: "2.12.4"
        }}
      />
 */}



    </div>
  )
}

export default CodeM;