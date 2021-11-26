import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "./lib/contextlib";
import { Navbar, Nav } from "react-bootstrap"
import "./navbar.css"
import jwt_decode from "jwt-decode";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from "axios";
import DoneIcon from '@material-ui/icons/Check';
import logo from "./logo.png"




function NavigationBar() {

  const url2 = `http://localhost:5000`

  const url = `https://cyduck2.herokuapp.com`


  const [l, setl] = useState("")
  let history = useHistory();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();


  const [currentpage, setcurrentpage] = useState("Page")
  const [community, setcommunity] = useState([])
  var tkn = localStorage.getItem('usertoken');


  if (tkn !== null) {
    const token = localStorage.usertoken
    var decoded = jwt_decode(token)
    console.log(decoded)
  }

  const [lpara, setlpara] = useState(true)
  const [fpara, setfpara] = useState(true)
  const [frpara, setfrpara] = useState(true)

  const [sfocus, setsfocus] = useState(false)

  const [selected, setSelected] = useState({
    languages: [],
    fields: [],
    frameworks: [],
    string: ""

  });
  const [passvalue, setpassvalue] = useState({
    larr: [],
    farr: [],
    frarr: [],
    s: ""
  })


  const groups = ["codechef", "mait", "codesauce", "msit"]

  const [groupstate, setgroupstate] = useState(false)

  const [psrc, setpsrc] = useState()

  async function Logout(event) {

    event.preventDefault();

    await localStorage.removeItem('usertoken')
    userHasAuthenticated(false);

    history.push("/home");
  }





  function Setprofile(imgurl) {

    setpsrc(imgurl)


  }





  useEffect(() => {


    setl(window.location)

    var l1 = window.location

    if (((l1.toString().substr((l1.toString().length - ("/community").length), ("/community").length)) == "/community")) {
      setcurrentpage("Community")
    }
    else if (((l1.toString().substr((l1.toString().length - ("/file").length), ("/file").length)) == "/file")) {
      setcurrentpage("Ask Question")
    }
    else if (((l1.toString().substr((l1.toString().length - ("/editor").length), ("/editor").length)) == "/editor")) {
      setcurrentpage("Editor")
    }
    else if (((l1.toString().substr((l1.toString().length - ("/faq").length), ("/faq").length)) == "/faq")) {
      setcurrentpage("faq")
    }
    else if (((l1.toString().substr((l1.toString().length - ("/home").length), ("/home").length)) == "/home")) {
      setcurrentpage("home")
    }
    else {
      setcurrentpage("other")
    }

    if (decoded) {
      axios.get(`https://cyduck2.herokuapp.com/profile/${decoded.data.username}`)
        .then((result) => {

          Setprofile(result.data)

        })
        .catch((err) => {
          console.log(err)
        })
    }



  }, [l])





  useEffect(() => {


    if (decoded !== undefined) {
      axios.get(`${url}/upload/mygroups/${decoded.data.username}`).then((result) => {
        setcommunity(result.data)
      })
    }

  }, [])


  const languages = [
    { label: "javascript", value: "javascript" },
    { label: "java", value: "java" },
    { label: "python", value: "python" },
    { label: "C++", value: "C++" },
    { label: "C", value: "C" },
    { label: "ruby", value: "ruby" },
  ]

  const fields = [
    { label: "Web-Development", value: "WebD" },
    { label: "Android-Development", value: "Android" },
    { label: "UI-UX", value: "uix" },
    { label: "Data-Structures and Algorithms", value: "DSA" },
    { label: "Competitive-Codeing", value: "CC" },
    { label: "AI and ML", value: "AM" },
  ]





  function dropValueGetter(value, a) {


    if (a === 1) {
      setlpara(false)
      var arr1 = []
      setSelected((prevvalue) => {
        return {
          ...prevvalue,
          languages: value
        }
      })

      value.map((each) => {
        arr1.push(each.value)
      })
      setpassvalue((prevvalue) => {
        return {
          ...prevvalue,
          larr: arr1
        }
      })



    }
    else if (a === 2) {
      setfpara(false)
      var arr1 = []

      setSelected((prevvalue) => {
        return {
          ...prevvalue,
          fields: value
        }
      })
      value.map((each) => {

        arr1.push(each.value)
      })
      setpassvalue((prevvalue) => {
        return {
          ...prevvalue,
          farr: arr1
        }
      })

    }
    else if (a === 3) {
      setfrpara(false)
      var arr1 = []
      setSelected((prevvalue) => {
        return {
          ...prevvalue,
          frameworks: value
        }
      })
      value.map((each) => {
        arr1.push(each.value)
      })
      setpassvalue((prevvalue) => {
        return {
          ...prevvalue,
          frarr: arr1
        }
      })

    }


    if (passvalue.s === "") {
      setpassvalue((prevvalue) => {
        return {
          ...prevvalue,
          s: null
        }
      })
    }
  }


  function Search() {
    var str1 = ""
    var str2 = ""
    var str3 = ""

    for (var i = 0; i < passvalue.larr.length; i++) {
      if (i === (passvalue.larr.length - 1)) {
        str1 = str1 + `${passvalue.larr[i]}`
      }
      else {
        str1 = str1 + `${passvalue.larr[i]}` + ","
      }
    }
    for (var i = 0; i < passvalue.farr.length; i++) {
      if (i === (passvalue.farr.length - 1)) {
        str2 = str2 + `${passvalue.farr[i]}`
      }
      else {
        str2 = str2 + `${passvalue.farr[i]}` + ","
      }
    }
    for (var i = 0; i < passvalue.frarr.length; i++) {
      if (i === (passvalue.frarr.length - 1)) {
        str3 = str3 + `${passvalue.frarr[i]}`
      }
      else {
        str3 = str3 + `${passvalue.frarr[i]}` + ","
      }
    }

    var val = document.getElementById("search").value
    var t
    if (passvalue.larr.length === 0) {
      str1 = null
    }
    if (passvalue.farr.length === 0) {
      str2 = null
    }
    if (passvalue.frarr.length === 0) {
      str3 = null
    }
    if (val === "") {
      t = null
    }
    else {
      t = val
    }

    var s = `/search/${str1}/${str2}/${str3}/${t}`

    history.push(s)

  }

  function dropNavbar(e) {
    console.log(e)
  }


  function searchfocus(event) {

    event.preventDefault()

    // document.getElementById("langpara").style.transform="translate(20px,0)"
    // document.getElementById("langpara").style.transition="0.05s all ease-in-out"
  }

  function renderGroups() {
    return (
      <div className="groups">
        {groups.map((each) => {
          return (
            <div className="group_list" onClick={dropNavbar}><a href={`/groups/${each}`} style={{ color: "black" }} >{each.toUpperCase()}</a>{community.includes(each) === true ? <DoneIcon style={{ color: "black", width: "15px", height: "15px", marginLeft: "17%" }} /> : null}</div>
          )
        })}
      </div>
    )
  }



  function AfterLoginNav() {


    return (
      <div >
        <Navbar expand="lg" id="nav_bar" >



          <div className="dropdown">
            <button className="drop" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {psrc === null || psrc === undefined || psrc === "" ? <img src="https://firebasestorage.googleapis.com/v0/b/cyduck-3be89.appspot.com/o/images%2Fprofile1.jpg?alt=media&token=52193340-cd44-425d-9484-6fc68b7466a9" className="profile" alt="no-image" /> : <img src={psrc} className="profile" alt="no-image" />}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" href={`/pro_file/${decoded.data.username}`}>Profile</a></li>
              <li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={Logout} >Logout<ExitToAppIcon style={{ height: "25px", width: "25px" }} /></a></li>
              <li><a className="dropdown-item" href={`/myq`}>My Questions</a></li>

            </ul>
          </div>




          {/* <img src={logo} className="navLogo" /> */}
          <Navbar.Brand className="cyducktitle" href="/home" ><p><b>Cy<span>duck</span></b></p></Navbar.Brand>


          {/* <form className="frm" onSubmit={Search}>
        <input id="search" className="searchInput" onMouseUp={(event)=>searchfocus(event)} placeholder="Search by ID or string" />
        <button className="searchButton" type="submit"><SearchIcon /></button>
        
<MultiSelect
        className="drop_down lang"
        options={languages}
        value={selected.languages}
        onChange={(value)=>dropValueGetter(value,1)}
        labelledBy={"language"}
       
      />
     
     
<MultiSelect
        className="drop_down field"
        options={fields}
        value={selected.fields}
        onChange={(value)=>dropValueGetter(value,2)}
        labelledBy={"field"}
      />
      
      <MultiSelect
        className="drop_down fram"
        options={languages}
        value={selected.frameworks}
        onChange={(value)=>dropValueGetter(value,3)}
        labelledBy="frameworks"
        
      />
     <button className="filter_btn" type="submit">Filter<FilterListIcon /></button>
        </form> */}

          {/* { ((l.toString().substr((l.toString().length-("/file").length),("/file").length))!="/file" && (l.toString().substr((l.toString().length-("/file").length),("/file").length))!="/home")? */}
          {/* <div> */}
          <a className={`navitem ${currentpage === "Ask Question" ? "navitem_active" : null}`} href="/file" >Ask Question</a>


          {/* { ((l.toString().substr((l.toString().length-("/editor").length),("/editor").length))!="/editor")? */}
          <a className={`navitem ${currentpage === "Editor" ? "navitem_active" : null}`} href="/editor" >Editor</a>



          {/* <div className="currentpage" >{currentpage}</div> */}

          {/* { (l.toString().substr((l.toString().length-("/community").length),("/community").length))!="/community" && (l.toString().substr((l.toString().length-("/home").length),("/home").length))!="/home"?  */}
          <a href="/community" className={`navitem ${currentpage === "Community" ? "navitem_active" : null}`}  >Community</a>



          <a className={`navitem ${currentpage === "faq" ? "navitem_active" : null}`} style={{ position: "relative", left: "-50px" }} href="/faq" >FAQ</a>
          <div>

          </div>
          <a className={`navitem ${currentpage === "faq" ? "navitem_active" : null}`} onClick={() => groupstate ? setgroupstate(false) : setgroupstate(true)} style={{ position: "relative", left: "-50px", cursor: "pointer" }} >Groups</a>
          {groupstate ? renderGroups() : null}


          {/* 
  {lpara || selected.languages.length===0?<p id="langpara" className="langpara">languages</p>:<p className="langpara1" >languages</p>}
     {fpara || selected.fields.length===0?<p className="fieldpara">fields</p>:<p className="fieldpara1" >fields</p>}
     {frpara || selected.frameworks.length===0?<p className="framepara">frameworks</p>:<p className="framepara1" >frameworks</p>} */}


        </Navbar>


      </div>
    )

  }


  function BeforeLoginNav() {
    return (
      <div >
        <Navbar expand="lg" id="nav_bar" >
          <img src={logo} className="navLogo" id='navLogoBefore' />
          <Navbar.Brand className="cyducktitle" href="/home" ><p><b>Cy<span>Duck</span></b></p></Navbar.Brand>

          {/* <form className="frm1" onSubmit={Search}>
        <input id="search" className="searchInput" placeholder="Search" />
        <button className="searchButton" type="submit"><SearchIcon /></button>
<MultiSelect
        className="drop_down lang"
        options={languages}
        value={selected.languages}
        onChange={(value)=>dropValueGetter(value,1)}
        labelledBy={"Select"}
      />
      <p className="langpara">languages</p>
<MultiSelect
        className="drop_down field"
        options={fields}
        value={selected.fields}
        onChange={(value)=>dropValueGetter(value,2)}
        labelledBy={"Select"}
      />
      <span className="fieldtip">fields</span>
      <MultiSelect
        className="drop_down fram"
        options={languages}
        value={selected.frameworks}
        onChange={(value)=>dropValueGetter(value,3)}
        labelledBy={"Select"}
      />
      <span className="framtip">framworks</span>
        </form> */}


          <div className="navSign">
            <a className="navitem" href="/signin">Signin</a>
            <a className="navitem" href="signup">Signup</a>
          </div>



          <a href="/community" className="navitem" >Community</a>

          {/* 
      {lpara || selected.languages.length===0?<p id="langpara" style={{right:"1142px"}} className="langpara">languages</p>:<p className="langpara1" >languages</p>}
     {fpara || selected.fields.length===0?<p className="fieldpara "  style={{right:"981px"}}>fields</p>:<p className="fieldpara1" >fields</p>}
     {frpara || selected.frameworks.length===0?<p className="framepara"  style={{right:"826px"}} >frameworks</p>:<p className="framepara1" >frameworks</p>} */}
        </Navbar>

      </div>
    )
  }


  return (

    <div>
      {isAuthenticated ? <AfterLoginNav /> : <BeforeLoginNav />}

    </div>
  )

}

export default NavigationBar