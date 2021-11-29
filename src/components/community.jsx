import React, { useEffect, useState } from "react"
import axios from "axios";
import "./community.css";

import { useParams } from "react-router-dom";


import Pagination from "react-js-pagination";
import { useHistory } from 'react-router-dom'

import Search from "./search";
import { format } from "timeago.js"
import gold from "./goldl2x.png"
import silver from "./silverl2x.png"
import bronze from "./bronzel2x.png"
import loadingbuffer from "./loading-buffering.png"
import { Cookies, useCookies } from "react-cookie"

import jwt_decode from "jwt-decode"


function Community(props) {
    const url2 = `http://localhost:5000`

    const url = `https://cyduck2.herokuapp.com`

    let params = useParams();



    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);



    let history = useHistory();
    var token = localStorage.usertoken
    var decoded;
    if (token) {
        decoded = jwt_decode(token)
    }


    const [loading, setloading] = useState(false)


    const [CD, setCD] = useState(true)
    const [rp, setrp] = useState(0)

    const [pagestatus, setpagestatus] = useState(true)
    const [activepage, setactivepage] = useState(1)

    const [no_of_questions, setno_of_questions] = useState(0);





    const [joinStatus, setjoinStatus] = useState(false)


    // const [selected, setSelected] = useState({
    //     languages:[],
    //     fields:[],
    //     frameworks:[],
    //     string:""

    // });
    // const [passvalue,setpassvalue]=useState({
    //     larr:[],
    //     farr:[],
    //     frarr:[],
    //     s:""
    // })





    const [arr, setarr] = useState([]);

    // var str="";


    async function handlePageChange(pageNumber) {
        setactivepage(pageNumber)
        setrp(rp + 1)
        //     console.log(activepage)
        //    const r= await axios.post("http://localhost:5000/upload/activepage",{pageNumber:pageNumber})
        //    if(r){
        //     window.location.reload();
        //    }

    }





    useEffect(() => {
        var l = window.location;
        setCookie("cookie-name", "hello", { val: "1" })
        // if(((l.toString().substr((l.toString().length-("/myq").length),("/myq").length))!=="/myq")){
        //     startTimer()
        // }









        setarr([])


        async function Helper() {
            //     const result=await axios.get(`${props.url1}`)

            //   console.log(result)


            //  if(result){


            setloading(true)
            var result = await axios.get(`${props.url}/${activepage}`);

            if (result) {
                setloading(false)
            }

            if (result.data.arr.length === 0) {
                setarr([null])
            }
            else {

                setarr(result.data.arr)
            }


            setno_of_questions(result.data.no_of_questions)


            // setactivepage(res.data.pagenumber)
            // setno_of_questions(res.data.no_of_questions)

            //  }


        }


        async function NonHelper() {
            setloading(true)
            const res1 = await axios.get(`${props.url}/${activepage}`);
            // const res2=await axios.get(`${props.url}`);
            // const res3=await axios.get(`${props.url3}`);
            // const res4=await axios.get(`${props.url4}`);

            // setarr([...res1.data.arr,...res2.data.arr,...res3.data.arr,...res4.data.arr])
            // arr.length=activepage*6
            if (res1) {
                setloading(false)
            }
            if (res1.data === false) {
                setpagestatus(false)
            }
            else {

                setarr(res1.data.arr)
            }


            //      
            setno_of_questions(res1.data.no_of_questions)
        }

        if (((l.toString().substr((l.toString().length - ("/myq").length), ("/myq").length)) == "/myq")) {
            Helper()
        }
        else {

            NonHelper()
        }






    }, [rp])



    useEffect(() => {
        if (decoded !== undefined) {
            axios.get(`${url}/upload/mygroups/${decoded.data.username}`).then((result) => {
                if (result.data.includes(params.name)) {
                    setjoinStatus(true)
                }
            })
        }

    }, [])

    // async function Support(){

    // setarr([])


    // async function Helper(){
    //   const result=await axios.get(`${props.url1}`)


    //   for(var i=0;i<result.data.questions.length;i++){
    //       if(i===(result.data.questions.length-1)){
    //           str=str+`${result.data.questions[i].index_no}`+`docname${result.data.questions[i].docname}`

    //       }
    //       else{
    //       str=str+`${result.data.questions[i].index_no}`+`docname${result.data.questions[i].docname}`+","


    //   } 
    //     }


    // const res= await axios.get(`${props.url}${str}`);

    // console.log(res)

    // if(res.data.arr.length===0){
    //    window.location.reload()
    // }
    //   setarr(res.data.arr)
    //   setactivepage(res.data.pagenumber)
    //   setno_of_questions(res.data.no_of_questions)

    // }


    // async function NonHelper(){
    //   const res= await axios.get(`${props.url}`);
    //   setarr(res.data.arr)
    //    setactivepage(res.data.pagenumber)
    //    setno_of_questions(res.data.no_of_questions)
    // }

    // if(((l.toString().substr((l.toString().length-("/myq").length),("/myq").length))!="/myq")){
    // Helper()
    // }
    // else{

    // NonHelper()
    // }


    // }     



    var timeoutInMiliseconds = 120000;
    var timeoutId;

    function startTimer() {

        timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)

    }

    function doInactive() {
        setrp(rp + 1)
    }




    console.log(cookies.name)



    function Countdown(props) {



        var time = Date.parse(props.time)
        var currenttime = Date.parse(new Date())

        const [secondspassed, setsp] = useState((((currenttime - time) / (1000)) - 17940))

        var c = 0




        useEffect(() => {



            if (props.d !== "extra") {
                setTimeout(() => {
                    setsp(secondspassed + 1)


                }, 1000)
            }





            async function extra() {
                if (c <= 1) {


                    const r = await axios.post(`${url}/upload/autodelete`, { document: props.d, index: props.idx, id: props.id })


                    if (r.data === true) {
                        window.location.reload()
                    }

                }
            }


            if ((((Date.parse(new Date())) - time) / 3600000) >= 6 && props.d !== "extra") {
                c = c + 1
                extra()

            }


        }, [secondspassed])



        return (
            <div className="community_timer">



                {props.d === "extra" ? null : <ul className="CD">



                    <li className="timer" >{Math.abs((Math.floor(secondspassed / (60 * 60)) % 24)) < 10 ? "0" + Number(Math.abs(Math.floor(secondspassed / (60 * 60)) % 24)) : Number(Math.abs(Math.floor(secondspassed / (60 * 60)) % 24))}</li>
                    <li className="timer">{Math.abs(Math.floor(secondspassed / 60) % 60) < 10 ? "0" + Math.abs(Math.floor(secondspassed / 60) % 60) : Math.abs(Math.floor(secondspassed / 60) % 60)}</li>
                    <li className="timer">{Math.abs(secondspassed % 60) < 10 ? "0" + Number(Math.abs(secondspassed % 60)) : Math.abs(secondspassed % 60)}</li>

                </ul>}
            </div>
        )




    }



    async function joinGroup() {

        if (decoded !== undefined) {
            const res = await axios.post(`${url}/upload/group_join`, { username: decoded.data.username, group: params.name })

            if (res) {
                setjoinStatus(true)
            }
        }


    }

    async function leaveGroup() {

        if (decoded !== undefined) {
            const res = await axios.post(`${url}/upload/group_leave`, { username: decoded.data.username, group: params.name })

            if (res) {
                setjoinStatus(false)
            }
        }


    }



    function Quesdiv(props) {


        { console.log(props.time) }
        return (

            <div style={{ display: "flex" }}>
                <div id={props.i} key={props.i} className="headercard" >



                    <a href={`/ques/${props.i}/${props.doc_name}/${props.u}`}><b><p style={{ color: "black", width: "450px" }}>{props.t.substring(0, 70)}</p></b><p className="username1">Asked By {props.u}</p><p className="date">{props.time !== undefined ? format(props.time) : "July 2021"}</p>  </a>


                    {CD ? <Countdown time={props.time} d={props.doc_name} idx={props.index} id={props.i} /> : null}




                    {/* {(props.doc_name==="bronze")?<img  class="card_img1" src={one}/>:(props.doc_name==="silver")?<img class="card_img1" src={five}/>:(props.doc_name==="gold")?<img  class="card_img1" src={five}/>:(props.doc_name==="extra")?<img  class="card_img1"  src={null}/>:null} */}

                </div>
                <img className="batch" src={props.doc_name === "gold" ? gold : props.doc_name === "silver" ? silver : props.doc_name === "bronze" ? bronze : null} />
            </div>
        )
    }









    const Items = () => {




        return (
            <div style={{ display: "block" }}>


                {arr.map((each) => {
                    if (each === null || each.info === null) {
                        return <h1 style={{ marginLeft: "660px" }}>NO Searches Found</h1>
                    }

                    return <Quesdiv key={each.id} t={each.question_title} i={each.id} u={each.username} doc_name={each.documentname} index={each.index} time={each.time} create={each.createdAt} />

                })}


            </div>
        )
    }






    return (

        <div>


            <div className="contain">








                {/* <div className="itemsdiv"> */}

                <div style={{ display: "flex" }}>

                    <div className="search_background">
                        <Search />
                    </div>
                    {
                        pagestatus ? loading ? <img src={loadingbuffer} className="loading_buffer" /> : <Items /> : <h1 style={{ marginLeft: "740px" }}>Not Found</h1>}
                    <div>
                        {pagestatus ? window.location.toString().includes("groups") && <button className="join" style={{ backgroundColor: joinStatus ? "rgb(248, 123, 123)" : "rgb(106, 243, 106)" }} onClick={joinStatus ? leaveGroup : joinGroup}>{joinStatus ? "Leave" : "Join"}</button> : null}
                    </div>

                </div>





                {/* </div> */}

                {/* <div className="hover_div">
<a className="hover_ask" href="/file">Ask</a>
</div> */}

                <Pagination
                    className="pages"
                    activePage={activepage}
                    itemsCountPerPage={6}
                    totalItemsCount={no_of_questions}
                    pageRangeDisplayed={6}
                    onChange={(pagenumber) => handlePageChange(pagenumber)}
                />

            </div>


        </div>
    )

}

export default Community;