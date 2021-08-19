import React, { useEffect } from "react"
import "./navbar.css"
function CodeEditor(){

useEffect(()=>{
console.log(document.querySelector("div"))
},[])

    return(
        <div >
        <iframe className="CEdiv" src="https://ide.judge0.com/"></iframe>
        </div>
    )
}

export default CodeEditor