//`https://cyduck.herokuapp.com/upload`

import Community from "./community"

function CommunityFile(props) {

    const url2 = `http://localhost:5000`

    const url = `https://cyduck2.herokuapp.com`

    return (
        <Community url={`${url}/upload/allquestions`} />
    )
}

export default CommunityFile;