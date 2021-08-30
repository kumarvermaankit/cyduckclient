import React from 'react'

import "./batch.css";

import Loading from "./loading-14.gif"

export default function Batch(props) {
    return (
        <div class="boxes" id="card">
		
		<div class="box2">
		<button onClick={()=>props.cancel(false)}>Cancel</button>
			<div class="card-box">
				<h3 class="card-title card-title1">Free</h3>
					<p class="card-text card-text1">
						Question will be posted to community 
						<br/>page, but the answer timing will not be bounded.
					</p>
				<button class="card-btn card-btn1" >Post</button>
			</div>
			<div class="card-box">
					<h3 class="card-title card-title2">Rs 3/-</h3>
						<p class="card-text">
							For Rs. 3 you can get answer to your question within 7 hours otherwise your amount will be refunded automatically within next 2 days.
						</p>
							<button class="card-btn card-btn2" onClick={()=>props.paymenthandler(3)}>Pay</button>
			</div>
		</div>
		<div class="box2">
			<div class="card-box">
				<h3 class="card-title card-title3">Rs 5/-</h3>
					<p class="card-text">
						For Rs. 5 you can get answer to your question within 5 hours otherwise your amount will be refunded automatically within next 2 days.
					</p>
				<button class="card-btn card-btn3" onClick={()=>props.paymenthandler(5)}>Pay</button>
			</div>
			<div class="card-box">
				<h3 class="card-title card-title4">Rs 10/-</h3>
					<p class="card-text">
						For Rs.10 you can get answer to your question within 3 hours otherwise your amount will be refunded automatically within next 2 days.
					</p>
			<button class="card-btn card-btn4" onClick={()=>props.paymenthandler(10)}>Pay</button>
			
			</div>
			{props.load?<iframe src={Loading} width="380" height="380" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>:<button onClick={()=>props.send()} className="send-button">POST</button>}
			
			{/* "https://giphy.com/embed/3oEjI6SIIHBdRxXI40" */}
		</div>
	</div>
    )
}
