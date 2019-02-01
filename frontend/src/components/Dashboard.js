import React, { Component } from 'react';
import FoodForm from './FoodForm';
import { UserConsumer } from './Context';
import Activities from './Activities';

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
						<button value='back' onClick={changeDay}>
							Past Date
						</button>
						<button value='forward' onClick={changeDay}>
							Future Date
						</button>
						<h2>
							{new Date(dayView).toLocaleDateString('en-US', {
								timeZone: 'UTC',
								weekday: 'long',
								month: 'long',
								day: 'numeric'
							})}
						</h2>
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
						{unsavedChanges && (
							<p className={unsavedChanges ? null : 'no-new-data'}>
								You have unsaved changes to your daily counts
							</p>
						)}
						{/* <Activities /> */}
					</div>
				)}
			</UserConsumer>
		);
	}
}

export default Dashboard;
