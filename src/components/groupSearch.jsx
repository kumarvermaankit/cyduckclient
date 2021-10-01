import Community from "./community"
import { useParams } from "react-router-dom";


function GroupSearch() {



    let params = useParams();
    var lstr = params.languages;
    lstr = lstr.split(",")
    for (var i = 0; i < lstr.length; i++) {
        if (lstr[i] === "C  ") {
            lstr[i] = "C++"
        }
    }
    var fstr = params.fields;
    fstr = fstr.split(",")

    var frstr = params.frameworks;
    frstr = frstr.split(",")

    const url = `https://cyduck2.herokuapp.com`
    const url2 = `http://localhost:5000`

    return (
        <Community url={`${url}/upload/groupsearch/${params.name}/${fstr}/${lstr}/${frstr}`} />
    )
}

export default GroupSearch