import React, { Component } from 'react'

class LoginForm extends Component {

	render() {
		return (	
			<div className="login-page">
	      <div className="form">
	        <form className="login-form">
	          <input type="text" placeholder="username"/>
	          <input type="password" placeholder="password"/>
	          <button>login</button>
	          <p className="message">Forgot password? <a href="#">Click here</a></p>
	        </form>
	      </div>
	    </div>
    )
	}
}

export default LoginForm