
import React, { useEffect, useState,useCallback } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import "./community.css";
import {Card,Button}from 'react-bootstrap'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import jwt_decode from "jwt-decode";
import Slateeditor from "./slateeditor";
import AddIcon from '@material-ui/icons/Add';
import CodeM from "./cm"

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import  { useHistory } from 'react-router-dom'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import EditIcon from '@material-ui/icons/Edit';

import storage from "./fire_base"
import ReactQuill from 'react-quill'
import EditorToolbar1,{formats} from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

import EditorToolbar2 from "./editor_toolbar"
import Tinymce from "./tinymce";


function Qcode(){
    

  const url=`https://cyduck.herokuapp.com`;

const [CD,setCD]=useState(true)


const [modules,setmodules]=useState({
  toolbar: {
    container: "#toolbar",
    handlers: {
      // undo: undoChange,
      // redo: redoChange
     
    }
  },

})



    let history=useHistory();
    let params=useParams()
    
    const [cstate,setcstate]=useState(false);
    const [imgstate,setimagestate]=useState(false)
    const [linkstate,setlinkstate]=useState(false)
    const [files,setFile]=useState([]);
    const [noi,setnoi]=useState([])
    var [i,seti]=useState(false)
    const [bstate,setbstate]=useState(false);

   const [commentstate,setcommentstate]=useState(false)

const [cmntsetter,setcmntsetter]=useState("")

    const [teditor,setteditor]=useState("");
    const [ceditor,setceditor]=useState("")

    const [activepage,setactivepage]=useState(1)

    const [answercomment,setanswercomment]=useState("")
    const [questionimg,setquestionimg]=useState([])

    const[decoded,setdecoded]=useState(null);
   
    var tkn=localStorage.getItem('usertoken');

    var inputid=0;

    var tkn=localStorage.getItem('usertoken');
    
    const [ap,setap]=useState(0)

    

    const [editcode,seteditcode]=useState(false)
    
 const [givencode,setgivencode]=useState("")
    

const [rp,setrp]=useState(0)


const [ansshow,setansshow]=useState([])


var [divstate,setdivstate]=useState([]);

const [currentprofile,setcurrentprofile]=useState("")
const [comments,setcomments]=useState(false);

const [statearr,setstatearr]=useState(false); 

const [imagestate,setimgstate]=useState(false);

const [info,setinfo]=useState({
  username:"",
   })

 const [availablelinks,setavailablelinks]=useState({
      git:null,
      youtube:null,
      googledrive:null,
      codeeditor:null,
      other:null
    })


const [ansarr,setansarr]=useState([]);


const [cmnt,setcmntstate]=useState([]);

const [answer,setanswer]=useState(false)


const [codestate,setcodestate]=useState(false);




  const [vote,setvote]=useState({})


  const [answerarr,setanswerarr]=useState([])

useEffect(()=>{

  
 
    
        axios.get(`${url}/upload/question/${params.index}/${params.document}/${params.username}`)
        .then((result)=>{
            setansarr(result.data.data)
            setgivencode(result.data.data.question_content)
        })
        .catch((err)=>{
            console.log(err)
        })
   
        if(tkn!==null){
            const token = localStorage.usertoken
            setdecoded(jwt_decode(token))
            console.log(jwt_decode(token))
        }

        // document.querySelectorAll(".ql-container").style.border="none"
       
},[rp])



useEffect(()=>{
 
   

    axios.get(`${url}/upload/answer/${params.index}/${params.document}/${params.username}`)
    .then((result)=>{
setanswerarr(result.data.ans)
    })
   .catch((err)=>{
       console.log(err)
   })

// console.log(document.querySelector(".ql-editor"))

//  if(document.querySelector(".ql-editor")!==null){
//   console.log(document.querySelector(".ql-editor").contentEditable)
//  }
   

// axios.get(`${url}/profile/${params.username}`)
// .then((r)=>{
//   setcurrentprofile(r.data)
// })
// .catch((err)=>console.log(err))

},[ap,rp])




var timeoutInMiliseconds = 120000;
var timeoutId; 
 
function startTimer() { 
   
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
 
function doInactive() {
   setrp(rp+1)
}

// useEffect(() => {
//   console.log(document.querySelector(".codediv"))
// }, [])


async function SendAnswerComment(event,ansindex,index,doc_name){
  console.log(ansindex)
  event.preventDefault()

var val=document.querySelector(`#answercomment${ansindex}`).value
console.log(val)

  const result=await axios.post(`${url}/upload/answercomment`,{comment:val,useronline:decoded.data.username,index:index,document:doc_name,ansindex:ansindex})
  if(result){
    console.log(result)
    setrp(rp+1)
  }
}



function AddAnswers(){


   
 
    answer?setanswer(false):setanswer(true);
 
   
}

function Ansstate(ans,username){
  
    try{
       setinfo({
          username:params.username,
       })
          
           }
           catch(err){
              console.log(err);
           }
    
           
 


statearr?setstatearr(false):setstatearr(true)

}



function Showall(divid){

divstate[divid]?
setdivstate((prevvalue)=>{
    return{
        ...prevvalue,
        [divid]:false
    }
})  
:setdivstate((prevvalue)=>{
    return{
        ...prevvalue,
        [divid]:true
    }
})  
}

function showcomments(comment,id){
 
    
    commentstate?setcommentstate(false):setcommentstate(true)

    comment.map((comment)=>{
    cmnt[comment._id]?
setcmntstate((prevvalue)=>{
    return{
        ...prevvalue,
        [comment._id]:false
    }
})  
:setcmntstate((prevvalue)=>{
    return{
        ...prevvalue,
        [comment._id]:true
    }
})
    })
   
}

function Showcode(divid){
  codestate?
setcodestate(false)  
:setcodestate(true) 



}

function Showimage(){
    imagestate?
    setimgstate(false)  
    
    :setimgstate(true)

 

}




async function SendAnswer(id,doc_name,index){
  
// const data=new FormData()
//     for(const file of files){
//         data.append("file",file)
//     }
    





  const result= await axios.post(`${url}/upload/addanswer`,{title:teditor,content:ceditor,id:id,document:doc_name,index:index,ansuser:decoded.data.username,links:availablelinks,imglinks:questionimg})
  

setanswer(false)

setrp(rp+1)
    
    
}


// function CommentChange(event,inputid){

   

  function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }


 
  






 function Votes(vote_id,document,index,ansvote,ansindex,event){
    
 event.preventDefault();

 

axios.post(`${url}/upload/vote`,{index:index,document:document,ansindex:ansindex})
.then(res=>console.log(res))
.catch(err=>console.log(err));


(vote[vote_id]===undefined && ansvote===true || vote[vote_id]===true)?
setvote((prevvalue)=>{
    return{
        ...prevvalue,
        [vote_id]:false
    }
})
:
setvote((prevvalue)=>{
    return{
        ...prevvalue,
        [vote_id]:true

    }
})
}


function GoTo(event,a){
    event.preventDefault()
    if(a===1){
        cstate?setcstate(false):setcstate(true)
    }
if(a===2){
    imgstate?setimagestate(false):setimagestate(true)
}
if(a===3){
    linkstate?setlinkstate(false):setlinkstate(true)
}

}



function handlePageChange(pageNumber) {
    setactivepage(pageNumber)
    
    axios.post(`${url}/upload/activepage`,{pageNumber:pageNumber})
    window.location.reload();
   }


   function imagecheck(s){

    var count=0

return(
    <div style={{display:"flex"}}>
  { s.map((each)=>{
     
count++
     
{/* const srr=require(`./Uploads/${each.filename}`) */}


    return(
                    <div >
                    <Card.Img className="cardimg"  variant="top" src={each}/>
                 
                    <p style={{margin:"10px",marginLeft:"130px"}}>{`Fig${count}`}</p>
                    </div>
                ) 

    
                
        })}
    </div>
)
  

         }


         function ansimagecheck(s){

          var count=0
      
      return(
          <div style={{display:"flex"}}>
        { s.map((each)=>{
           
           {/* const srr=require(`./Answerimages/${each.filename}`) */}
      
count++

          return(
                          <div >
                          <Card.Img className="cardimg"  variant="top" src={each}/>
                          <p style={{margin:"10px",marginLeft:"130px"}}>{`Fig${count}`}</p>
                          </div>
                      ) 
                      

        
                      
              })}
          </div>
      )
        
      
               }




        





 async function saveinput(doc_name,event,index,comment){
     
  event.preventDefault();  
  var val=document.getElementById("comment").value


    

   


    const result=await axios.post(`${url}/upload/comment`,{comment:val,useronline:decoded.data.username,index:index,document:doc_name})
  
   

   
setcommentstate(false)

comment.map((comment)=>{
    cmnt[comment._id]?
setcmntstate((prevvalue)=>{
    return{
        ...prevvalue,
        [comment._id]:false
    }
})  
:setcmntstate((prevvalue)=>{
    return{
        ...prevvalue,
        [comment._id]:true
    }
})
    })
    if(result){
        setrp(rp+1)
    }
   
   
}



async function Delete(event,document,index,id){

   event.preventDefault()
   const r= await axios.post(`${url}/upload/delete/${decoded.data.username}/${id}`,{index:index,document:document})
  if(r){
    history.push("/community",{from:"/qcode"})
  }
   
    
}


function Countdown(props){
  
    

  var time=Date.parse(props.time)
  var currenttime=Date.parse(new Date())
  
  const [secondspassed,setsp]=useState((((currenttime-time)/(1000))-17940))
  
var c=0


  
  
  useEffect(()=>{
     
  
  
      if(props.d!=="extra"){
          setTimeout(()=>{
              setsp(secondspassed+1)
            
      
              },1000)
      }
    
  
        
   
  
  async function extra(){
     if(c<=1){

    
          const r=await axios.post("https://cyduck.herokuapp.com/upload/autodelete",{document:props.d,index:props.idx})
            

          if(r.data.data===true){
              window.location.reload()
          }

               }
           }


    if((((Date.parse(new Date()))-time)/3600000)>=6 && props.d!=="extra" ){
      c=c+1
      extra()
      
    }
  
       
  },[secondspassed])
  

     
      return (
          <div className="community_timer2">
            


  {props.d==="extra"?null:<ul className="CD">
  
  
  
  <li className="timer" >{Math.abs((Math.floor(secondspassed/(60*60)) % 24))<10?"0"+Number(Math.abs(Math.floor(secondspassed/(60*60)) % 24)):Number(Math.abs(Math.floor(secondspassed/(60*60)) % 24))}</li>
  <li className="timer">{Math.abs(Math.floor(secondspassed/60) % 60)<10?"0"+Math.abs(Math.floor(secondspassed/60) % 60):Math.abs(Math.floor(secondspassed/60) % 60)}</li>
  <li className="timer">{Math.abs(secondspassed % 60)<10?"0"+Number(Math.abs(secondspassed % 60)):Math.abs(secondspassed % 60)}</li>

               </ul>}
          </div>
      ) 
     
  
  
  
  }
  




async function Upvote(document,index,ansindex,state,upvotevalue,id,event){
    
    event.preventDefault();
   

   
   
   const res=await axios.post(`${url}/upload/upvote/${state}`,{index:index,document:document,ansindex:ansindex,username:decoded.data.username})
   
   
if(res){
setap(ap+1)
}

}




   const onFileSelected=useCallback((event,i)=>{


 
console.log(typeof(event.target.files[0]))

        event.preventDefault()
        if(files[i]!==undefined){
          files[i]=event.target.files[0]
        }
        else{
          setFile( [...files,event.target.files[0]]);
        }
    
    

      
        
         
        
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
      
        var imgtag = document.getElementById(`myimage${i}`);
        
        
        imgtag.title = selectedFile.name; 
     
        reader.onload = function(event) {
          imgtag.src = event.target.result;
          
        };
      
        reader.readAsDataURL(selectedFile);
    
       
        setbstate(true);
    seti(false)
    

    
    
      })
    

   function SelectFile(props){

  
  
  

    return(
    <div className="input-file-container"> 
  
  
        <label  htmlFor={props.i} className="custom-file-upload"><AddAPhotoIcon style={{width:"40px",height:"70px",color:"white"}}/></label>
        <input 
          type="file"
          id={props.i}
          className="form-control"
          
      onChange={(event)=>onFileSelected(event,props.i)}
        />
       
         </div>
         )
  
  }
  
  
  function addlinks(event,a){
    if(a===1){
      setavailablelinks((prev)=>{
        return {
          ...prev,
          git:event.target.value
        }
      })
    }
    else if(a===2){
      setavailablelinks((prev)=>{
        return {
          ...prev,
          youtube:event.target.value
        }
      })
    }
    else if(a===3){
      setavailablelinks((prev)=>{
        return {
          ...prev,
          googledrive:event.target.value
        }
      })
    }
    else if(a===4){
      setavailablelinks((prev)=>{
        return{
          ...prev,
          codeeditor:event.target.value
        }
      })
    }
    else if(a===5){
      setavailablelinks((prev)=>{
        return{
          ...prev,
          other:event.target.value
        }
      })
    }
  }

  function AddImage(event){
    
    event.preventDefault()
    if(i===false){
      if(noi.length===0){
        setnoi([...noi,0])
    }
      else{
      setnoi([...noi,noi[noi.length-1]+1])
  }
     seti(true)
    }
  
  }
  
  
  function close(event,val){
    event.preventDefault()
    seti(false)
  if(noi.length===1){
    setnoi([])
    setFile([])
  }
  else{
    var i=noi.indexOf(val) 
    console.log(val,i)
    noi.splice(val,1)
    files.splice(val,1)
    setFile([...files])
    setnoi([...noi])
  }
   
  }
  

  
  function CreateImage(){
  
    
  
  
 
    return(
    <div> 
      
  { noi.map((each)=>{
  
    
  
      return(
        <div className="create" key={each}>
      
        <SelectFile i={each}/>
      
      
    <button className="close_btn" style={{background:"none"}} onClick={(event)=>close(event,each)}><HighlightOffIcon /></button>
        <img style={{color:"white"}} id={`myimage${each}`}/>
       
      
        </div>
       )
    
     
     })}
  </div> 
   
    )  
     
        
       
    
  }


 
    
  function imagecheck2(s){

  //   const srr=require(`./Profileimages/${s.data.filename}`)
  
  // return srr.default
               }
  


function GetProfile(props){
const [imgsrc,setimgsrc]=useState("")

    useEffect(()=>{
        async function Helper(){
            const res= await axios.get(`${url}/profile/${props.u}`)
          
            if(res){
                setimgsrc(res.data)
            }
        }
       
Helper()

    },[])



return(
    <div className="userimageprofile">
    <img src={imgsrc} />
    <p className="userprofile" style={{fontWeight:"2000px"}} >{props.u}</p>
        
    </div>
)
    
}


 
function Cmntset(event){
    
    setcmntsetter(event.target.value)
}



function showans(event,id){
    event.preventDefault()

    ansshow[id]?
    setansshow((prevvalue)=>{
        return{
            ...prevvalue,
[id]:false
        }
    })
    :
    setansshow((prevvalue)=>{
        return{
            ...prevvalue,
[id]:true
        }
    })
}


function change1(newvalue){

console.log(newvalue)

// setteditor(newvalue)
 
    
}

function change2(newvalue){
  setceditor(newvalue)
}


function editcodechange(newvalue){



setgivencode(newvalue)
}





function Imageupload(event){

  var array=[]
  event.preventDefault();
  
  files.map((each)=>{
  
  
  
  const uploadtask=storage.storage().ref(`images/${each.name}`).put(each)
  uploadtask.on(
    "state_changed",
    snapshot=>{},
      error=>{
        console.log(error)
      },
  ()=>{
    storage.storage()
    .ref("images")
    .child(each.name)
    .getDownloadURL()
    .then(imgurl=>{
  
  
  array.push(imgurl)
  
  files.unshift()
  
    })
  }
  )
  })
  
  setFile([])
  setquestionimg(array)
  
  }
  
   
 function valuesetter(val){
setgivencode(val)
 } 


async function EditCode(event){
event.preventDefault();




const r=await axios.post(`${url}/upload/codeeditor`,{document:params.document,index:params.index,content:givencode})

if(r){

  seteditcode(false)
  document.querySelector("#givencode").style.visibility="hidden"
}

setrp(rp+1)

}

function Editcodestate(event){
  event.preventDefault()
if(document.querySelector("#givencode").style.visibility==="hidden"){
  document.querySelector("#givencode").style.visibility="visible"
}
else{
  document.querySelector("#givencode").style.visibility="hidden"
}


editcode?seteditcode(false):seteditcode(true)
}




console.log(ceditor)

function Quesdiv(props){

  var time=Date.parse(props.time)
var currenttime=Date.parse(new Date())
    return(


  <div className="importcard"  key={props.i} >
       <div className="c_header"><a  onClick={()=>Showall(props.i)}><p style={{padding:"13px"}}><b>{props.t}</b></p></a><a  href={`/pro_file/${props.u}`} className="username">~{props.u}</a>
       {props.doc_name!=="extra"?CD?<Countdown time={props.time} d={props.doc_name} idx={props.index} />:<p>0</p>:null}
       </div>
       
       <Card.Text className="questionid">id:{props.i}</Card.Text>
       
  <Card.Body>
 {/* <p className="linkshowpara">Links:</p>
 {props.links.git!==null?<a  className="links"  href={props.links.git} target="_blank"><GitHubIcon /></a>:null}
 {props.links.youtube!==null?<a  className="links" href={props.links.youtube} target="_blank"><Utubeicon /></a>:null}
 {props.links.googledrive!==null?<a  className="links" href={props.links.googledrive} target="_blank">Google Drive</a>:null}
 {props.links.codeeditor!==null?<a  className="links" href={props.links.codeeditor} target="_blank"><Editor /></a>:null}
 {props.links.other!==null?<a  className="links" href={props.links.other} target="_blank">Other</a>:null} */}
  
        <div key={props.i+"childdiv"} id={props.i+"childdiv"}>
        {tkn!==null?decoded.data.username===props.u?<button className="editcode" onClick={(event)=>Editcodestate(event)}>Edit</button>:null:null}
      
{/*    
{props.doc_name!=="extra"?<div className="divtimer" >
<p >Time Remaining:</p> */}


    
   
 
    {/* <button  className="code-secn" onClick={()=>Showcode(props.i)} >
     Code
     </button> */}
    
    {/* {codestate===true? */}
    <div className="codediv">
    {/* {tkn!==null?decoded.data.username===params.username?<button  onClick={(event)=>Editcodestate(event)} className="codeedit">Edit <EditIcon   style={{width:"28px",height:"28px"}} /></button>:null:null}
    {editcode?<div className="set"><button className="setedit" onClick={(event)=>EditCode(event)}>Set</button></div>:null}   */}
{/* {editcode===false?<CodeM name="code" val={givencode} hght="500px" wdt="1400px" read={true} />:<CodeM name="code"  hght="500px" wdt="1400px" read={true} visible="hidden"/>} */}

    
    </div>
 
    {/* {statearr?<Button id="cardbtn"  variant="primary" style={{marginRight:"100px"}}onClick={()=>Ansstate(props.a,props.u)}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Hide Answers</Button>:<Button id="cardbtn"  variant="primary" style={{marginRight:"100px"}}onClick={()=>Ansstate(props.a,props.u)}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>See Answers</Button>}
    {tkn!==null?<div className="afterloginbuttons">
   <Button  id="cardbtn"  variant="primary" style={{marginRight:"80px"}} onClick={()=>AddAnswers()}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Add Answer</Button>

    </div>:<div className="afterloginbuttons">
   <Button  id="cardbtn"  variant="primary" style={{marginRight:"80px"}} onClick={()=>history.push("/signin")}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Add Answer</Button>

    </div>} */}
{/*     
    <Button  id="cardbtn"  variant="primary" style={{marginLeft:"100px" ,marginRight:"100px"}}  onClick={()=>Showimage(props.i)}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Image</Button> */}
    
      
   {/* {tkn!==null?decoded.data.username===params.username?((currenttime-time)/1000<=900)?<Button  id="cardbtn" variant="primary"  style={{marginLeft:"100px",marginRight:"120px"}}  onClick={(event)=>Delete(event,props.doc_name,props.index,props.i)}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Delete</Button>:null:null:null} */}
 
    
 
{/*    
    {imagestate?<div id="images">{imagecheck(props.s)}</div>:null}
     {imagestate?(!(imagecheck(props.s))?<Card.Img variant="top" src={None}/>:null):null} */}

     



 
     

</div>


     </Card.Body>
  
<div className="comment_answer">


</div>


</div>






    )
}






return (
<div style={{marginLeft:"30px"}}>


      <div>
      
    {ansarr===undefined||ansarr.length===0?<p>This Question is either deleted or not in our records</p>:<Quesdiv key={ansarr.id} t={ansarr.question_title} c={ansarr.question_content} v={ansarr.votes} a={ansarr.answer} i={ansarr.id} u={ansarr.username} s={ansarr.imginfo} paymentvalue={ansarr.value.amount} comments={ansarr.comments} doc_name={ansarr.documentname} index={params.index} time={ansarr.time} links={ansarr.links}/>}
      </div>
      

      <div className="text-editor">
<div className="hidetoolbar" id="givencode"></div>
<div style={{display:"flex"}}>
<Tinymce set={valuesetter} t={givencode} height="950px"/>
<div>
{editcode?<p className="editpara">Editable</p>:null}
{editcode?<button className="code_save" onClick={(event)=>EditCode(event)}>Save</button>:null}
</div>

</div>

    </div>
<div className="main_commentdiv">  
    <div id="comments"  className="comment_div"> 
{/* {commentstate?<h3>Comments:</h3>:null} */}
<div style={{display:"flex",justifyContent:"space-around",width:"150px",height:"70px"}}>
<h3 className="comment_header">Comments:</h3>
<Button  id="comment_btn"   onClick={()=>showcomments(ansarr.comments,ansarr.id)}>
   
     Add</Button>
      </div>

</div>




    {ansarr.comments!==undefined?ansarr.comments.map(comment=>{
    
    return(
       
    
        <div className="e_comment">
        <Card.Text  className="commentsection">
        {comment.comment}
        </Card.Text>
       <a className="username_profile" href={`/pro_file/${comment.username}`}><GetProfile u={comment.username}/></a>
        </div> 
        
      
    )
}):null}

{ tkn!==null?commentstate?<form className="form_comment"  onSubmit={(event)=>saveinput(ansarr.documentname,event,params.index,ansarr.comments)}>
    <input  type="text"  id="comment" placeholder="Add your comment here"/>
    <button id="cardbtn" type="submit" style={{width:"50px",height:"40px",marginLeft:"10px",bottom:"2px",position:"relative"}} ><AddIcon  /></button>
    </form>:null:null}

</div>


<div className="answer_div">
<h3>Answers  :</h3>
{  
      tkn!==null?<div className="afterloginbuttons">
   <Button  id="answer_btn"  variant="primary" style={{marginRight:"80px"}} onClick={()=>AddAnswers()}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Add</Button></div>:null}
      {answer?<div>
{/* <input className="descinput" id="titleinput" placeholder="Add Title of your answer" onChange={(event)=>change1(event.target.value)}/> */}

<div className="text-editor_answer">

<Tinymce set={change2}  height="520px" width="1100px" />

    </div>
     
     
     <button className="send_button" onClick={()=>SendAnswer(ansarr.id,ansarr.documentname,params.index)}>Post</button>
  

     
  </div>:null}

{answerarr.length===0?<p>No answers available</p>:
answerarr.map(ans=>{

  
 
return (
    
      <div id="answers">
   
  
        <div key={ans._id} id={ans._id}>
     

      
       <div>
       <div className="text_answer-editor">
       
<div className="hidetoolbar"></div>

<Tinymce t={ans.ans} height="700px"/>

    </div>
    
       </div>
       
       <div style={{display:"flex",width:"200px"}} className="like">
        <label style={{fontSize:"18px",marginLeft:"15px"}}></label>
        {tkn!==null?decoded.data.username===ansarr.username?
         <div id={ans._id} style={{cursor:"pointer",color:"#000000"}} onClick={(event)=>Votes(ans._id,ansarr.documentname,params.index,ans.vote,ans.index,event)} >
        
         {vote[ans._id]===undefined?ans.vote?<button className="accepted">Accepted</button>:<button className="accept">Accept</button>:vote[ans._id]?<button className="accepted">Accepted</button>:<button className="accept" >Accept</button>}
       
         {/* <FavoriteIcon style={{width:"30px",height:"30px"}}/> */}
          </div>:null:null
       }
</div>
       
       {tkn!==null?<div className="up_down_vote">
      {ans.likedBy.includes(decoded.data.username)===false?<button className="vote" id={ans._id} onClick={(event)=>Upvote(ansarr.documentname,params.index,ans.index,true,ans.upvote,ans._id,event)}><ThumbUpIcon style={{width:"40px",height:"60px"}} /></button>
        :
        <button className="vote" id={ans._id} onClick={(event)=>Upvote(ansarr.documentname,params.index,ans.index,false,ans.upvote,ans._id,event)}><ThumbDownIcon style={{width:"40px",height:"60px"}} /></button>}
       
         <p className="no_of_votes" >{ans.upvote}</p>
       </div>:null}
       <div className="ediv">
        
        <div>
    
      {/* <input style={{width:"400px",height:"400px"}} value={ans.ans}/> */}
   {/* <CodeM val={ans.description} hght="60px" wdt="1200px" read={true} />
        <CodeM val={ans.ans} hght="500px" wdt="1200px" read={true} />
        
        {ansimagecheck(ans.images)}
        
        <p style={{display:"inline"}}>links:</p>
 {props.links.git!==null?<a  className="links"  href={props.links.git}  target="_blank" ><GitHubIcon /></a>:null}
 {props.links.youtube!==null?<a  className="links" href={props.links.youtube} target="_blank" ><Utubeicon /></a>:null}
 {props.links.googledrive!==null?<a  className="links" href={props.links.googledrive} target="_blank" >Google Drive</a>:null}
 {props.links.codeeditor!==null?<a  className="links" href={props.links.codeeditor} target="_blank" ><Editor /></a>:null}
 {props.links.other!==null?<a  className="links" href={props.links.other} target="_blank" >Other</a>:null} */}
 <div className="comment_div">
 <h3>Comments</h3>
{ans.comments.map((comment)=>{
  return(
    <div className="e_comment">
        <Card.Text  className="commentsection">
        {comment.comment}
        </Card.Text>
       <a className="username_profile" href={`/pro_file/${comment.username}`}><GetProfile u={comment.username}/></a>
        </div>
  )
  
})

}
<input placeholder="Add Comment" className="answercomment" id={`answercomment${ans.index}`}/>
       <button onClick={(event)=>SendAnswerComment(event,ans.index,params.index,ansarr.documentname)} id="cardbtn" type="submit" style={{width:"50px",height:"50px",marginLeft:"10px",bottom:"5px",position:"relative"}} ><AddIcon  /></button>
</div>

 

       </div>
      
 
        </div>
        
     
    
    
  



          </div> 


</div>
    

    )
   
 })
 
 }


</div>


{/* {codestate===true?editcode?<div className="newcode"><CodeM  val={givencode} Change={(newvalue)=>editcodechange(newvalue)} hght="500px" wdt="1400px" read={false} /></div>:null:null} */}



  {/* 
   */}
     

      {/* <div className="headcard">
      <div style={{display:"flex"}}>
      <p className="add" >Add Code</p>
     <button className="acCode" onClick={(event)=>GoTo(event,1)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button> 
     </div>
 {cstate?<CodeM Change={(newvalue)=>change1(newvalue)} val={teditor} name={"title"+ansarr.id}   plh="Enter Description"  hght="60px" wdt="1600" read={false} />:null}
{cstate?<CodeM   Change={(newvalue)=>change2(newvalue)} val={ceditor} name={"content"+ansarr.id}   plh="Enter or Copy Code" hght="600px" wdt="1600" read={false}/>:null }
</div>
           
<div className="headcard">
             <div style={{display:"flex"}}>
     <p className="add">Add Image</p>
     <button className="AC" onClick={(event)=>GoTo(event,2)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button>
     </div>
     {imgstate?
       <div style={{display:"flex"}}>
     <p  style={{marginTop:"12px",color:"#000000"}} >New Image</p>
     <button className="AC" style={{width:"28px",height:"30px",left:"5px",top:"14px"}} onClick={(event)=>AddImage(event)}><AddIcon style={{width:"22px",height:"22px",border:"none",position:"relative",right:"6px",bottom:"4px"}} /></button> 
    
     </div>


:null}
{imgstate?CreateImage():null}
{imgstate?<button onClick={(event)=>Imageupload(event)}>Upload</button>:null}
     </div>
     <div className="headcard">
   <div style={{display:"flex"}}>
   <p className="add"  >Add Links</p>
     <button className="AC"  onClick={(event)=>GoTo(event,3)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button> 
   </div>
{linkstate?
<div>
<div className="linkdiv">
<label for="git">github(if any):</label>
     <input onChange={(event)=>addlinks(event,1)} className="linkinput" value={availablelinks.git} type="text" id="git" placeholder="Place your github link here"/>
     </div>
     <div className="linkdiv">
     <label for="youtube">youtube(if any):</label>
     <input onChange={(event)=>addlinks(event,2)} className="linkinput" value={availablelinks.youtube} type="text" id="youtube" placeholder="Place your youtube link here"/>
     </div>
     <div className="linkdiv">
     <label for="googledrive">google-drive(if any):</label>
     <input onChange={(event)=>addlinks(event,3)} className="linkinput" value={availablelinks.googledrive} type="text" id="googledrive" placeholder="Place your google drive link here" />
     </div>
     <div className="linkdiv">
     <label for="urcode">your code editor(if any):</label>
     <input onChange={(event)=>addlinks(event,4)} className="linkinput" value={availablelinks.codeeditor} type="text" id="urcode" placeholder="Place your code editor link here" />
     </div>
     <div className="linkdiv">
     <label for="others">other(if any):</label>
     <input onChange={(event)=>addlinks(event,5)} className="linkinput" value={availablelinks.other} type="text" id="others" placeholder="Place any other available link here"/>
     </div>
     </div>
     :null}
  
 </div>
             */}

        </div>
)



}

export default Qcode