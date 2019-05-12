import React, { useState } from 'react';
import { addActivity } from '../lib/DBAPI';
import { UserConsumer } from './Context';

const ActivityForm = (props) => {
	const [activityType, changeType] = useState('');

	const [activityDuration, changeActivityDuration] = useState(0);

	const [activityDate, changeActivityDate] = useState(new Date());

	const handleSubmit = (e, user) => {
		e.preventDefault();
		createNewActivity(user, { activityType, activityDuration, activityDate });
	};

	const createNewActivity = async (user, activityData) => {
		const res = await addActivity(user.userId, activityData);
		if (res.success) {
			props.setUser(res.user);
			changeType('');
			changeActivityDuration(0);
			changeActivityDate(new Date());
		}
	};

	return (
		<UserConsumer>
			{({ user }) => (
				<form onSubmit={e => handleSubmit(e, user)} className='activity-form'>
					<label>
						Activity Type
						<select
							value={activityType}
							onChange={e => changeType(e.target.value)}
						>
							<option value='' />
							<option value='Yoga'>Yoga</option>
							<option value='Dancing'>Dancing</option>
							<option value='Walking'>Walking</option>
							<option value='Cardio'>Cardio</option>
							<option value='Swimming'>Swimming</option>
						</select>
					</label>
					<label>
						Duration
						<input
							type='number'
							value={activityDuration}
							onChange={e => changeActivityDuration(e.target.value)}
						/>
					</label>
					<label>
						<input
							type='date'
							value={activityDate}
							onChange={e => changeActivityDate(e.target.value)}
						/>
					</label>
					<button type='submit'>Add activity</button>
				</form>
			)}
		</UserConsumer>
	);
};

export default ActivityForm;
