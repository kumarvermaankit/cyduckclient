import React, { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"
import { useAppContext } from "./lib/contextlib";
import "./profile.css"
import MultiSelect from "react-multi-select-component";
import { useHistory, useParams } from "react-router";
import EditIcon from '@material-ui/icons/Edit';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import storage from "./fire_base"




function Profile() {

  const url = `https://cyduck2.herokuapp.com`

  let params = useParams()
  var tkn = localStorage.getItem('usertoken');
  var token;
  var decoded;

  const [anslength, setanslength] = useState(0)



  if (tkn !== null) {

    token = localStorage.usertoken
    decoded = jwt_decode(token)
  }

  const { userHasAuthenticated } = useAppContext();
  const [pswlength, setpswlength] = useState(false)
  let history = useHistory()

  const [file, setfile] = useState(null)
  const [psrc, setpsrc] = useState(null)

  const [users, setusers] = useState([])
  const [info, setinfo] = useState({
    skills: [],
    answered: []
  })

  const [pswstate, setpswstate] = useState(false)

  const [ph, setph] = useState(false)
  const [clg, setclg] = useState(false)
  const [upi, setupi] = useState(false)

  const [myw, setmyw] = useState(false)
  const [rp, setrp] = useState(0)
  const [imgp, setimgp] = useState(0)
  const [userp, setuserp] = useState(false)
  const [pfield, setpfield] = useState(false)
  const [npfield, setnpfield] = useState()
  const [para, setpara] = useState()
  const [skills, setskills] = useState();
  const [changevalue, setchangevalue] = useState("")
  const [sl, setsl] = useState(false)
  const [sfr, setsfr] = useState(false)
  const [sf, setsf] = useState(false)

  const skls = [
    { label: "javascript", value: "javascript" },
    { label: "java", value: "java" },
    { label: "python", value: "python" },
    { label: "C++", value: "C++" },
    { label: "C", value: "C" },
    { label: "ruby", value: "ruby" },
    { label: "Web-Development", value: "WebD" },
    { label: "Android-Development", value: "Android" },
    { label: "UI-UX", value: "uix" },
    { label: "Data-Structures and Algorithms", value: "DSA" },
    { label: "Competitive-Codeing", value: "CC" },
    { label: "AI and ML", value: "AM" },
    { label: "Django", value: "Django" }
  ]







  useEffect(() => {





    if (tkn !== null) {
      const token = localStorage.usertoken
      var decoded = jwt_decode(token)
    }



    if (decoded) {

      axios.get(`${url}/profile/${params.username}`)
        .then((result) => {

          setpsrc(result.data)
        })
        .catch((err) => {
          console.log(err)
        })



      axios.get(`${url}/upload/info/${params.username}`)
        .then((result) => {
          setinfo(result.data.data)

          if (result.data.data.answered.length < 5) {
            setanslength(5)


          }
          else if (result.data.data.answered.length < 25) {
            setanslength(25)
          }
          else if (result.data.data.answered.length > 25) {
            setanslength(50)
          }
        })
        .catch((err) => {
          console.log(err)
        })


    }



  }, [imgp])


  // useEffect(()=>{


  //   document.querySelector(".ql-video").innerHTML="video"
  // },[])


  console.log(anslength)

  var timeoutInMiliseconds = 120000;
  var timeoutId;

  function startTimer() {
    setusers([])
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
  }

  function doInactive() {
    setrp(rp + 1)
  }





  useEffect(() => {


    axios.get(`${url}/upload/allusers`)
      .then((result) => {

        setusers(result.data.data)
      })



  }, [rp])



  console.log(info)

  async function sendimage() {


    var i_url;

    const uploadtask = storage.storage().ref(`images/${file.name}`).put(file)
    uploadtask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage.storage()
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(imgurl => {
            i_url = imgurl

            profilehelp()
          })
      }
    )

    async function profilehelp() {


      const r = await axios.post(`${url}/profile/upload`, { username: params.username, profilelink: i_url })
      if (r) {
        setimgp(imgp + 1)
      }
      return;
    }


    //   const token = localStorage.usertoken
    //   var decoded=jwt_decode(token)

    // console.log(file)
    // var data=new FormData();
    // data.append("file",file)



    //  axios.post(`${url}/profile`,data)

  }



  function Setprofile(event) {

    setfile(event.target.files[0])
  }

  function openwindow() {
    myw ? setmyw(false) : setmyw(true)
  }


  function Imagewindow() {

    return (
      <div className="imagewindow">
        <label htmlFor="pro" className="custom-file-upload" style={{ height: "20px", fontSize: "10px" }}><ImageSearchIcon /></label>
        <input type="file" id="pro" onChange={(event) => Setprofile(event)} />

        <button style={{ color: "black", fontSize: "10px", position: "relative", left: "10px", top: "2px" }} onClick={() => sendimage()}>Upload</button>
      </div>
    )

  }

  async function Logout() {



    await localStorage.removeItem('usertoken')
    userHasAuthenticated(false);

    history.push("/signin");
  }


  async function Change(event, a) {

    event.preventDefault()


    const token = localStorage.usertoken
    var decoded = jwt_decode(token)
    if (a === 1) {
      var val = document.getElementById("username").value
      if (para === true) {
        const t = await axios.post(`${url}/upload/usernamechange`, { username: val, oldusername: params.username })
        if (t) {
          Logout()
        }
      }
    }

    if (a === 2) {
      var val = document.getElementById("phone").value

      const t = await axios.post(`${url}/upload/phone`, { phone: val, username: params.username })
      if (t) {
        setimgp(imgp + 1)
        setph(false)
      }
    }

    if (a === 3) {
      var val = document.getElementById("college").value

      const t = await axios.post(`${url}/upload/college`, { college: val, username: params.username })
      if (t) {
        setimgp(imgp + 1)
        setclg(false)
      }
    }

    if (a === 4) {
      var val = document.getElementById("upi").value

      const t = await axios.post(`${url}/upload/upi`, { upi: val, username: params.username })
      if (t) {
        setimgp(imgp + 1)
        setupi(false)
      }
    }

  }




  async function User(event) {
    event.preventDefault()
    console.log(event.target.value.length)
    if (event.target.value.length > 0) {
      if (users.includes(event.target.value)) {
        setpara(false)
      }
      else {
        setpara(true)
      }
    }


    setrp(rp + 1)
  }


  async function Pswrdchecker(event) {
    event.preventDefault()

    const token = localStorage.usertoken
    var decoded = jwt_decode(token)

    var val = document.getElementById("oldpassword").value

    const r = await axios.post(`${url}/password/passwordchecker`, { username: params.username, oldpassword: val })

    console.log(r)

    if (r.data.data === true) {
      setpfield(true)
    }

  }



  async function Changepswrd(event) {
    event.preventDefault()



    var val1 = document.getElementById("password").value
    var val2 = document.getElementById("confirmpassword").value

    if (val1.length < 5) {
      setpswlength(true)
      return
    }

    if (val1 === val2) {
      const r = await axios.post(`${url}/password/changepassword`, { username: params.username, password: val1 })
      console.log(r)
      if (r.data.data === true) {
        Logout()
      }

    }

    else {
      setnpfield(true)
    }

  }


  function dropValueGetter(value) {


    setskills(value)


  }


  async function Addskill(event) {
    event.preventDefault()
    const token = localStorage.usertoken
    var decoded = jwt_decode(token)
    const r = await axios.post(`${url}/upload/addskill`, { username: params.username, skills: skills })

    if (r) {
      setimgp(imgp + 1)
    }

  }


  function Unstate(event, a) {
    event.preventDefault()
    if (a === 1) {
      document.getElementById("username").value = ""

      userp ? setuserp(false) : setuserp(true)
      setchangevalue(1)
    }
    if (a === 2) {
      document.getElementById("phone").value = ""
      ph ? setph(false) : setph(true)
      setchangevalue(2)
    }

    if (a === 3) {
      document.getElementById("college").value = ""
      clg ? setclg(false) : setclg(true)
      setchangevalue(3)
    }
    if (a === 4) {
      document.getElementById("upi").value = ""
      upi ? setupi(false) : setupi(true)
      setchangevalue(4)
    }
    if (a === 5) {

      sl ? setsl(false) : setsl(true)
      setchangevalue(5)
    }

    if (a === 6) {

      sf ? setsf(false) : setsf(true)
      setchangevalue(6)
    }

    if (a === 7) {
      sfr ? setsfr(false) : setsfr(true)
      setchangevalue(7)
    }


  }



  function showskill() {
    return (
      <div className="listdiv">
        {info.skills.map((each) => {
          return (
            <p>{each.label}</p>
          )
        })}
      </div>
    )

  }





  function Showpswchange() {
    pswstate ? setpswstate(false) : setpswstate(true)
  }





  return (
    <div className="container">

      <div className="mp">
        <div>

          <img className="mainprofile" src={psrc === null || psrc === undefined || psrc === "" ? "https://firebasestorage.googleapis.com/v0/b/cyduck-3be89.appspot.com/o/images%2Fprofile1.jpg?alt=media&token=52193340-cd44-425d-9484-6fc68b7466a9" : psrc} />

          <div>
            <input className="inpt f" type="file" accept="image/*" />
            {/* {tkn!==null?decoded.data.username===params.username?<label for="file" className="lab" onClick={openwindow}><ImageSearchIcon /></label>:null:null} */}
            <Imagewindow />
          </div>
        </div>

  <div>
        <div>
        <p className="progress_info">{anslength - info.answered.length} questions to reach next level</p>

        </div>
        <div className="progress">
          <div style={{ width: `${(info.answered.length / anslength) * 100}%`, height: "100%", backgroundColor: "blue" }}></div>
          <div style={{ width: `${100 - ((info.answered.length / anslength) * 100)}%`, height: "100%", backgroundColor: "white" }}></div>
        </div>
        <div className="progress_para">
          <p style={{ color: "white" }}>{anslength}</p>
        </div>

 </div>

        <div className="skilldiv">
          <div style={{ display: "flex" }}>
            <h3 className="sklheader">Skills</h3>
            {(decoded.data.username === params.username) ? <button className="editbtn2" onClick={(event) => Unstate(event, 5)}><EditIcon style={{ width: "20px", height: "20px" }} /></button> : null}
            {sl ? <MultiSelect
              className="drop_down1"
              options={skls}
              value={skills}
              onChange={(value) => dropValueGetter(value)}
              labelledBy={"skills"}
              required={true}
            /> : null}
            {sl ? <button className="bt2" style={{ marginLeft: "20px" }} onClick={(event) => Addskill(event)}><CheckCircleIcon style={{ width: "30px", height: "30px" }} /></button> : null}

          </div>
          {info !== {} ? showskill() : null}
        </div>







        

      </div>

<div>
      <div className="profile_mid">
        {(decoded.data.username === params.username) ?

          <div>
            <label className="" for="email" >Email: </label>
            <input className="inpt ip" id="email" type="email" placeholder="Email ID" value={decoded.data.email} readOnly={true} />
            </div> : null}
        <div>
          <label className="" for="username" >Username: </label>
          <input className="inpt " onFocus={(event) => Unstate(event, 1)} id="username" type="text" value={params.username} readOnly={true} />
          {/* { (decoded.data.username===params.username)? <button className="editbtn"   style={{left:"780px",bottom:"7px",top:"-45px"}} onClick={(event)=>Unstate(event,1)}><EditIcon style={{width:"23px",height:"23px",color:"black"}}/></button>:null}
        {userp?(para===true||para===undefined)?<p className="userpara" style={{color:"#29bb89"}}>available</p>:<p className="userpara" style={{color:"red"}}>Already Exists</p>:null} */}
        </div>

        {(decoded.data.username === params.username) ?
          <div>
            <label className="" for="phone" >Phone Number: </label>
            {ph ? <input className="inpt ip" id="phone" type="text" placeholder="Phone Number" /> : <input className="inpt ip" onFocus={(event) => Unstate(event, 2)} id="phone" on type="text" value={info.phone} readOnly={true} />}
            {/* {ph?<button className="bt" style={{left:"740px",bottom:"83px"}} onClick={(event)=>Change(event,2)}><CheckCircleIcon style={{width:"23px",height:"23px"}} /></button>:null} */}
            {(decoded.data.username === params.username) ? <button className="editbtn" onClick={(event) => Unstate(event, 2)} ><EditIcon /></button> : null}
          </div> : null}
        <div>
          <label className="" for="college" >College: </label>
          {clg ? <input className="inpt ip" id="college" type="text" placeholder="College Name" /> : <input className="inpt ip" onClick={(event) => Unstate(event, 3)} id="college" type="text" value={info.college} readOnly={true} />}
          {/* {clg?<button className="bt" style={{left:"740px",bottom:"83px"}} onClick={(event)=>Change(event,3)}><CheckCircleIcon style={{width:"23px",height:"23px"}} /></button>:null} */}
          {(decoded.data.username === params.username) ? <button className="editbtn" onClick={(event) => Unstate(event, 3)}><EditIcon /></button> : null}
        </div>
        {/* style={{left:"670px",bottom:"83px"} */}
        {(decoded.data.username === params.username) ?
          <div>
            <label className="" for="upi" >UPI_ID: </label>
            {upi ? <input className="inpt ip" type="text" id="upi" placeholder="Add your UPI ID" /> : <input onFocus={(event) => Unstate(event, 4)} className="inpt ip" type="text" id="upi" value={info.upi} readOnly={true} />}
            {/* {upi?<button className="bt" style={{left:"740px",bottom:"83px"}} onClick={(event)=>Change(event,4)}><CheckCircleIcon style={{width:"23px",height:"23px"}} /></button>:null} */}
            <button className="editbtn"  onClick={(event) => Unstate(event, 4)}><EditIcon /></button>
          </div>
          : null}


      </div>
      {(decoded.data.username === params.username) ?
        <div className="save-profile">
          <button className="bt" onClick={(event) => Change(event, changevalue)}>Save</button>
          <a className="pswbtn" href="#pswrddiv" onClick={(event) => Showpswchange(event)}>Change Password</a>
          {pswstate ? <form id="pswrddiv">

            <h3 className="pshead">Password Change</h3>
            {pfield === false ?
              <div className="pswdiv">
                <label className="l" for="oldpassword">Current Password : </label>
                <input className="pswinput" id="oldpassword" type="password" placeholder="Current Password" required={true} />
                <button className="bt2" onClick={(event) => Pswrdchecker(event)}><CheckCircleIcon style={{ width: "23px", height: "23px" }} /></button>
              </div>
              : null}

            {pfield ? <div>
              <div className="pswdiv" >
                <label className="l" style={{ top: "0px" }} for="password">New Password : </label>
                <input className="pswinput" style={{ left: "60px" }} id="password" type="text" placeholder="New Password" required={true} />
              </div>
              <div className="pswdiv" style={{ marginLeft: "270px" }}>
                <label className="l" style={{ top: "0px" }} for="confirmpassword">Confirm Password : </label>
                <input className="pswinput" id="confirmpassword" type="text" placeholder="Confirm Password" required={true} />
              </div>
              {pswlength ? <p style={{ marginLeft: "280px", marginTop: "20px", color: "red" }}>Password length should be greater than 5 characters</p> : null}
              {npfield ? <p style={{ color: "red" }}>These two password are same</p> : npfield === undefined ? null : <p>These two password are NOT same</p>}
              <button className="bt3" onClick={(event) => Changepswrd(event)}>Change</button>

            </div> : null}

          </form> : null}
        </div>
        : null}


</div>
    </div>
  )
}

export default Profile