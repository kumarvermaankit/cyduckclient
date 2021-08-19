import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import MultiSelect from "react-multi-select-component";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';


export default function Search() {
    let history=useHistory();
    const [passvalue,setpassvalue]=useState({
        larr:[],
        farr:[],
        frarr:[],
        s:""
      })

      const [lpara,setlpara]=useState(true)
      const [fpara,setfpara]=useState(true)
      const [frpara,setfrpara]=useState(true)
      
      const [sfocus,setsfocus]=useState(false)
      
      const [selected, setSelected] = useState({
        languages:[],
        fields:[],
        frameworks:[],
        string:""
      
      });


      const [lngdd,setlngdd]=useState(true)
    const [frdd,setfrdd]=useState(true)
    const [fdd,setfdd]=useState(true)

      const [selectedlang,setselectedlang]=useState([])
      const [selectedfram,setselectedfram]=useState([])
      const [selectedfield,setselectedfield]=useState([])

      function search(){
        var str1=""
        var str2=""
        var str3=""
        
        for(var i=0;i<selectedlang.length;i++){
            if(i===(selectedlang.length-1)){
                str1=str1+`${selectedlang[i]}`
            }
            else{
            str1=str1+`${selectedlang[i]}`+","
            }
        }
        for(var i=0;i<selectedfield.length;i++){
            if(i===(selectedfield.length-1)){
                str2=str2+`${selectedfield[i]}`
            }
            else{
            str2=str2+`${selectedfield[i]}`+","
            }
        }
        for(var i=0;i<selectedfram.length;i++){
            if(i===(selectedfram.length-1)){
                str3=str3+`${selectedfram[i]}`
            }
            else{
            str3=str3+`${selectedfram[i]}`+","
            }
        }
      
      var val=document.getElementById("search").value
      var t
      if(selectedlang.length===0){
        str1=null
      }
      if(selectedfield.length===0){
        str2=null
      }
      if(selectedfram.length===0){
        str3=null
      }
      if(val===""){
        t=null
      }
      else{
      t=val
      }
      
      var s=`/search/${str1}/${str2}/${str3}/${t}`
      
      
        history.push(s)
       
      }


      function selectClick(event,a){
        event.preventDefault()
        if(a===1){
      
      lngdd?setlngdd(false):setlngdd(true)
        }
      
      else if(a===2){
        frdd?setfrdd(false):setfrdd(true)
      }
      
      else if(a===3){
        fdd?setfdd(false):setfdd(true)
      }
      
      }
      var languagem=["JavaScript","Python",
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

  var fieldsm=[
    "Computer Networking",
    "Computer Software",
    "Cloud computing",
    "Cyber Security",
    "Data Science",
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

    var framem=[
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
      function languagemaker(){
      return(
          <div>
              {
                 languagem.map((e)=>{
                     return(
                      <div className="flx">

<input className="checkbox_file" onClick={(event)=>dropValueGetter(event,1)} readOnly={true}  value={e} />
</div>
                     )
                 }) 
              }
          </div>
      )
      }

function fieldmaker(){
  return(
    <div>
        {
           fieldsm.map((e)=>{
               return(
                <div className="flx">

<input className="checkbox_file" onClick={(event)=>dropValueGetter(event,3)} readOnly={true}  value={e} />
</div>
               )
           }) 
        }
    </div>
)
}

function framemaker(){
  return(
    <div>
        {
           framem.map((e)=>{
               return(
                <div className="flx">

<input className="checkbox_file" onClick={(event)=>dropValueGetter(event,2)} readOnly={true}  value={e} />
</div>
               )
           }) 
        }
    </div>
)
}

      function searchfocus(event){


        event.preventDefault()
        
        // document.getElementById("langpara").style.transform="translate(20px,0)"
        // document.getElementById("langpara").style.transition="0.05s all ease-in-out"
        }

        console.log(selectedlang)
        console.log(selectedfram)
        console.log(selectedfield)

        function dropValueGetter(event,a){
   
  
         
  
          if(a===1){
            if(selectedlang.includes(event.target.value)===false){
              setselectedlang([...selectedlang,event.target.value])
              console.log(event.target.classList)
              event.target.classList.add("active")
            }
            else{
              setselectedlang(selectedlang.filter((e)=>e!==event.target.value))
              event.target.classList.remove("active")
            }
          }
          else if(a===2){
            if(selectedfram.includes(event.target.value)===false){
              setselectedfram([...selectedfram,event.target.value])
              event.target.classList.add("active")
            }
            else{
              setselectedfram(selectedfram.filter((e)=>e!==event.target.value))
              event.target.classList.remove("active")
            }
          }
          else if(a===3){
            if(selectedfield.includes(event.target.value)===false){
              setselectedfield([...selectedfield,event.target.value])
              event.target.classList.add("active")
            }
            else{
              setselectedfield(selectedfield.filter((e)=>e!==event.target.value))
              event.target.classList.remove("active")
            }
          }
        
         
        

           
          }


          const languages=[
            {label:"javascript",value:"javascript"},
            {label:"java",value:"java"},
            {label:"python",value:"python"},
            {label:"C++",value:"C++"},
            {label:"C",value:"C"},
            {label:"ruby",value:"ruby"},
            ]
            
            const fields=[
            {label:"Web-Development",value:"WebD"},
            {label:"Android-Development",value:"Android"},
            {label:"UI-UX",value:"uix"},
            {label:"Data-Structures and Algorithms",value:"DSA"},
            {label:"Competitive-Codeing",value:"CC"},
            {label:"AI and ML",value:"AM"},
            ]
          

          
    return (
        <div className="search_main">
            <form className="frm" onSubmit={search}>
            <div className="searchbox">
        <input id="search" className="searchInput" onMouseUp={(event)=>searchfocus(event)} placeholder="Search by ID or string" />
        <button className="searchButton" type="submit"><SearchIcon /></button>
        </div>
        <div className="keyworddiv">
{/* <label for="keyword" style={{marginLeft:"440px",fontSize:"35px"}}>Keywords</label> */}
<br></br>
<div className="keyword_div">
<button onClick={(event)=>{selectClick(event,1)}} className="keyword_btn">Languages</button>
{lngdd?<div className="keyword_containerdiv">
{languagemaker()}
  
</div>:null}
</div>

<div className="keyword_div">
<button onClick={(event)=>{selectClick(event,2)}} className="keyword_btn" >Frameworks</button>
{frdd?<div className="keyword_containerdiv">
{framemaker()}

</div>:null}
</div>

<div className="keyword_div">
<button onClick={(event)=>{selectClick(event,3)}} className="keyword_btn" >Fields</button>
{fdd?<div className="keyword_containerdiv">
{fieldmaker()}
 
</div>:null}
</div>



     
     </div>
     <button className="filter_btn" type="submit">Search</button>
        </form>
        </div>
    )
}
