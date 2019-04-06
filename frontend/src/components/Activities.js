import React, { Component } from 'react';
import { UserConsumer } from './Context';
import WeekChangeButtons from './WeekChangeButtons';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

class Activities extends Component {
	weekActivities = (activities, startDate) => {
		const startDateString = new Date(startDate).toISOString();
		const endDateString = new Date(startDate + 604800000).toISOString();
		const weeklyExercise = activities
			.filter(
				ex =>
					ex.activityDate >= startDateString && ex.activityDate < endDateString
			)
			.sort(
				(a, b) =>
					new Date(a.activityDate).valueOf() -
					new Date(b.activityDate).valueOf()
			);
		return weeklyExercise;
	};

	render() {
		return (
			<UserConsumer>
				{({ weekView, setUser, user }) => (
					<div>
						<h2>Exercise</h2>
						<ActivityForm setUser={setUser} />
						<h3>
							{new Date(weekView).toLocaleDateString('en-US', {
								timeZone: 'UTC',
								month: 'long',
								day: 'numeric'
							})}{' '}
							-{' '}
							{new Date(weekView + 604800000 - 1).toLocaleDateString('en-US', {
								timeZone: 'UTC',
								month: 'long',
								day: 'numeric'
							})}
						</h3>
						<WeekChangeButtons />
						<ActivityList
							activitySet={this.weekActivities(user.exercise, weekView)}
						/>
					</div>
				)}
			</UserConsumer>
		);
	}
}

export default Activities;
