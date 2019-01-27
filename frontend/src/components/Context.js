import React, { Component } from 'react';
import { authenticateUser } from '../lib/DBAPI';

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

class UserProvider extends Component {
	state = {
		user: '',
		dayView: '',
		signOut: () => this.signOut(),
		setUser: user => this.setUser(user),
		changeDay: e => this.changeDay(e)
	};

	componentDidMount = () => {
		if (localStorage.getItem('JWT')) {
			this.authUser();
		}
		this.setCurrentDay();
	};

	changeDay = e => {
		const change = e.target.value;
		const changeType = change === 'forward' ? 86400000 : -86400000;
		this.setState(prevState => ({
			dayView: prevState.dayView + Number(changeType)
		}));
	}

	setCurrentDay = () => {
		const currentDate = new Date(Date.now());
		const startOfDay = currentDate.setUTCHours(0, 0, 0, 0);
		this.setState({ dayView: startOfDay.valueOf() });
	};

	setUser = user => {
		this.setState({ user: user });
	};

	async authUser() {
		const res = await authenticateUser();
		if (res.success) {
			this.setUser(res.user);
		}
	}

	signOut = () => {
		localStorage.removeItem('JWT');
		this.setState({ user: '' });
	};

	render() {
		return (
			<UserContext.Provider value={this.state}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

export default UserProvider;
