//`https://cyduck.herokuapp.com/upload`

import Community from "./community"

function CommunityFile(props) {

    const url2 = `http://localhost:5000`

    const url = `https://cyduck.cyclic.app`

    return (
        <Community url={`${url}/upload/allquestions`} />
    )
}

export default CommunityFile;