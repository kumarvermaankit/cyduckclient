import Community from "./community"
import { useParams } from "react-router-dom";


function Stringsearch() {



    let params = useParams();


    const url = `https://cyduck.cyclic.app`
    const url2 = `http://localhost:5000`

    return (
        <Community url={`${url}/upload/stringsearch/${params.string}`} />
    )
}

export default Stringsearch