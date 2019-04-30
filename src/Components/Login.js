/* Third Party */
import React from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';

class Login extends React.Component{
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
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
			if(this.state.email !== '' && this.state.password !== ''){
				this.setState({isEnabled: true});
			}
		});
	}

	handleSubmit(e){
		const registerInfo = {
			"email": this.state.email,
			"password": this.state.password
		}
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(
				registerInfo.email,
				registerInfo.password
			).then(()=>{
				navigate('/');
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
				<h2>Login</h2>
				{this.state.error !== null && (
					<div className="error">{this.state.error}</div>
				)}
				<input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} className="mt10"/>
	        	<input type="password" name="password" placeholder="Password" value={this.state.varify} onChange={this.handleChange} className="mt10"/>
	        	<input type="submit" className="mt10" disabled= {this.state.isEnabled ? '' : 'disabled'} />
	        </form>
        )
	}
}

export default Login;