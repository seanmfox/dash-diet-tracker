import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import '../styles/App.css';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import SignUp from './SignUp';
import UserProvider, { UserConsumer } from './Context';

class App extends Component {

	render() {
		return (
			<UserProvider>
				<UserConsumer>
					{({ user, signOut }) => (
						<div className='app'>
							<header>
								<div className='header-contents'>
									<div className='site-logo' />
									<nav className='header-links'>
										{!user && (
											<>
												<NavLink to='/'>Home</NavLink>
												<NavLink to='/signup'>SignUp</NavLink>
											</>
										)}
										{user && (
											<>
												{false && <NavLink to='/dashboard'>Dashboard</NavLink>}
												<button onClick={signOut}>Sign Out</button>
											</>
										)}
									</nav>
								</div>
							</header>
							{user && this.props.location.pathname !== '/dashboard' && (
								<Redirect to='/dashboard' />
							)}
							<Switch>
								<Route path='/signup' render={() => <SignUp />} />
								<Route
									exact
									path='/'
									render={() => (
										<Homepage />
									)}
								/>
								{user ? (
									<Route
										path='/dashboard'
										render={() => (
											<Dashboard
											/>
										)}
									/>
								) : (
									<Redirect to='/' />
								)}
							</Switch>
						</div>
					)}
				</UserConsumer>
			</UserProvider>
		);
	}
}

export default withRouter(App);
