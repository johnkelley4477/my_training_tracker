/* Third Party */
import React from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

class Spartan extends React.Component {
	//const {userID} = this.props
	constructor(){
		super();
		this.state = {
			date: this.formatDate(new Date()),
			distance:0,
			reps:0,
			intervals:0,
			comments: "How'd it go?",
			submit:false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getIntervals = this.getIntervals.bind(this);
	}
	handleChange(e){
		const itemName = e.target.name;
		const itemValue = e.target.value;
		this.setState({[itemName]: itemValue},() => {
			if(this.state.email !== '' && this.state.password !== ''){
				this.setState({isEnabled: true});
			}
		});
	}
	panelSwitch(panel,stateString){
		this.setState({
			set1:false,
			set2:false,
			set3:false
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
		this.newStates["date"] = this.state.date;
		this.newStates["comments"] = this.state.comments;
		const ref = firebase
			.database()
			.ref(`Spartan/${this.props.user}`);
		ref.push(this.newStates);
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
	newStates = {}
	getIntervals(e){
		e.preventDefault();
		this.setState({intervals:0});
		if(this.state.distance > 0 && this.state.reps > 0){
			const diff = this.state.distance/this.state.reps;
			this.setState({intervals:diff});

			for(let i = 0;i<diff;i++){
				let marker = (i + 1) * this.state.reps;
				this.newStates[`marker${i}`] = marker;
				this.newStates[`exercise${i}`] = "burpees";
				this.newStates[`reps${i}`] = "15";
				this.newStates[`set${i}`] = false;
			}
			if(this.newStates.exercise0){
				this.newStates["submit"]=true;
				this.setState(this.newStates);
			}
		}
	}
	render(){
		const interval = [];
		for(let i = 0;i<this.state.intervals;i++){
			let marker = (i + 1) * this.state.reps;
			if(marker > this.state.distance){break;}
			interval.push(
				<div>
					<div className="accordion" onClick={() => this.panelSwitch(this.state[`set${i}`], `set${i}`)}>Mile {marker.toFixed(2)}<span className='sub'>{this.state[`reps${i}`]} {this.state[`exercise${i}`]}</span></div>
					{this.state[`set${i}`] && (
						<div className="panel">
							<label htmlFor={"exercise" + i}>Activity</label>
							<input type="text" id={"exercise" + i} name={"exercise" + i} value={this.state[`exercise${i}`]} className="mt15 center" onChange={this.handleChange}/>
							<label htmlFor={"reps" + i}>Reps</label>
							<input type="text" id={"reps" + i} name={"reps" + i} value={this.state[`reps${i}`]} className="mt15 center" onChange={this.handleChange}/>
						</div>
					)}
				</div>
			);
		}
		return(
			<form onSubmit= {e => {this.handleSubmit(e)}} className="form">
				<h2>Spartan Workout</h2>
				<input type="date" id="date" name="date" value={this.state.date} className="mt15 center" onChange={this.handleChange}/>
				<label htmlFor="distance">Distance (in miles)</label>
				<input type="number" id="distance" name="distance" value={this.state.distance} className="mt15 center" onChange={this.handleChange} />
				<label htmlFor="reps">Stop every (in miles)</label>
				<input type="number" id="reps" name="reps" value={this.state.reps} className="mt15 center" onChange={this.handleChange}/>
				<input type="button" className="mt15 mb15" onClick={this.getIntervals} value="Run"/>
				<div className="grid-parent">{interval}</div>
				{this.state.submit && (
					<div>
						<textarea className="comments mt15" id="comments" name="comments" value={this.state.comments} onChange={this.handleChange}/>
						<input type="submit" className="mt15 mb15"/>
					</div>
				)}
			</form>
		)
	}
}

export default Spartan;
