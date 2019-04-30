/* Third party */
import React from 'react';
import {navigate} from '@reach/router';
/* Client */
import '../client/css/header.css';
/* Components */
import Menu from './Menu';
import firebase from './Firebase';


class Header extends React.Component {
	constructor(){
		super();
		this.state = {
			showMenu: false,
			user: null,
			displayName: null,
			userID: null,
		}
		this.menuAction = this.menuAction.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}
	componentDidMount() {
	    firebase.auth().onAuthStateChanged(FBUser => {
			if(FBUser){
				this.setState({
					user: FBUser,
					displayName: FBUser.displayName,
					userID: FBUser.uid
				});
			}else{
				this.setState({
					user: null,
					displayName: null,
					userID: null,
				});
			}
		});
	
	}
	logoutUser = e =>{
		e.preventDefault();
		this.setState({
			user: null,
			displayName: null,
			userID: null
		});
		firebase.auth().signOut()
		.then(() => {
			navigate('/login');
		})
	}
	menuAction(){
		if(this.state.showMenu){
			this.setState({showMenu: false});
		}else{
			this.setState({showMenu: true});
		}
	}
	closeMenu(){
		this.setState({showMenu: false});
	}
	render(){
		return(
			<div>
				<div className= 'Header'>
					<button id= "menu_click" onClick= {this.menuAction} >menu</button>
					<span>EX_tracker</span>
					<div>Welcome {this.state.displayName}{' '}</div>
				</div>
				{this.state.showMenu && (
					<Menu logoutUser= {this.logoutUser} closeMenu= {this.closeMenu}/>
				)}
			</div>
		);
	}
}

export default Header;