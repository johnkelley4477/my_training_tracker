/* Third Party */
import React from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

class Legs extends React.Component {
	//const {userID} = this.props
	constructor(){
		super();
		this.state = {
			date: this.formatDate(new Date()),
			lungeSet1:0,
			squatSet1:0,
			bucketCarrySet1:0,
			lungeSet2:0,
			squatSet2:0,
			bucketCarrySet2:0,
			lungeSet3:0,
			squatSet3:0,
			bucketCarrySet3:0,
			set1:false,
			set2:false,
			set3:false,
			comments:"How'd it go?"
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		const dateT = new Date(this.state.date).getTime();
		const legs = {
			timestamp: dateT,
			date: this.state.date,
			lungeSet1: this.state.lungeSet1,
			squatSet1: this.state.squatSet1,
			bucketCarrySet1: this.state.bucketCarrySet1,
			lungeSet2: this.state.lungeSet2,
			squatSet2: this.state.squatSet2,
			bucketCarrySet2: this.state.bucketCarrySet2,
			lungeSet3: this.state.lungeSet3,
			squatSet3: this.state.squatSet3,
			bucketCarrySet3: this.state.bucketCarrySet3,
			comments: this.state.comments
		}
		const ref = firebase
			.database()
			.ref(`Legs/${this.props.user}`);
		ref.push(legs);
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
				<h2>Leg Workout</h2>
				<input type="date" id="date" name="date" value={this.state.date} className="mt15 mb15 center" onChange={this.handleChange}/>
				<div className="accordion" onClick={() => this.panelSwitch(this.state.set1, "set1")}>Set 1</div>
				{this.state.set1 && (
					<div className="panel">
						<label htmlFor="lungeSet1">Lunge</label>
						<input type="number" id="lungeSet1"  name="lungeSet1" value={this.state.lungeSet1} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="squatSet1">Squats</label>
						<input type="number" id="squatSet1" name="squatSet1" value={this.state.squatSet1} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="bucketCarrySet1">Bucket Carry</label>
						<input type="number" id="bucketCarrySet1" name="bucketCarrySet1" value={this.state.bucketCarrySet1} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.set2, "set2")}>Set 2</div>
				{this.state.set2 && (
					<div className="panel">
						<label htmlFor="lungeSet2">Lunge</label>
						<input type="number" id="lungeSet2"  name="lungeSet2" value={this.state.lungeSet2} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="squatSet2">Squats</label>
						<input type="number" id="squatSet2" name="squatSet2" value={this.state.squatSet2} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="bucketCarrySet2">Bucket Carry</label>
						<input type="number" id="bucketCarrySet2" name="bucketCarrySet2" value={this.state.bucketCarrySet2} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.set3, "set3")}>Set 3</div>
				{this.state.set3 && (
					<div className="panel">
						<label htmlFor="lungeSet3">Lunge</label>
						<input type="number" id="lungeSet3"  name="lungeSet3" value={this.state.lungeSet3} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="squatSet3">Squats</label>
						<input type="number" id="squatSet3" name="squatSet3" value={this.state.squatSet3} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="bucketCarrySet3">Bucket Carry</label>
						<input type="number" id="bucketCarrySet3" name="bucketCarrySet3" value={this.state.bucketCarrySet3} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<textarea className="comments mt15" id="comments" name="comments" value={this.state.comments} onChange={this.handleChange}/>
				<input type="submit" className="mt15 mb15"/>
			</form>
		)
	}
}

export default Legs;
