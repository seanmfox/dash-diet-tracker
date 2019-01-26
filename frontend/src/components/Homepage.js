import React, { Component } from 'react';
import SignIn from './SignIn';
import { UserConsumer } from './Context';

class Homepage extends Component {
	render() {
		return (
			<UserConsumer>
				{({ setUser }) => (
					<div className='homepage'>
						<div className='signin-container'>
							<h2 className='login-heading'>Log In</h2>
							<SignIn setUser={user => setUser(user)} />
						</div>
						<div className='gifts-image' />
					</div>
				)}
			</UserConsumer>
		);
	}
}

export default Homepage;
