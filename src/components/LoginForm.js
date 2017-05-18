import React, { Component } from 'react'

class LoginForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			user: null
		}
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
	          <button onClick={() => this.props.handleClick(this.state.email, this.state.password)}>login</button>
	          <p className="message">Forgot password? <a href="#">Click here</a></p>
	        </form>
	      </div>
	      {this.state.user && JSON.stringify(this.state.user)}
	    </div>
    )
	}
}

export default LoginForm