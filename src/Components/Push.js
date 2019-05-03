/* Third Party */
import React from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

class Push extends React.Component {
	//const {userID} = this.props
	constructor(){
		super();
		this.state = {
			date: this.formatDate(new Date()),
			diamond: 0,
			standsWide: 0,
			standsShoulder: 0,
			decline: 0,
			level: 0,
			showPanel1: false,
			showPanel2: false,
			showPanel3: false,
			showPanel4: false,
			showPanel5: false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e){
		e.preventDefault();
		const itemName = e.target.name;
		const itemValue = e.target.value;
		this.setState({[itemName]: itemValue});
	}
	panelSwitch(panel,stateString){
		this.setState({
			showPanel1: false,
			showPanel2: false,
			showPanel3: false,
			showPanel4: false,
			showPanel5: false,
		});
		let state = {};
		if(panel){
			state[stateString]= false;
		}else{
			state[stateString]= true;
		}
		this.setState(state);
	}
	handleSubmit(e){
		e.preventDefault();
		const dateT = new Date(this.state.date).getTime();
		const push = {
			timestamp: dateT,
			date: this.state.date,
			diamond: this.state.diamond,
			standsWide: this.state.standsWide,
			standsShoulder: this.state.standsShoulder,
			decline: this.state.decline,
			level: this.state.level
		}
		const ref = firebase
			.database()
			.ref(`Push/${this.props.user}`);
		ref.push(push);
		navigate('/stats/push');
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
				<h2>Push Workout</h2>
				<input type="date" id="date"  name="date" value={this.state.date} className="mt15 center" onChange={this.handleChange}/>
				<div className="accordion mt15" onClick={() => this.panelSwitch(this.state.showPanel1, "showPanel1")}>Set 1 Diamond <span className='sub'>{this.state.diamond} reps</span></div>
				{this.state.showPanel1 && (
					<div className="panel">
						<label htmlFor="diamond">count</label>
						<input type="number" id="diamond"  name="diamond" value={this.state.diamond} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel2, "showPanel2")}>Set 2 Stands Wide <span className='sub'>{this.state.standsWide} reps</span></div>
				{this.state.showPanel2 && (
					<div className="panel">
						<label htmlFor="standsWide">count</label>
						<input type="number" id="standsWide"  name="standsWide" value={this.state.standsWide} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel3, "showPanel3")}>Set 3 Stands Shoulder <span className='sub'>{this.state.standsShoulder} reps</span></div>
				{this.state.showPanel3 && (
					<div className="panel">
						<label htmlFor="standsShoulder">count</label>
						<input type="number" id="standsShoulder"  name="standsShoulder" value={this.state.standsShoulder} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel4, "showPanel4")}>Set 4 Decline <span className='sub'>{this.state.decline} reps</span></div>
				{this.state.showPanel4 && (
					<div className="panel">
						<label htmlFor="decline">count</label>
						<input type="number" id="decline"  name="decline" value={this.state.decline} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel5, "showPanel5")}>Set 5 Level <span className='sub'>{this.state.level} reps</span></div>
				{this.state.showPanel5 && (
					<div className="panel">
						<label htmlFor="level">count</label>
						<input type="number" id="level"  name="level" value={this.state.level} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<input type="submit" className="mt15 mb15"/>
			</form>
		)
	}
}

export default Push;
