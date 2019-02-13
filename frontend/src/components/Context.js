import React, { Component } from 'react';
import { authenticateUser } from '../lib/DBAPI';

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

class UserProvider extends Component {
	state = {
		user: '',
		dayView: '',
		weekView: '',
		unsavedChanges: false,
		signOut: () => this.signOut(),
		setUser: user => this.setUser(user),
		changeDay: e => this.changeDay(e),
		changeWeek: e => this.changeWeek(e),
		changeMade: () => this.changeMade(),
		changeSaved: () => this.changeSaved()
	};

	componentDidMount = () => {
		if (localStorage.getItem('JWT')) {
			this.authUser();
		}
		this.setCurrentDay();
		this.setCurrentWeek();
	};

	changeMade = () => {
		this.setState({ unsavedChanges: true });
	};

	changeSaved = () => {
		this.setState({ unsavedChanges: false });
	};

	changeDay = e => {
		const change = e.target.value;
		const changeType = change === 'forward' ? 86400000 : -86400000;
		this.setState(prevState => ({
			dayView: prevState.dayView + Number(changeType),
			unsavedChanges: false
		}));
	};

	changeWeek = e => {
		const change = e.target.value;
		const changeType = change === 'forward' ? 604800000 : -604800000;
		this.setState(prevState => ({
			weekView: prevState.weekView + Number(changeType)
		}));
	};

	setCurrentDay = () => {
		const currentDate = new Date(Date.now());
		const startOfDay = currentDate.setUTCHours(0, 0, 0, 0);
		this.setState({ dayView: startOfDay.valueOf() });
	};

	setCurrentWeek = () => {
		const currentDate = new Date(Date.now());
		const weekBeginningDate =
			currentDate.getUTCDate() - currentDate.getUTCDay();
		const startOfDay = new Date(currentDate.setUTCDate(weekBeginningDate));
		startOfDay.setUTCHours(0, 0, 0, 0);
		this.setState({ weekView: startOfDay.valueOf() });
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
