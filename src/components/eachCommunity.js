import Community from "./community"
import { useParams } from "react-router-dom";
function Groups() {

    const url2 = `http://localhost:5000`

    const url = `https://cyduck2.herokuapp.com`

    let params = useParams();

    var name = params.name;

    return (
        <Community url={`${url}/upload/community/${name}`} />
    )
}

export default Groups;