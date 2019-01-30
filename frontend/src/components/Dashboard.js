import React, { Component } from 'react';
import FoodForm from './FoodForm';
import { UserConsumer } from './Context';

class Dashboard extends Component {
	dailyFoodData = (user, time) => {
		const foodData = user.food.filter(
			log =>
				new Date(log.recordDate).toUTCString() === new Date(time).toUTCString()
		);
		if (foodData.length === 0) {
			return [
				{
					trackDate: time,
					grain: 0,
					wholeGrain: 0,
					fruit: 0,
					veggies: 0,
					dairy: 0,
					meats: 0,
					seedsLegumes: 0,
					fatsSweets: 0,
					newRecord: true
				}
			];
		} else {
			return foodData;
		}
	};

	render() {
		return (
			<UserConsumer>
				{({
					user,
					dayView,
					changeDay,
					setUser,
					unsavedChanges,
					changeMade,
					changeSaved
				}) => (
					<div>
						{unsavedChanges && (
							<p>You have unsaved changes to your daily counts</p>
						)}
						<button value='back' onClick={changeDay}>
							Past Date
						</button>
						<button value='forward' onClick={changeDay}>
							Future Date
						</button>
						<p>{new Date(dayView).toUTCString()}</p>
						{this.dailyFoodData(user, dayView).map(set => (
							<FoodForm
								user={user}
								setUser={setUser}
								key={dayView}
								set={set}
								changeMade={changeMade}
								changeSaved={changeSaved}
							/>
						))}
					</div>
				)}
			</UserConsumer>
		);
	}
}

export default Dashboard;
