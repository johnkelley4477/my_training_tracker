/* Third Party */
import React, {useState} from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Helper */
import formatDate from '../Helpers/formatDateForCal';
/* Client side */
import '../client/css/accordion.css';

function Pull(props) {
	const [date,setDate]= useState(() => {
		const initialState = formatDate(new Date());
		return initialState;
	});
	const [rope,setRope]= useState(0);
	const [together1,setTogether1]= useState(0);
	const [shoulder1,setShoulder1]= useState(0);
	const [wide1,setWide1]= useState(0);
	const [together2,setTogether2]= useState(0);
	const [shoulder2,setShoulder2]= useState(0);
	const [wide2,setWide2]= useState(0);
	const [together3,setTogether3]= useState(0);
	const [shoulder3,setShoulder3]= useState(0);
	const [wide3,setWide3]= useState(0);
	const [hang1,setHang1]= useState(0);
	const [hang2,setHang2]= useState(0);
	const [hang3,setHang3]= useState(0);
	const [comments,setComments]= useState("How'd it go?");
	function handleSubmit(e){
		e.preventDefault();
		const dateT = new Date(date).getTime();
		const pull = {
			timestamp: dateT,
			date: date,
			rope: rope,
			together1: together1,
			shoulder1: shoulder1,
			wide1: wide1,
			together2: together2,
			shoulder2: shoulder2,
			wide2: wide2,
			together3: together3,
			shoulder3: shoulder3,
			wide3: wide3,
			hang1: hang1,
			hang2: hang2,
			hang3: hang3,
			comments: comments
		}
		const ref = firebase
			.database()
			.ref(`Pull/${props.user}`);
		ref.push(pull);
		navigate('/stats/pull');
	}
	function sum(one,two,three){
		const One = Number.isNaN(parseInt(one)) ? 0 : parseInt(one);
		const Two = Number.isNaN(parseInt(two)) ? 0 : parseInt(two);
		const Three = Number.isNaN(parseInt(three)) ? 0 : parseInt(three);
		return One + Two + Three;
	}
	let panelStyle = {
    display: "none"
  }
	return(
		<form onSubmit= {e => {handleSubmit(e)}} className="form">
			<h2>Pull Workout</h2>
			<input type="date" id="date" name="date" value={date} className="mt15 center" onChange={() => setDate(document.getElementById('date').value)}/>
			<div className="accordion mt15" onClick={() => {
				let show = document.getElementById("panel1");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 1 Pull-ups <span className='sub'>{sum(wide1,shoulder1,together1)} reps</span></div>
			<div id="panel1" className="panel" style={panelStyle}>
					<label htmlFor="together1">Together</label>
					<input type="number" id="together1"  name="together1" value={together1} className="mt15" onChange={() => setTogether1(document.getElementById('together1').value)}/>
					<label htmlFor="shoulder1">Sholder</label>
					<input type="number" id="shoulder1" name="shoulder1" value={shoulder1} className="mt15" onChange={() => setShoulder1(document.getElementById('shoulder1').value)}/>
					<label htmlFor="wide1">Wide</label>
					<input type="number" id="wide1" name="wide1" value={wide1} className="mt15" onChange={() => setWide1(document.getElementById('wide1').value)}/>
				</div>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel2");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 2 Pull-ups <span className='sub'>{sum(wide2,shoulder2,together2)} reps</span></div>
			<div id="panel2" className="panel" style={panelStyle}>
				<label htmlFor="shoulder2">Sholder</label>
				<input type="number" id="shoulder2" name="shoulder2" value={shoulder2} className="mt15" onChange={() => setShoulder2(document.getElementById('shoulder2').value)}/>
				<label htmlFor="wide2">Wide</label>
				<input type="number" id="wide2" name="wide2" value={wide2} className="mt15" onChange={() => setWide2(document.getElementById('wide2').value)}/>
				<label htmlFor="together2">Together</label>
				<input type="number" id="together2"  name="together2" value={together2} className="mt15" onChange={() => setTogether2(document.getElementById('together2').value)}/>
			</div>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel3");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 3 Pull-ups <span className='sub'>{sum(wide3,shoulder3,together3)} reps</span></div>
			<div id="panel3" className="panel" style={panelStyle}>
					<label htmlFor="wide3">Wide</label>
					<input type="number" id="wide3" name="wide3" value={wide3} className="mt15" onChange={() => setWide3(document.getElementById('wide3').value)}/>
					<label htmlFor="together3">Together</label>
					<input type="number" id="together3"  name="together3" value={together3} className="mt15" onChange={() => setTogether3(document.getElementById('together3').value)}/>
					<label htmlFor="shoulder3">Sholder</label>
					<input type="number" id="shoulder3" name="shoulder3" value={shoulder3} className="mt15" onChange={() => setShoulder3(document.getElementById('shoulder3').value)}/>
				</div>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel4");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 4 Rope Climbs <span className='sub'>{rope} reps</span></div>
			<div id="panel4" className="panel" style={panelStyle}>
				<label htmlFor="rope">Climbs</label>
				<input type="number" id="rope"  name="rope" value={rope} className="mt15" onChange={() => setRope(document.getElementById('rope').value)}/>
			</div>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel5");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 5 Dead Hang <span className='sub'>{hang1} sec</span></div>
			<div id="panel5" className="panel" style={panelStyle}>
					<label htmlFor="rope">In Seconds</label>
					<input type="number" id="hang1"  name="hang1" value={hang1} className="mt15" onChange={() => setHang1(document.getElementById('hang1').value)}/>
				</div>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel6");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 6 Dead Hang <span className='sub'>{hang2} sec</span></div>
			<div id="panel6" className="panel" style={panelStyle}>
					<label htmlFor="rope">In Seconds</label>
					<input type="number" id="hang2"  name="hang2" value={hang2} className="mt15" onChange={() => setHang2(document.getElementById('hang2').value)}/>
				</div>
			<div className="accordion" onClick={() => {
				let show = document.getElementById("panel7");
				if(show.style.display === "none"){
						show.style.display = "block";
					}else{
						show.style.display = "none";
					}
				}}>Set 7 Dead Hang <span className='sub'>{hang3} sec</span></div>
			<div id="panel7" className="panel" style={panelStyle}>
					<label htmlFor="rope">In Seconds</label>
					<input type="number" id="hang3"  name="hang3" value={hang3} className="mt15" onChange={() => setHang3(document.getElementById('hang3').value)}/>
				</div>
			<textarea className="comments mt15" id="comments" name="comments" value={comments} onChange={() => setComments(document.getElementById('comments').value)}/>
			<input type="submit" className="mt15 mb15"/>
		</form>
	)
}

export default Pull;
