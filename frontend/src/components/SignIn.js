import React, { Component } from 'react';
import { signinUser } from '../lib/DBAPI';

class SignIn extends Component {
	state = {
		email: '',
		password: ''
	};

	onTextChange = e => {
		const newState = { ...this.state };
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	};

	onFormSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		this.userSignIn(email, password);
	};

	async userSignIn(email, password) {
		const res = await signinUser(email, password);
		if (res.success) {
			localStorage.JWT = res.token;
			this.props.setUser(res.user);
		}
	}

	render() {
		const { email, password } = this.state;
		return (
			<form onSubmit={this.onFormSubmit}>
				<label>
					Email
					<input
						type='text'
						value={email}
						onChange={this.onTextChange}
						placeholder='email'
						name='email'
					/>
				</label>
				<label>
					Password
					<input
						type='password'
						value={password}
						onChange={this.onTextChange}
						placeholder='password'
						name='password'
					/>
				</label>
				<button type='submit'>
					Sign In
				</button>
			</form>
		);
	}
}

export default SignIn;