import React,{useState,useEffect} from 'react';
import useMediaRecorder from '@wmik/use-media-recorder';

function Player({ srcBlob, audio }) {



  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  return (

 <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      controls
    />
    
 
   
  );
}

export default function Recorder() {
  const [divstate,setdivstate]=useState(false)

  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    isAudioMuted
  } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio: true, video: true }
  });





function download(event,blob){
  event.preventDefault()
  const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

function handleClick(event){
  event.preventDefault()
  divstate?setdivstate(false):setdivstate(true)
}

  return (
    <article>
     
      <button className="keyword_btn" style={{marginLeft:"35px"}} onClick={(event)=>handleClick(event)}>Screen Recorder</button>
  {divstate?<div className="keyword_containerdiv" style={{marginLeft:"35px"}}>
  {/* <div className="flx">
      {error ? `${status} ${error.message}` : status}
      </div> */}
      <section>
           
         


     <div className="flx">
        <button
        className="checkbox_file"
        style={{backgroundColor:"#ffffff",fontSize:"15px"}}
        
          type="button"
          onClick={startRecording}
          disabled={status === 'recording'}
        >
          Start recording
        </button>
        </div>
        <div className="flx">
        <button
        className="checkbox_file"
        style={{backgroundColor:"#ffffff",fontSize:"15px"}}
          type="button"
          onClick={stopRecording}
          disabled={status !== 'recording'}
        >
          Stop recording
        </button>
        </div>
      </section>
      <Player srcBlob={mediaBlob} />
     {/* <button onClick={(event)=>download(event,mediaBlob)}>Download</button> */}
     </div>:null}
    </article>
  );
}

