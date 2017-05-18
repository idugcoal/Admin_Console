import React, { Component } from 'react'
import { auth } from '../utils/firebaseService';

class LoginForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { email, password } = this.state;
		auth.signInWithEmailAndPassword(email, password)
			.then(console.log('hello'));
	}

	render() {
		return (	
			<div className="login-page">
	      <div className="form">
	      	<form>
	          <input 
	          	type="text" 
	          	value={this.state.text} 
	          	onChange={(e) => this.setState({ email: e.target.value })} 
	          	placeholder="username"
	          />
	          <input 
	          	type="password" 
	          	value={this.state.password} 
	          	onChange={(e) => this.setState({ password: e.target.value })} 
	          	placeholder="password"
	          />
	          <button onClick={() => this.handleClick()}>login</button>
	          <p className="message">Forgot password? <a href="#">Click here</a></p>
	        </form>
	      </div>
	    </div>
    )
	}
}

export default LoginForm