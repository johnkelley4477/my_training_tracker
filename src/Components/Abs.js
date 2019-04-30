/* Third Party */
import React from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

class Abs extends React.Component {
	//const {userID} = this.props
	constructor(){
		super();
		this.state = {
			date: this.formatDate(new Date()),
			scissors:0,
			russianTwist:0,
			legRaises:0,
			situps:0,
			jumpingjax:0,
			kneeHigh:0,
			sideToSides:0,
			sidePlanks:0,
			mountClimbers:0,
			bicycle:0,
			totalSec:0,
			secPerRep:30,
			comments:"How'd it go?"
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.stepper = this.stepper.bind(this);
	}
	beep(vol, freq, duration){
		const audio= new AudioContext();
	  const v= audio.createOscillator();
	  const u= audio.createGain()
	  v.connect(u);
	  v.frequency.value=freq;
	  v.type="square";
	  u.connect(audio.destination);
	  u.gain.value=vol*0.01;
	  v.start(audio.currentTime);
	  v.stop(audio.currentTime+duration*0.001);
	}
	handleChange(e){
		e.preventDefault();
		const itemName = e.target.name;
		const itemValue = e.target.value;
		this.setState({[itemName]: itemValue},() => {
			if(this.state.email !== '' && this.state.password !== ''){
				this.setState({isEnabled: true});
			}
		});
	}
	stepper(){
		const exercises = ["scissors",
			"russianTwist",
			"legRaises",
			"situps",
			"jumpingjax",
			"kneeHigh",
			"sideToSides",
			"sidePlanks",
			"mountClimbers",
			"bicycle",
			"totalSec"];
		let exeInc = 0;
		let step = setInterval(() =>{
			let totalSec = this.state.totalSec + 1;
			let state = {"totalSec":totalSec}
			let e = exercises[exeInc];
			state[e]= totalSec;
			if(totalSec <= this.state.secPerRep && exeInc < exercises.length){
				this.setState(state);
			}else if (totalSec > this.state.secPerRep && exeInc < exercises.length){
				this.setState({totalSec:0});
				exeInc++;
				this.beep(999, 220, 300)
			}else{
				clearInterval(step);
			}
		},1000);
	}
	handleSubmit(e){
		e.preventDefault();
		const abs = {
			date: this.state.date,
			scissors: this.state.scissors,
			russianTwist: this.state.russianTwist,
			legRaises: this.state.legRaises,
			situps: this.state.situps,
			jumpingjax: this.state.jumpingjax,
			kneeHigh: this.state.kneeHigh,
			sideToSides: this.state.sideToSides,
			sidePlanks: this.state.sidePlanks,
			mountClimbers: this.state.mountClimbers,
			bicycle: this.state.bicycle,
			comments: this.state.comments
		}
		const ref = firebase
			.database()
			.ref(`Abs/${this.props.user}`);
		ref.push(abs);
		navigate('/');
	}
	formatDate(date){
		var d = date,
		    month = '' + (d.getMonth() + 1),
		    day = '' + d.getDate(),
		    year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}
	render(){
		return(
			<form onSubmit= {e => {this.handleSubmit(e)}} className="form">
				<h2>Abs Workout</h2>

				<input type="date" id="date" name="date" value={this.state.date} className="mt15 center" onChange={this.handleChange}/>
				<label htmlFor="scissors">Scissors</label>
				<input type="number" id="scissors"  name="scissors" value={this.state.scissors} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="russianTwist">Russian Twist</label>
				<input type="number" id="russianTwist" name="russianTwist" value={this.state.russianTwist} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="legRaises">Leg Raises</label>
				<input type="number" id="legRaises" name="legRaises" value={this.state.legRaises} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="situps">Sit-ups</label>
				<input type="number" id="situps"  name="situps" value={this.state.situps} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="jumpingjax">Jumping Jax</label>
				<input type="number" id="jumpingjax" name="jumpingjax" value={this.state.jumpingjax} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="kneeHigh">Knee Highs</label>
				<input type="number" id="kneeHigh" name="kneeHigh" value={this.state.kneeHigh} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="sideToSides">Side To Sides</label>
				<input type="number" id="sideToSides"  name="sideToSides" value={this.state.sideToSides} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="sidePlanks">Side Planks</label>
				<input type="number" id="sidePlanks" name="sidePlanks" value={this.state.sidePlanks} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="mountClimbers">Mount Climbers</label>
				<input type="number" id="mountClimbers" name="mountClimbers" value={this.state.mountClimbers} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="bicycle">Bicycle</label>
				<input type="number" id="bicycle" name="bicycle" value={this.state.bicycle} className="mt15" onChange={this.handleChange}/>
				<label htmlFor="secPerRep">Per rep time</label>
				<div className="grid-parent flex mb15 mt15">
					<input type="text" id="secPerRep" name="secPerRep" className="grid33" value={this.state.secPerRep} onChange={this.handleChange}/>
					<input type="button" className="grid33" onClick={this.stepper}  value="Start"/>
				</div>
				<textarea className="comments mt15" id="comments" name="comments" value={this.state.comments} onChange={this.handleChange}/>
				<input type="submit" className="grid-parent mt15 mb15"/>
			</form>
		)
	}
}

export default Abs;
