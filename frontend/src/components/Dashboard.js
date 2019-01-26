import React, { Component } from 'react';
import FoodForm from './FoodForm';
import { UserConsumer } from './Context';

class Dashboard extends Component {
	render() {
		return (
			<UserConsumer>
				{({  user, weekStart  }) => (
					<div>
						<FoodForm user={user}/>
					</div>
				)}
			</UserConsumer>
		);
	}
}

export default Dashboard;
