
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"
import { useAppContext } from "./lib/contextlib";
import "../components/Signup.scss"
import Google from "./googlelogin";

import cyduck from "./cyduck.png";
const url2 = `http://localhost:5000`

const url = `https://cyduck2.herokuapp.com`

function SignUp(props) {




    const [signpara, setsignpara] = useState(false);

    const { userHasAuthenticated } = useAppContext();

    const [usernames, setusernames] = useState([])

    const [emails, setemails] = useState([])

    const [emailstate, setemailstate] = useState()

    const [userstate, setuserstate] = useState()
    const [userP, setUserP] = useState({
        email: "",
        username: "",
        password: "",
    });
    const history = useHistory();




    function OnChange(event, a) {

        if (a === 1) {
            if (emails.includes(event.target.value) === true) {
                setemailstate(false)
            }
            else {
                setemailstate(true)
            }
        }

        else if (a === 2) {
            if (usernames.includes(event.target.value) === true) {
                setuserstate(false)
            }
            else {
                setuserstate(true)
            }
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



    useEffect(() => {
        axios.get("https://cyduck2.herokuapp.com/signup/availableinfo")
            .then((result) => {
                setusernames(result.data.data.usernames)
                setemails(result.data.data.emails)
            })
    }, [])




    function OnSubmit(event) {

        event.preventDefault();
        //    setIsLoading(true);

        if (emailstate === true && userstate === true) {

            axios.post(`${url}/signup`, userP)
                .then(res => {

                    if (res.data.data === true) {
                        history.push("/signin");


                    }
                    else {
                        setsignpara(true);
                    }

                })
                .catch(err => console.log(err));
            // setIsLoading(false);

        }
        else {
            setsignpara(true);
        }
    }












    return (

        <div>

            {/* <div className="signup-container">


                <form onSubmit={OnSubmit} >


                    <div className="sign-up-box">
                        <p className="header" style={{ margin: "2% 2%" }}><b>Sign Up For Free</b></p>
                        <label><h3><b>Email</b></h3></label>
                        <input id="inputelement1" style={{ height: "50px" }} type="email" name="email" value={userP.email} onChange={(event) => OnChange(event, 1)} onFocus={() => setemailstate(true)} required="true" autoComplete="off" />
                        {emailstate !== undefined ? emailstate ? <p className="checkpara1" style={{ top: "30px", left: "42px" }} >Available</p> : <p className="checkpara" style={{ top: "30px", left: "42px" }}>Not available</p> : null}
                    </div>
                    <div >
                        <label><h3><b>Username</b></h3></label>
                        <input id="inputelement2s" style={{ height: "50px" }} type="text" name="username" value={userP.username} onChange={(event) => OnChange(event, 2)} onFocus={() => setuserstate(true)} required="true" auoCtomplete="off" />
                        {userstate !== undefined ? userstate ? <p className="checkpara1" style={{ top: "30px", left: "42px" }} >Available</p> : <p className="checkpara" style={{ top: "30px", left: "42px" }}>Not available</p> : null}
                    </div>
                    <div >
                        <label><h3><b>Password</b></h3></label>
                        <input
                            id="inputelement3" type="password" name="password" value={userP.password} onChange={(event) => OnChange(event, 0)} required="true" autoComplete="off" />
                    </div>
                    <div>
                        {signpara ? <p>User already exists</p> : null}
                    </div>
                    <div>
                        <button className=" signinput" id="signupbutton" classname="btn btn-primary" type="submit" ><h3><b>Sign Up</b></h3></button>
                    </div>
                </form>
            </div>

            <div className="otherlogin">
                <img className="cyduck_in" src={cyduck} alt="" />
                <a id="signupoption" href="/signin"><p>LogIn</p></a>
                <Google />
            </div> */}

            <div className="signupPage">
                <div className="signupContainer">
                    <h1>SignUp</h1>
                    <div className="input_sign">
                        <label className="email">Email</label>
                        <br />
                        <input className="input"
                            id="email"
                            v-model="email"
                            text="email"
                            placeholder="Your email address"

                            type="email" name="email" value={userP.email} onChange={(event) => OnChange(event, 1)} onFocus={() => setemailstate(true)} required="true" autoComplete="off"

                        >
                        </input>
                        {emailstate !== undefined ? emailstate ? <p className="checkpara1"  >Available</p> : <p className="checkpara" >Not available</p> : <p style={{ visibility: "hidden" }} className="checkpara" >Not available</p>}
                    </div>

                    <div className="input_sign">
                        <label className="email">Username</label>
                        <br />
                        <input className="input"
                            id="email"


                            placeholder="Your Username"

                            type="text" name="username" value={userP.username} onChange={(event) => OnChange(event, 2)} onFocus={() => setuserstate(true)} required="true" auoCtomplete="off"

                        >
                        </input>
                        {userstate !== undefined ? userstate ? <p className="checkpara1" >Available</p> : <p className="checkpara" >Not available</p> : <p style={{ visibility: "hidden" }} className="checkpara" >Not available</p>}
                    </div>


                    <div className="input_sign">
                        <label className="password">Password</label>
                        <br />
                        <input className="input"
                            id="password"
                            v-model="password"
                            type="password"
                            placeholder="Your Password"



                            type="password" name="password" value={userP.password} onChange={(event) => OnChange(event, 0)} required="true" autoComplete="off"
                        >
                        </input>
                    </div>
                    {/* <div>
                        <label className="verifypassword">
                            Confirm Password
                        </label>
                        <br />
                        <input className="input"
                            id="verifyPassword"
                            v-model="password"
                            type="password"
                            placeholder="Confirm Your Password"

                            onChange={(event) => { checkValidation(event) }}
                        >
                        </input>
                        <div className="verifyPass">
                            {isError}
                        </div>
                    </div> */}

                    <div className="signUp">
                        <button className="signupBtn" onClick={(event) => OnSubmit(event)}>
                            SignUp
                        </button>
                        <p>Already have an account? <a href="">LogIn</a>
                        </p>

                    </div>
                </div>
            </div>


        </div>
    )
}


export default SignUp
