import React, { useState, useEffect, useRef } from "react"
import axios from "axios";
import "./addfile.css";
import jwt_decode from "jwt-decode";
import Axios from "axios"
import "./payment.css"

import { useHistory } from "react-router-dom";

import AlertBox from "./alertbox"


import storage from "./fire_base"



import "react-quill/dist/quill.snow.css";

import Tinymce from "./tinymce";

import useMediaRecorder from '@wmik/use-media-recorder';

import Batch from "./batch";
var quillObj


function File(props) {



  let history = useHistory();
  const url = `https://cyduck2.herokuapp.com`
  const url2 = `http://localhost:5000`
  var [i, seti] = useState(false)
  const [files, setFile] = useState([]);

  const [paymentstate, setpaymentstate] = useState(false)
  const [noi, setnoi] = useState([])
  const [imgstate, setimagestate] = useState(false)
  const [alertbox2, setalertbox2] = useState(false)

  const [cstate, setcstate] = useState(false);
  const [question, setquestion] = useState({
    title: "",
    content: "",
    paymentinfo: {}
  })
  const [cdd, setcdd] = useState(false)
  const [blob, setblob] = useState()
  const [lngdd, setlngdd] = useState(false)
  const [frdd, setfrdd] = useState(false)
  const [fdd, setfdd] = useState(false)
  const [load, setload] = useState()
  const [questionimg, setquestionimg] = useState([])
  const [community, setcommunity] = useState([])
  const [availablelinks, setavailablelinks] = useState({
    git: null,
    youtube: null,
    googledrive: null,
    codeeditor: null,
    other: null
  })

  const [paymentalertbox, setpaymentalertbox] = useState(false)
  const [alertmessage, setalertmessage] = useState("")

  const [paymentvalue, setpaymentvalue] = useState()

  const [alertbox, setalertbox] = useState(false)
  const [mstate, setmstate] = useState(false)
  // const [selected, setSelected] = useState({
  //   languages:[],
  //   fields:[],
  //   frameworks:[],
  //   });

  const [selectedlang, setselectedlang] = useState([])
  const [selectedfram, setselectedfram] = useState([])
  const [selectedfield, setselectedfield] = useState([])
  const [selectedcomm, setselectedcomm] = useState([])




  const [info, setinfo] = useState({
    id: "",
    email: "",
    username: "",
  })

  const [linkstate, setlinkstate] = useState(false)

  useEffect(() => {
    setFile([])



    try {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)


      setinfo({
        id: decoded.data._id,
        email: decoded.data.email,
        username: decoded.data.username,
      });

    }
    catch (err) {
      console.log(err);
    }





  }, [])

  useEffect(() => {
    axios.get(`${url}/upload/mygroups/${decoded.data.username}`).then((result) => {
      setcommunity(result.data)
    })
  }, [])




  function Lstate(event) {
    event.preventDefault()

    linkstate ? setlinkstate(false) : setlinkstate(true)
  }


  function OnChangetitle(newvalue) {

    setquestion((prevvalue) => {
      return {
        ...prevvalue,
        title: newvalue
      }
    })

  }
  function OnChangecontent(newvalue) {

    setquestion((prevvalue) => {
      return {
        ...prevvalue,
        content: newvalue
      }
    })

  }










  function onFileSelected(event, i) {
    event.preventDefault()

    if (files[i] !== undefined) {
      files[i] = event.target.files[0]
    }
    else {
      setFile([...files, event.target.files[0]]);
    }


    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById(`myimage${i}`);


    imgtag.title = selectedFile.name;

    reader.onload = function (event) {
      imgtag.src = event.target.result;

    };

    reader.readAsDataURL(selectedFile);









  }



  // async function Imageupload(event){


  // var array=[]

  // event.preventDefault();

  // function help(){

  //   files.map((each)=>{



  //     const uploadtask=storage.storage().ref(`images/${each.name}`).put(each)
  //     uploadtask.on(
  //       "state_changed",
  //       snapshot=>{},
  //         error=>{
  //           console.log(error)
  //         },
  //     ()=>{
  //       storage.storage()
  //       .ref("images")
  //       .child(each.name)
  //       .getDownloadURL()
  //       .then(imgurl=>{


  //     array.push(imgurl)

  //     files.unshift()

  //       })
  //     }
  //     )

  //     })

  //     return true
  // }


  // const r=await help();

  // if(r){
  //   setFile([])
  //   setquestionimg(array)
  //   setimguploadstate(false)
  // }


  // }





  function proceed(event) {

    event.preventDefault()

    if (question.title === "") {

      setalertbox(true)

      return;
    }

    setpaymentalertbox(true)
  }


  const send = async event => {





    // const r=await axios.post(`${url}/upload`,data)



    const result = await axios.post(`${url}/upload/questioncheck`, { question: question, info: info, keywords: { languages: selectedlang, frameworks: selectedfram, fields: selectedfield }, links: availablelinks, imageinfo: questionimg, communities: selectedcomm })
    if (result) {
      await setFile([])

      history.push("/community", { from: "/file" })


    }






  }





  const GoToCode = event => {
    event.preventDefault();
    cstate ? setcstate(false) : setcstate(true);

  }
  function dropValueGetter(event, a) {



    if (a === 1) {
      if (selectedlang.includes(event.target.value) === false) {
        setselectedlang([...selectedlang, event.target.value])
        console.log(event.target.classList)
        event.target.classList.add("active")
      }
      else {
        setselectedlang(selectedlang.filter((e) => e !== event.target.value))
        event.target.classList.remove("active")
      }
    }
    else if (a === 2) {
      if (selectedfram.includes(event.target.value) === false) {
        setselectedfram([...selectedfram, event.target.value])
        event.target.classList.add("active")
      }
      else {
        setselectedfram(selectedfram.filter((e) => e !== event.target.value))
        event.target.classList.remove("active")
      }
    }
    else if (a === 3) {
      if (selectedfield.includes(event.target.value) === false) {
        setselectedfield([...selectedfield, event.target.value])
        event.target.classList.add("active")
      }
      else {
        setselectedfield(selectedfield.filter((e) => e !== event.target.value))
        event.target.classList.remove("active")
      }
    }

    else if (a === 4) {
      if (selectedcomm.includes(event.target.value) === false) {
        setselectedcomm([...selectedcomm, event.target.value])
        event.target.classList.add("active")
      }
      else {
        setselectedcomm(selectedcomm.filter((e) => e !== event.target.value))
        event.target.classList.remove("active")
      }
    }


  }





  function SelectFile(props) {





    return (
      <div className="input-file-container">


        <label htmlFor={props.i} className="custom-file-upload">Select</label>
        <input
          type="file"
          id={props.i}
          className="form-control"

          onChange={(event) => onFileSelected(event, props.i)}
        />

      </div>
    )

  }


  function AddImage(event) {

    event.preventDefault()
    if (i === false) {
      if (noi.length === 0) {
        setnoi([...noi, 0])

      }
      else {
        setnoi([...noi, noi[noi.length - 1] + 1])
      }
      seti(true)
    }


  }


  function close(event, val) {
    event.preventDefault()
    seti(false)
    if (noi.length === 1) {
      setnoi([])
      setFile([])
    }
    else {
      var i = noi.indexOf(val)
      console.log(val, i)
      noi.splice(val, 1)
      files.splice(val, 1)
      setFile([...files])
      setnoi([...noi])
    }


  }




  function Player({ srcBlob, audio }) {

    console.log(audio)
    console.log(srcBlob)
    if (!srcBlob) {
      return null;
    }



    if (audio) {
      return <audio src={URL.createObjectURL(srcBlob)} controls />;
    }

    return (

      <video
        src={URL.createObjectURL(srcBlob)}
        width={520}
        height={480}
        controls
      />



    );
  }



  function P(props) {
    if (props.srcBlob !== null) {
      setalertbox2(true)
    }
    setblob(props.srcBlob)
    return (
      <div>

      </div>
    )
  }




  function Recorder() {


    let {
      error,
      status,
      mediaBlob,
      stopRecording,
      getMediaStream,
      startRecording,
      isAudioMuted
    } = useMediaRecorder({
      recordScreen: true,
      blobOptions: { type: 'video/webm' },
      mediaStreamConstraints: { audio: true, video: true }
    });
    const [recorderstate, setrecorderstate] = useState(false)



    function clickHandler(event) {
      event.preventDefault()
      console.log(event)
      stopRecording(event)

      setblob(mediaBlob)
      setalertbox2(true)
    }


    function handleClick(event) {
      console.log(event)
      event.preventDefault()
      recorderstate ? setrecorderstate(false) : setrecorderstate(true)
    }






    return (
      <article>

        <button className="keyword_btn" style={{ marginLeft: "35px", width: "110%" }} onClick={(event) => handleClick(event)}>Screen Recorder</button>
        {recorderstate ? <div className="keyword_containerdiv" style={{ marginLeft: "35px", overflowY: "hidden" }}>
          {/* <div className="flx">
      {error ? `${status} ${error.message}` : status}
      </div> */}
          <section>




            <div className="flx">
              <button
                className="checkbox_file"
                style={{ backgroundColor: "green", fontSize: "15px", color: "white", marginLeft: "20px" }}

                type="button"
                onClick={startRecording}

                disabled={status === 'recording'}
              >
                Start recording
              </button>
            </div>
            <div className="flx">
              <button
                className="checkbox_file"
                style={{ backgroundColor: "red", fontSize: "15px", color: "white", marginLeft: "20px" }}
                type="button"
                onClick={stopRecording}


              >
                Stop recording
              </button>
            </div>
          </section>
          <P srcBlob={mediaBlob} />
          {/* <button onClick={(event)=>download(event,mediaBlob)}>Download</button> */}
        </div> : null}
      </article>
    );
  }


  // function CreateImage(){





  //   return(
  //   <div> 

  // { noi.map((each)=>{



  //     return(
  //       <div className="create" key={each}>

  //       <SelectFile i={each}/>


  //   <button className="close_btn" style={{background:"none"}} onClick={(event)=>close(event,each)}><HighlightOffIcon /></button>
  //       <img className="addimg"  style={{color:"white"}} id={`myimage${each}`} />


  //       </div>
  //      )


  //    })}
  // </div> 

  //   )  




  // }

  function alertclick(event) {
    event.preventDefault()

    setalertbox(false)
  }



  function Card(props) {
    return (



      <div className="flx">

        {/* <div className="flx">

<div>props.amount</div>
<input className="checkbox_file" onChange={(event)=>dropValueGetter(event,1)} type="checkbox" value="java" />
</div> */}

        <input
          onClick={(event) => paymentalert(event, props.amount)}
          className="checkbox_file"
          value={`${props.amount}`}
          style={{ marginLeft: "35px" }}
          readOnly={true}
        />





        {/* <p className="idiv" id={props.hours}> For Rs {props.amount} {`->`} {props.hours} hours</p> */}
      </div>
    )
  }

  const token = localStorage.getItem("usertoken")
  const decoded = jwt_decode(token)







  async function razorPayPaymentHandler(money) {


    setload(true)

    const API_URL = `${url}/payment/`
    const orderUrl = `${API_URL}order/${money}`;
    const response = await Axios.get(orderUrl);
    const { data } = response;


    const options = {
      key: '',
      name: decoded.data.username,
      description: "This is a description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}/${money}`;
          const captureResponse = await Axios.post(url, {})
          const successObj = JSON.parse(captureResponse.data)
          const captured = successObj.captured;


          if (captured) {
            setload(false)
            setquestion((prevvalue) => {
              return {
                ...prevvalue,
                paymentinfo: successObj
              }
            })

          }

        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }




  function paymentok() {
    setpaymentalertbox(false)
    razorPayPaymentHandler(paymentvalue)
    setpaymentstate(false)
  }






  function Paystate(event) {
    event.preventDefault()

    paymentstate ? setpaymentstate(false) : setpaymentstate(true)

  }


  function Imagestate(event) {
    event.preventDefault()

    imgstate ? setimagestate(false) : setimagestate(true)
  }


  function mainstate(event) {
    event.preventDefault()

    mstate ? setmstate(false) : setmstate(true)
  }



  function addlinks(event, a) {
    if (a === 1) {
      setavailablelinks((prev) => {
        return {
          ...prev,
          git: event.target.value
        }
      })
    }
    else if (a === 2) {
      setavailablelinks((prev) => {
        return {
          ...prev,
          youtube: event.target.value
        }
      })
    }
    else if (a === 3) {
      setavailablelinks((prev) => {
        return {
          ...prev,
          googledrive: event.target.value
        }
      })
    }
    else if (a === 4) {
      setavailablelinks((prev) => {
        return {
          ...prev,
          codeeditor: event.target.value
        }
      })
    }
    else if (a === 5) {
      setavailablelinks((prev) => {
        return {
          ...prev,
          other: event.target.value
        }
      })
    }
  }

  function valuesetter(val) {
    setquestion((prevvalue) => {
      return {
        ...prevvalue,
        content: val
      }

    })
  }

  function descset(event) {

    setquestion((prevvalue) => {
      return {
        ...prevvalue,
        title: event.target.value
      }
    })
  }

  function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }

  async function imageHandler() {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      console.log(input.files)

      var file = input.files[0];
      var formData = new FormData();

      formData.append('image', file);

      var fileName = file.name;

      // const res = await this.uploadFiles(file, fileName, quillObj); 
      const res = await uploadimage(file, fileName, quillObj)


    }
  }




  function uploadimage(file, filename, quillObj) {



    const uploadtask = storage.storage().ref(`images/${filename}`).put(file)
    uploadtask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage.storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(imgurl => {


            const range = quillObj.getEditorSelection();
            quillObj.getEditor().insertEmbed(range.index, 'image', imgurl);

          })
      }
    )




  }

  var languagem = ["JavaScript", "Python",
    "HTML",
    "CSS",
    "C++",
    "Java",
    "Kotlin",
    "C#",
    "Perl",
    "PHP",
    "Swift",
    "MATLAB",
    "SQL",
    "R",
    "Golang",
    "Ruby",
    "TypeScript",
    "Rust",
    "Scheme",
    "Scala"
  ]

  var fieldsm = [
    "Computer Networking",
    "Computer Software",
    "Cloud computing",
    "Cyber Security and Ethical Hacking",
    "Data Science and Data Analysis",
    "Operating system",
    "Web Development",
    "Graphics design",
    "Artificial intelligence",
    "DBMS",
    "Game development",
    "UI & UX",
    "3D design",
    "Cryptography",
    "Mobile App Development",
    "SEO"
  ]

  var framem = [
    "React",
    "ASP.NET",
    "Ruby",
    "AngularJS",
    "Django",
    "Spring",
    "Express",
    "Flask",
    "Tensor Flow",
    "CNTK",
    "Theano",
    "Torch",
    "Swiftic",
    "Native",
    "React-Native",
    "Ionic",
    "Adobe PhoneGap",
    "Flutter",
    "JQuery Mobile"
  ]




  function languagemaker() {
    return (
      <div>
        {
          languagem.map((e) => {
            return (
              <div className="flx">

                <input className="checkbox_file" style={{ marginLeft: "10px", fontSize: "15px" }} onClick={(event) => dropValueGetter(event, 1)} readOnly={true} value={e} />
              </div>
            )
          })
        }
      </div>
    )
  }

  function fieldmaker() {
    return (
      <div>
        {
          fieldsm.map((e) => {
            return (
              <div className="flx">

                <input className="checkbox_file" style={{ marginLeft: "10px", fontSize: "15px" }} onClick={(event) => dropValueGetter(event, 3)} readOnly={true} value={e} />
              </div>
            )
          })
        }
      </div>
    )
  }

  function framemaker() {
    return (
      <div>
        {
          framem.map((e) => {
            return (
              <div className="flx">

                <input className="checkbox_file" style={{ marginLeft: "10px", fontSize: "15px" }} onClick={(event) => dropValueGetter(event, 2)} readOnly={true} value={e} />
              </div>
            )
          })
        }
      </div>
    )
  }

  function communitymaker() {
    return (
      <div>
        {
          community.map((e) => {
            return (
              <div className="flx">

                <input className="checkbox_file" style={{ marginLeft: "10px", fontSize: "15px" }} onClick={(event) => dropValueGetter(event, 4)} readOnly={true} value={e} />
              </div>
            )
          })
        }
      </div>
    )
  }

  function selectClick(event, a) {
    event.preventDefault()
    if (a === 1) {

      lngdd ? setlngdd(false) : setlngdd(true)
    }

    else if (a === 2) {
      frdd ? setfrdd(false) : setfrdd(true)
    }

    else if (a === 3) {
      fdd ? setfdd(false) : setfdd(true)
    }

    else if (a === 4) {
      cdd ? setcdd(false) : setcdd(true)
    }

  }

  console.log(blob)


  function AlertBox2(props) {

    function download(event, blob) {
      event.preventDefault()
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.target = "blank"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return (
      <div className="alert">
        <div className="alertbox2">
          <Player srcBlob={blob} />
          <button className="ok_btn" style={{ width: "100px" }} onClick={(event) => download(event, blob)}>Download</button>
          <button className="ok_btn" style={{ left: "170px" }} onClick={props.click}>OK</button>

          {/* <a href={URL.createObjectURL(blob)} download> Download </a> */}
        </div>
      </div>

    )

  }


  function AlertBox3() {
    return (
      <div className="alert2">
        <Batch cancel={setpaymentalertbox} send={send} load={load} paymenthandler={razorPayPaymentHandler} />
      </div>
    )
  }




  function paymentalert(event, a) {
    event.preventDefault();
    setpaymentstate(false)


    if (a === 0) {
      setalertmessage("You can ask your question for free without any time frame")

    }

    if (a === "3") {
      setalertmessage(<p> 3 /6hr:

        For Rs. 3 you can get answer to your question within 6 hours otherwise your amount will be refunded automatically within next 2 days </p>)
      setpaymentvalue(3)
    }

    if (a === "5") {
      setalertmessage(<p> 5/3 hr:

        For Rs. 5 you can get answer to your question within 3 hours otherwise your amount will be refunded automatically within next 2 days  </p>)
      setpaymentvalue(5)
    }
    if (a === "10") {
      setalertmessage(<p> 10/1 hr:

        For Rs. 10 you can get answer to your question within 1 hours otherwise your amount will be refunded automatically within next 2 days  </p>)
      setpaymentvalue(10)
    }
    setpaymentalertbox(true)
  }






  return (



    <div className="maincard" id="maincard">
      {alertbox ? <AlertBox message="First Add Description" click={(event) => alertclick(event)} /> : null}
      {/* <p onClick={(event)=>mainstate(event)}  style={{color:"black",textAlign:"center",marginTop:"20px",cursor:"pointer",fontSize:"60px"}}>Post your Question here</p> */}
      {alertbox2 ? <AlertBox2 click={() => setalertbox2(false)} /> : null}

      {paymentalertbox ? <AlertBox3 /> : null}
      {/* {mstate?  */}
      {/* <div className="inputdiv"> */}
      <form action="#">

        {/* <div  className="headcard" > */}
        {/*   
     <p className="add" >Code</p> */}



        {/* {cstate?<CodeM   Change={OnChangetitle}  val={question.title} name="title" plh="Enter Question"  hght="60px" wdt="1450" required={true} />:null}  
{cstate?<CodeM   Change={OnChangecontent}  val={question.content} name="content" plh="Enter or Copy Code" hght="400px" wdt="1450" />:null}  */}
        <div style={{ display: "flex", height: "100%" }}>


          <div className="tinymce">
            <input className="descinput" placeholder="Add Title of Question" onChange={(event) => descset(event)} />

            <Tinymce

              style={{ marginLeft: "50px" }}
              set={valuesetter}
              height="608px"

              alert={setalertbox2}
            />



          </div>

          <div className="keyworddiv">

            <br></br>
            <div className="keyword_div">
              <button onClick={(event) => { selectClick(event, 1) }} className="keyword_btn">Languages</button>
              {lngdd ? <div className="keyword_containerdiv">
                {languagemaker()}

              </div> : null}
            </div>

            <div className="keyword_div">
              <button onClick={(event) => { selectClick(event, 2) }} className="keyword_btn" >Frameworks</button>
              {frdd ? <div className="keyword_containerdiv">
                {framemaker()}

              </div> : null}
            </div>

            <div className="keyword_div">
              <button onClick={(event) => { selectClick(event, 3) }} className="keyword_btn" >Fields</button>
              {fdd ? <div className="keyword_containerdiv">
                {fieldmaker()}

              </div> : null}
            </div>

            <div className="keyword_div">
              <button onClick={(event) => { selectClick(event, 4) }} className="keyword_btn" >Community</button>
              {cdd ? <div className="keyword_containerdiv">
                {communitymaker()}

              </div> : null}
            </div>


            <div>
              <h3 style={{ fontSize: "13px", marginLeft: "40px" }}>Click Twice to Open </h3>
              <h3 style={{ fontSize: "13px", marginLeft: "40px" }}>Give Permission to both screen and mic to record</h3>
              <Recorder />
            </div>



          </div>




        </div>


        <button onClick={(event) => proceed(event)} style={{ left: "81%" }} className="send-button" >Proceed</button>
      </form>





      {/* </div> */}


    </div>




  )


}

export default File;