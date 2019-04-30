/* Third Party */
import React from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

class Pull extends React.Component {
	//const {userID} = this.props
	constructor(){
		super();
		this.state = {
			pullUpSets: 3,
			date: this.formatDate(new Date()),
			rope: 0,
			together1: 0,
			shoulder1: 0,
			wide1: 0,
			together2: 0,
			shoulder2: 0,
			wide2: 0,
			together3: 0,
			shoulder3: 0,
			wide3: 0,
			hang1:0,
			hang2:0,
			hang3:0,
			showPanel1: false,
			showPanel2: false,
			showPanel3: false,
			showPanel4: false,
			showPanel5: false,
			showPanel6: false,
			showPanel7: false,
			comments: "How'd it go?",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.startClock = this.startClock.bind(this);
		this.stopClock = this.stopClock.bind(this);
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
			showPanel1: false,
			showPanel2: false,
			showPanel3: false,
			showPanel4: false,
			showPanel5: false,
			showPanel6: false,
			showPanel7: false,
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
		const dateT = new Date(this.state.date).getTime()
		const pull = {
			timestamp: dateT,
			date: this.state.date,
			rope: this.state.rope,
			together1: this.state.together1,
			shoulder1: this.state.shoulder1,
			wide1: this.state.wide1,
			together2: this.state.together2,
			shoulder2: this.state.shoulder2,
			wide2: this.state.wide2,
			together3: this.state.together3,
			shoulder3: this.state.shoulder3,
			wide3: this.state.wide3,
			hang1: this.state.hang1,
			hang2: this.state.hang2,
			hang3: this.state.hang3,
			comments: this.state.comments
		}
		const ref = firebase
			.database()
			.ref(`Pull/${this.props.user}`);
		ref.push(pull);
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
	step = null;
	startClock(location){
		let time = 0;
		this.step = setInterval(() =>{
			const tempState = {}
			tempState[location] = ++time;
			console.log(tempState);
			this.setState(tempState);
		},1000);
	}
	stopClock(){clearInterval(this.step);}
	sum(one,two,three){
		const One = Number.isNaN(parseInt(one)) ? 0 : parseInt(one);
		const Two = Number.isNaN(parseInt(two)) ? 0 : parseInt(two);
		const Three = Number.isNaN(parseInt(three)) ? 0 : parseInt(three);
		return One + Two + Three;
	}
	render(){

		return(
			<form onSubmit= {e => {this.handleSubmit(e)}} className="form">
				<h2>Pull Workout</h2>
				<input type="date" id="date" name="date" value={this.state.date} className="mt15 center" onChange={this.handleChange}/>
				<div className="accordion mt15" onClick={() => this.panelSwitch(this.state.showPanel1, "showPanel1")}>Set 1 Pull-ups <span className='sub'>{this.sum(this.state.wide1,this.state.shoulder1,this.state.together1)} reps</span></div>
				{this.state.showPanel1 && (
					<div className="panel">
						<label htmlFor="together1">Together</label>
						<input type="number" id="together1"  name="together1" value={this.state.together1} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="shoulder1">Sholder</label>
						<input type="number" id="shoulder1" name="shoulder1" value={this.state.shoulder1} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="wide1">Wide</label>
						<input type="number" id="wide1" name="wide1" value={this.state.wide1} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel2, "showPanel2")}>Set 2 Pull-ups <span className='sub'>{this.sum(this.state.wide2,this.state.shoulder2,this.state.together2)} reps</span></div>
				{this.state.showPanel2 && (
					<div className="panel">
						<label htmlFor="shoulder2">Sholder</label>
						<input type="number" id="shoulder2" name="shoulder2" value={this.state.shoulder2} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="wide2">Wide</label>
						<input type="number" id="wide2" name="wide2" value={this.state.wide2} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="together2">Together</label>
						<input type="number" id="together2"  name="together2" value={this.state.together2} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel3, "showPanel3")}>Set 3 Pull-ups <span className='sub'>{this.sum(this.state.wide3,this.state.shoulder3,this.state.together3)} reps</span></div>
				{this.state.showPanel3 && (
					<div className="panel">
						<label htmlFor="wide3">Wide</label>
						<input type="number" id="wide3" name="wide3" value={this.state.wide3} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="together3">Together</label>
						<input type="number" id="together3"  name="together3" value={this.state.together3} className="mt15" onChange={this.handleChange}/>
						<label htmlFor="shoulder3">Sholder</label>
						<input type="number" id="shoulder3" name="shoulder3" value={this.state.shoulder3} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel4, "showPanel4")}>Set 4 Rope Climbs <span className='sub'>{this.state.rope} reps</span></div>
				{this.state.showPanel4 && (
					<div className="panel">
						<label htmlFor="rope">Climbs</label>
						<input type="number" id="rope"  name="rope" value={this.state.rope} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel5, "showPanel5")}>Set 5 Dead Hang <span className='sub'>{this.state.hang1} sec</span></div>
				{this.state.showPanel5 && (
					<div className="panel">
						<label htmlFor="rope">In Seconds</label>
						<input type="number" id="rope"  name="hang1" value={this.state.hang1} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel6, "showPanel6")}>Set 6 Dead Hang <span className='sub'>{this.state.hang2} sec</span></div>
				{this.state.showPanel6 && (
					<div className="panel">
						<label htmlFor="rope">In Seconds</label>
						<input type="number" id="rope"  name="hang2" value={this.state.hang2} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<div className="accordion" onClick={() => this.panelSwitch(this.state.showPanel7, "showPanel7")}>Set 7 Dead Hang <span className='sub'>{this.state.hang3} sec</span></div>
				{this.state.showPanel7 && (
					<div className="panel">
						<label htmlFor="rope">In Seconds</label>
						<input type="number" id="rope"  name="hang3" value={this.state.hang3} className="mt15" onChange={this.handleChange}/>
					</div>
				)}
				<textarea className="comments mt15" id="comments" name="comments" value={this.state.comments} onChange={this.handleChange}/>
				<input type="submit" className="mt15 mb15"/>
			</form>
		)
	}
}

export default Pull;
