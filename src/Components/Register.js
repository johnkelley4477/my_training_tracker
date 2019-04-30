/* Third party */
import React from 'react';
/* Components 	*/
import firebase from './Firebase';

class Register extends React.Component {
	constructor(){
		super();
		this.state = {
			displayName: '',
			email: '',
			password: '',
			verify: '',
			isEnabled: false,
			error: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e){
		const itemName = e.target.name;
		const itemValue = e.target.value;
		this.setState({[itemName]: itemValue},() => {
			if(this.state.password !== this.state.verify){
				this.setState({error: 'Your passwords do not match', isEnabled: false});
			}else if(this.state.displayName === '' || this.state.email === ''){
				this.setState({error: 'All fields must be filled in.', isEnabled: false});
			}else{
				this.setState({error: null, isEnabled: true});
			}
		});
	}

	handleSubmit(e){
		const registerInfo = {
			"email": this.state.email,
			"password": this.state.password,
			"displayName": this.state.displayName
		}
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(
				registerInfo.email,
				registerInfo.password
			).then(()=>{
				this.props.registerUser(registerInfo.displayName);
			})
			.catch(error => {
				if(error.message !== null){
					this.setState({error: error.message});
				} else{
					this.setState({error: null});
				}
			});
	}

	render(){
		return (
			<form className="frame mt10" onSubmit={this.handleSubmit}>
				<h2>Register</h2>
				{this.state.error !== null && (
					<div className="error">{this.state.error}</div>
				)}
				<input type="text" name="displayName" placeholder="Your Name" value={this.state.displayName} onChange={this.handleChange}/>
	        	<input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} className="mt10"/>
	        	<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} className="mt10"/>
	        	<input type="password" name="verify" placeholder="Password again" value={this.state.varify} onChange={this.handleChange} className="mt10"/>
	        	<input type="submit" className="mt10" disabled= {this.state.isEnabled ? '' : 'disabled'} />
	        </form>
        )
	}
}

export default Register;