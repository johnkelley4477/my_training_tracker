/* Third parties */
import React from 'react';
import {Link} from '@reach/router';

class Menu extends React.Component {

	render(){
		const {logoutUser, closeMenu} = this.props;
		const logoutControl = (e) => {
			logoutUser(e);
			closeMenu();
		}
		return(
			<div id= 'menu'>
				<Link to='/' onClick={closeMenu}>Home</Link>
				<a href='/stats' onClick={closeMenu}>Stats</a>
				<Link to='/settings' onClick={closeMenu} >Settings</Link>
				<Link to='/login' onClick= {e => logoutControl(e)}>Logout</Link>
			</div>
		)
	}
}

export default Menu;
