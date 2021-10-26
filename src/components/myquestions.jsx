import Community from "./community"
import jwt_decode from "jwt-decode";

function MyQuestions() {
    const token = localStorage.usertoken;
    var decoded = jwt_decode(token)


    const url2 = `http://localhost:5000`

    const url = `https://cyduck2.herokuapp.com`





    return (
        <div>

            <Community url={`${url}/upload/myquestions/${decoded.data.username}`} />
        </div>
    )
}

export default MyQuestions;