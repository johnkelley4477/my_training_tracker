/* Third Party */
import React from 'react';
import {Link} from '@reach/router';

function statsItem(props){
	function daysFromToday(){
		const pasted = new Date(props.date);
		const today = new Date();
		const days = Math.abs(today - pasted);
		const count =  Math.floor(days / (1000*60*60*24));
		if(count > 365){
			return "Let's get Started!"
		}else if(count === 0){
			return "Good job today!"
		}
		return `Last performed ${count} day ago`;
	}
	return(
		<Link to= {"/stats/" + props.exercise.toLowerCase()} className="no_dec text_center">
			<div>
				<h2 className="font_large">{props.exercise}</h2>
			</div>
			<div>
				<span>{daysFromToday()}</span>
			</div>
		</Link>
	)
}

export default statsItem;
