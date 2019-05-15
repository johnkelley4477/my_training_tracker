/* Third Party */
import React, {useState} from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Helper */
import formatDate from '../Helpers/formatDateForCal';
/* Client side */
import '../client/css/accordion.css';

function Legs(props) {
	const [date,setDate]= useState(() => {
		const initialState = formatDate(new Date());
		return initialState;
	});
	const [lungeSet1,setLungeSet1]= useState(0);
	const [squatSet1,setSquatSet1]= useState(0);
	const [bucketCarrySet1,setBucketCarrySet1]= useState(0);
	const [lungeSet2,setLungeSet2]= useState(0);
	const [squatSet2,setSquatSet2]= useState(0);
	const [bucketCarrySet2,setBucketCarrySet2]= useState(0);
	const [lungeSet3,setLungeSet3]= useState(0);
	const [squatSet3,setSquatSet3]= useState(0);
	const [bucketCarrySet3,setBucketCarrySet3]= useState(0);
	const [comments,setComments]= useState("How'd it go?");
	function handleSubmit(e){
		e.preventDefault();
		const dateT = new Date(date).getTime();
		const legs = {
			timestamp: dateT,
			date: date,
			lungeSet1: lungeSet1,
			squatSet1: squatSet1,
			bucketCarrySet1: bucketCarrySet1,
			lungeSet2: lungeSet2,
			squatSet2: squatSet2,
			bucketCarrySet2: bucketCarrySet2,
			lungeSet3: lungeSet3,
			squatSet3: squatSet3,
			bucketCarrySet3: bucketCarrySet3,
			comments: comments
		}
		const ref = firebase
			.database()
			.ref(`Legs/${props.user}`);
		ref.push(legs);
		navigate('/stats/legs');
	}
	let panelStyle = {
    display: "none"
  }
	return(
		<form onSubmit= {e => {handleSubmit(e)}} className="form">
			<h2>Leg Workout</h2>
			<input type="date" id="date" name="date" value={date} className="mt15 mb15 center" onChange={() => setDate(document.getElementById('date').value)}/>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel1");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 1</div>
			<div id="panel1" className="panel" style={panelStyle}>
				<label htmlFor="lungeSet1">Lunge</label>
				<input type="number" id="lungeSet1"  name="lungeSet1" value={lungeSet1} className="mt15" onChange={() => setLungeSet1(document.getElementById('lungeSet1').value)}/>
				<label htmlFor="squatSet1">Squats</label>
				<input type="number" id="squatSet1" name="squatSet1" value={squatSet1} className="mt15" onChange={() => setSquatSet1(document.getElementById('squatSet1').value)}/>
				<label htmlFor="bucketCarrySet1">Bucket Carry</label>
				<input type="number" id="bucketCarrySet1" name="bucketCarrySet1" value={bucketCarrySet1} className="mt15" onChange={() => setBucketCarrySet1(document.getElementById('bucketCarrySet1').value)}/>
			</div>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel2");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 2</div>
			<div id="panel2" className="panel" style={panelStyle}>
				<label htmlFor="lungeSet2">Lunge</label>
				<input type="number" id="lungeSet2"  name="lungeSet2" value={lungeSet2} className="mt15" onChange={() => setLungeSet2(document.getElementById('lungeSet2').value)}/>
				<label htmlFor="squatSet2">Squats</label>
				<input type="number" id="squatSet2" name="squatSet2" value={squatSet2} className="mt15" onChange={() => setSquatSet2(document.getElementById('squatSet2').value)}/>
				<label htmlFor="bucketCarrySet2">Bucket Carry</label>
				<input type="number" id="bucketCarrySet2" name="bucketCarrySet2" value={bucketCarrySet2} className="mt15" onChange={() => setBucketCarrySet2(document.getElementById('bucketCarrySet2').value)}/>
			</div>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel3");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 3</div>
			<div id="panel3" className="panel" style={panelStyle}>
				<label htmlFor="lungeSet3">Lunge</label>
				<input type="number" id="lungeSet3"  name="lungeSet3" value={lungeSet3} className="mt15" onChange={() => setLungeSet3(document.getElementById('lungeSet3').value)}/>
				<label htmlFor="squatSet3">Squats</label>
				<input type="number" id="squatSet3" name="squatSet3" value={squatSet3} className="mt15" onChange={() => setSquatSet3(document.getElementById('squatSet3').value)}/>
				<label htmlFor="bucketCarrySet3">Bucket Carry</label>
				<input type="number" id="bucketCarrySet3" name="bucketCarrySet3" value={bucketCarrySet3} className="mt15" onChange={() => setBucketCarrySet3(document.getElementById('bucketCarrySet3').value)}/>
			</div>
			<textarea className="comments mt15" id="comments" name="comments" value={comments} onChange={() => setComments(document.getElementById('comments').value)}/>
			<input type="submit" className="mt15 mb15"/>
		</form>
	)
}

export default Legs;
