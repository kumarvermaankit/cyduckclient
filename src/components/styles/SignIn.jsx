import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { useAppContext } from "../lib/contextlib";
import login from "../UserFunctions";
import "../styles/Signin.scss"
import Google from "../googlelogin";
import cyduck from "../cyduck.png";
import axios from "axios"

function SignIn(props) {
    const [signpara, setsignpara] = useState(false);
    const { userHasAuthenticated } = useAppContext();
    const [emails, setemails] = useState([])
    const [emailstate, setemailstate] = useState()
    const [emailval, setemailval] = useState("")
    const [userP, setUserP] = useState({
        email: "",
        password: "",
    });
    const history = useHistory();

    useEffect(() => {
        axios.get("https://cyduck2.herokuapp.com/signin/availableinfo")
            .then((result) => {

                setemails(result.data.data)
            })
    }, [])



    function OnChange(event, a) {

        event.preventDefault()


        if (event.target.value !== undefined && event.target.value.length !== 0) {
            if (a === 1) {

                if (emails.includes(event.target.value) === true || emails.includes(emailval) === true) {
                    setemailstate(true)
                }
                else {
                    setemailstate(false)
                }
            }
            setemailval(event.target.value)
        }
        const { name, value } = event.target;

        return (

            setUserP(prevValue => {

                return {
                    ...prevValue,
                    [name]: value

                }
            })
        )
    }




    function OnSubmit(event) {

        event.preventDefault();

        if (emailstate === true) {
            login(userP).then(res => {
                if (res) {
                    userHasAuthenticated(true);
                    history.push("/community")
                }
                else {
                    setsignpara(true);
                }
            })
                .catch(err => console.log(err));
        }
    }


    return (
        <div >
            {/* <div className="login-container" id="divsign">
              
                <form onSubmit={OnSubmit} >

                    <p class="header" ><b>LOG IN !</b></p>
                    <div >
                        <label ><h3 ><b>Email</b></h3></label>
                        <input id="inputelement1" className="signinput" type="email" name="email" value={userP.email} onChange={(event) => OnChange(event, 1)} onFocus={() => emailstate ? setemailstate(true) : setemailstate(false)} required="true" />
                        {console.log(emailstate)}
                        {emailstate === true ? <p className="checkpara1" >Alright</p> : emailstate === false ? <p className="checkpara" >Email doesn't exist</p> : null}
                    </div>

                    <div className="flexdiv">
                        <label className="inputlabel"><h3 ><b>Password</b></h3></label>
                        <input id="inputelement2" className="signinput" type="password" name="password" value={userP.} passwordonChange={(event) => OnChange(event, 0)} required="true" autoComplete="off" />
                    </div>
                    <div>
                        {signpara ? <p className="cred">Password and Email does not match </p> : null}
                    </div>
                    <div >
                        <button className=" signinput" id="signbutton" type="submit" classname="btn btn-primary"><h3><b>LOGIN</b></h3></button>
                    </div>
                </form>
                <div>

                    <div className="line">

                    </div>


                </div></div>
            <div className="otherlogin">
                <img className="cyduck_in" src={cyduck} alt="" />
                <a id="signupoption" href="/signup"><p>SignUp</p></a>
                <Google />
            </div> */}

            <div className="loginPage">
                <div className="loginContainer">
                    <h1>Login</h1>
                    <div>
                        <label className="email">Email</label>
                        <br />
                        <input className="inputv" id="email" v-model="email" type="email" placeholder="Your email address" type="email" name="email" value={userP.email} onChange={(event) => OnChange(event, 1)} onFocus={() => emailstate ? setemailstate(true) : setemailstate(false)} required="true"></input>
                    </div>
                    <div>
                        <label className="password">Password</label>
                        <br />
                        <input className="inputv" id="password" placeholder="Your Password" type="password" name="password" value={userP.password} onChange={(event) => OnChange(event, 0)} required="true" autoComplete="off" ></input>
                    </div>

                    <div className="login" onClick={(event) => OnSubmit(event)}>
                        <button className="loginBtn">
                            Log in
                        </button>
                        <p>New User ? <a href="/signup">SignUp</a></p>
                    </div>

                </div>
            </div>


        </div>
    )
}


export default SignIn