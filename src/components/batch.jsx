import React, { useState } from 'react'

import "./batch.css";

import Loading from "./Glass_lines.gif"

// import Loading from "./loading-14.gif"
import CloseIcon from '@material-ui/icons/Close';

export default function Batch(props) {

	const [bgclr, setbgclr] = useState("red")

	function mouseUp() {
		setbgclr("green")
	}
	function mouseDown() {
		setbgclr("red")
	}
	return (
		<div class="boxes" id="card">

			<div class="box2">
				<button style={{ backgroundColor: "transparent", border: "none" }} onMouseUp={mouseDown} onMouseDown={mouseUp} onClick={() => props.cancel(false)}><CloseIcon style={{ backgroundColor: bgclr }} /></button>
				<div class="card-box">
					<h3 class="card-title card-title1">Free</h3>
					<p class="card-text card-text1">
						Question will be posted to community
						<br />page, but the answer timing will not be bounded.
					</p>
					<button onClick={() => props.send()} class="card-btn card-btn1" >Post</button>
				</div>
				<div class="card-box">
					<h3 class="card-title card-title1">Rs 3/-</h3>
					<p class="card-text">
						For Rs. 3 you can get answer to your question within 7 hours otherwise your amount will be refunded automatically within next 2 days.
					</p>
					<button class="card-btn card-btn1" onClick={() => props.paymenthandler(3)}>Pay</button>
				</div>
			</div>
			<div class="box2">
				<div class="card-box">
					<h3 class="card-title card-title1">Rs 5/-</h3>
					<p class="card-text">
						For Rs. 5 you can get answer to your question within 5 hours otherwise your amount will be refunded automatically within next 2 days.
					</p>
					<button class="card-btn card-btn1" onClick={() => props.paymenthandler(5)}>Pay</button>
				</div>
				<div class="card-box">
					<h3 class="card-title card-title1">Custom</h3>
					<p class="card-text">
						For Rs.10 you can get answer to your question within 3 hours otherwise your amount will be refunded automatically within next 2 days.
					</p>
					<button class="card-btn card-btn1" onClick={() => props.paymenthandler(10)}>Pay</button>

				</div>
				<button onClick={() => props.send()} style={{ marginLeft: "38.5%" }} className="send-button">POST</button>
				{props.load ? <iframe src={Loading} width="180" height="80" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> : null}

				{/* "https://giphy.com/embed/3oEjI6SIIHBdRxXI40" */}
			</div>
		</div>
	)
}
