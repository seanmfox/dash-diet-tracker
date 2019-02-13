import React, { Component } from 'react';
import { UserConsumer } from './Context';
import WeekChangeButtons from './WeekChangeButtons';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

class Activities extends Component {
	render() {
		return (
			<UserConsumer>
				{({ weekView }) => (
					<div>
						<div>
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
						</div>
						<WeekChangeButtons />
						<div>Activity Form</div>
						<div>Activity List</div>
						<ActivityForm />
						<ActivityList />
					</div>
				)}
			</UserConsumer>
		);
	}
}

export default Activities;
