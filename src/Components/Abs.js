/* Third Party */
import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Helper */
import formatDate from '../Helpers/formatDateForCal';
import beep from '../Helpers/noiseMaker';
/* Client side */
import '../client/css/accordion.css';

function Abs(props){
	const [date,setDate]= useState(() => {
		const initialState = formatDate(new Date());
		return initialState;
	});
	const [scissors,setScissors]= useState(0);
	const [russianTwist,setRussianTwist]= useState(0);
	const [legRaises,setLegRaises]= useState(0);
	const [situps,setSitups]= useState(0);
	const [jumpingjax,setJumpingjax]= useState(0);
	const [kneeHigh,setKneeHigh]= useState(0);
	const [sideToSides, setSideToSides]= useState(0);
	const [sidePlanks, setSidePlanks]= useState(0);
	const [mountClimbers,setMountClimbers]= useState(0);
	const [bicycle,setBicycle]= useState(0);
	const [totalSec,setTotalSec]= useState(0);
	const [secPerRep,setSecPerRep]= useState(30);
	const [comments,setComments]= useState("How'd it go?");
function stepper(){
		const exercises = [
			setScissors,
			setRussianTwist,
			setLegRaises,
			setSitups,
			setJumpingjax,
			setKneeHigh,
			setSideToSides,
			setSidePlanks,
			setMountClimbers,
			setBicycle,
			setTotalSec];
		let exeInc = 0;
		let secCount = 0
		let step = setInterval(() =>{
			++secCount;
			let e = exercises[exeInc];
			console.log(exeInc >= exercises.length);
			if(secCount <= secPerRep && exeInc < exercises.length){
				e(secCount);
			}else if (secCount > secPerRep && exeInc < exercises.length){
				secCount=0;
				++exeInc;
				beep(999, 220, 300)
			}else if(exeInc >= exercises.length){
				clearInterval(step);
			}
		},1000);
	}
function	handleSubmit(e){
		e.preventDefault();
		const dateT = new Date(date).getTime();
		const abs = {
			timestamp: dateT,
			date: date,
			scissors: scissors,
			russianTwist: russianTwist,
			legRaises: legRaises,
			situps: situps,
			jumpingjax: jumpingjax,
			kneeHigh: kneeHigh,
			sideToSides: sideToSides,
			sidePlanks: sidePlanks,
			mountClimbers: mountClimbers,
			bicycle: bicycle,
			comments: comments
		}
		const ref = firebase
			.database()
			.ref(`Abs/${props.user}`);
		ref.push(abs);
		navigate('/stats/abs');
	}
	return(
		<form onSubmit= {e => {handleSubmit(e)}} className="form">
			<h1>Abs Workout</h1>
			<input type="date" id="date" name="date" value={date} className="mt15 center" onChange={() => setDate(document.getElementById('date').value)}/>
			<label htmlFor="scissors">Scissors</label>
			<input type="number" id="scissors"  name="scissors" value={scissors} className="mt15" onChange={() => setScissors(document.getElementById('scissors').value)}/>
			<label htmlFor="russianTwist">Russian Twist</label>
			<input type="number" id="russianTwist" name="russianTwist" value={russianTwist} className="mt15" onChange={() => setRussianTwist(document.getElementById('russianTwist').value)}/>
			<label htmlFor="legRaises">Leg Raises</label>
			<input type="number" id="legRaises" name="legRaises" value={legRaises} className="mt15" onChange={() => setLegRaises(document.getElementById('legRaises').value)}/>
			<label htmlFor="situps">Sit-ups</label>
			<input type="number" id="situps"  name="situps" value={situps} className="mt15" onChange={() => setSitups(document.getElementById('situps').value)}/>
			<label htmlFor="jumpingjax">Jumping Jax</label>
			<input type="number" id="jumpingjax" name="jumpingjax" value={jumpingjax} className="mt15" onChange={() => setJumpingjax(document.getElementById('jumpingjax').value)}/>
			<label htmlFor="kneeHigh">Knee Highs</label>
			<input type="number" id="kneeHigh" name="kneeHigh" value={kneeHigh} className="mt15" onChange={() => setKneeHigh(document.getElementById('kneeHigh').value)}/>
			<label htmlFor="sideToSides">Side To Sides</label>
			<input type="number" id="sideToSides"  name="sideToSides" value={sideToSides} className="mt15" onChange={() => setSideToSides(document.getElementById('sideToSides').value)}/>
			<label htmlFor="sidePlanks">Side Planks</label>
			<input type="number" id="sidePlanks" name="sidePlanks" value={sidePlanks} className="mt15" onChange={() => setSidePlanks(document.getElementById('sidePlanks').value)}/>
			<label htmlFor="mountClimbers">Mount Climbers</label>
			<input type="number" id="mountClimbers" name="mountClimbers" value={mountClimbers} className="mt15" onChange={() => setMountClimbers(document.getElementById('mountClimbers').value)}/>
			<label htmlFor="bicycle">Bicycle</label>
			<input type="number" id="bicycle" name="bicycle" value={bicycle} className="mt15" onChange={() => setBicycle(document.getElementById('bicycle').value)}/>
			<label htmlFor="secPerRep">Per rep time</label>
			<div className="grid-parent flex mb15 mt15">
				<input type="text" id="secPerRep" name="secPerRep" className="grid33" value={secPerRep} onChange={() => setSecPerRep(document.getElementById('secPerRep').value)}/>
				<input type="button" className="grid33" onClick={stepper}  value="Start"/>
			</div>
			<textarea className="comments mt15" id="comments" name="comments" value={comments} onChange={() => setComments(document.getElementById('comments').value)}/>
			<input type="submit" className="grid-parent mt15 mb15"/>
		</form>
	)
}

export default Abs;
