import React, { Component } from 'react';
import { authenticateUser } from '../lib/DBAPI';

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

class UserProvider extends Component {
	state = {
		user: '',
		weekStart: '',
		signOut: () => this.signOut(),
		setUser: user => this.setUser(user)
	};

	componentDidMount = () => {
		if (localStorage.getItem('JWT')) {
			this.authUser();
		}
		this.setCurrentWeek();
	};

	setCurrentWeek = () => {
		const currentDate = new Date(Date.now());
		const weekBeginningDate =
			currentDate.getUTCDate() - currentDate.getUTCDay();
		const startOfDay = new Date(currentDate.setUTCDate(weekBeginningDate));
		startOfDay.setUTCHours(0, 0, 0, 0);
		this.setState({ weekStart: startOfDay.valueOf() });
	};

	setUser = user => {
		this.setState({ user: user });
	};

	async authUser() {
		const user = await authenticateUser();
		if (user.success) {
			this.setUser(user);
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
