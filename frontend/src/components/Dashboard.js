import React, { Component } from 'react';
import FoodForm from './FoodForm';
import { UserConsumer } from './Context';

class Dashboard extends Component {
	dailyFoodData = (user, time) => {
		const foodData = user.food.filter(log => log.day === time);
		if (foodData.length === 0) {
			return [
				{
					trackDate: Date.now(),
					grain: 5,
					wholeGrain: 0,
					fruit: 0,
					veggies: 0,
					dairy: 0,
					meats: 0,
					seedsLegumes: 0,
					fatsSweets: 0
				}
			];
		} else {
			return foodData;
		}
	};

	render() {
		return (
			<UserConsumer>
				{({ user, weekStart }) => (
					<div>
						<p>{new Date(weekStart).toUTCString()}</p>
						{this.dailyFoodData(user, weekStart).map(set => (
							<FoodForm user={user} key={set.trackDate} set={set} />
						))}
					</div>
				)}
			</UserConsumer>
		);
	}
}

export default Dashboard;
