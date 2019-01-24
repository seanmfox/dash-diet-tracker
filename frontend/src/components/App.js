import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import '../styles/App.css';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import SignUp from './SignUp';
import { authenticateUser } from '../lib/DBAPI';

class App extends Component {
	state = {
		user: ''
  };
  
	componentDidMount() {
		if (localStorage.getItem('JWT')) {
			this.authUser();
		}
	}

	async authUser() {
		const user = await authenticateUser();
		if (user.success) {
			this.setUser(user);
		}
	}

	setUser = user => {
		this.setState({ user });
  };
  
  signOut = () => {
		localStorage.removeItem('JWT');
		this.setState({ user: '' });
	};

	render() {
    const { user } = this.state;
    
		return (
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
									<button onClick={this.signOut}>Sign Out</button>
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
							render={() => <Homepage setUser={user => this.setUser(user)} />}
						/>
						{user ? (
							<Route
								path='/dashboard'
								render={() => (
									<Dashboard
										user={user}
										onSetUser={user => this.setUser(user)}
										updateUserGroup={group => this.updateUserGroup(group)}
									/>
								)}
							/>
						) : (
							<Redirect to='/' />
						)}
					</Switch>

			</div>
		);
	}
}

export default withRouter(App);
