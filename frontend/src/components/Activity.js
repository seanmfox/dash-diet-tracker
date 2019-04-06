import React from 'react';
import { removeActivity } from '../lib/DBAPI';

const Activity = props => {
	const handleClick = () => {
		onActivityDeletion(props.userId, props.exercise._id);
	};

	const onActivityDeletion = async (userId, activityId) => {
    const res = await removeActivity(userId, activityId);
		if (res.success) return props.setUser(res.user);
	};

	return (
		<>
			<td>{props.exercise.activityType}</td>
			<td> {props.exercise.activityDuration}</td>
			<td>
				{new Date(props.exercise.activityDate).toLocaleDateString('en-US', {
					timeZone: 'UTC',
					month: 'long',
					day: 'numeric'
				})}
			</td>
			<td>
				<button onClick={handleClick}>Delete</button>
			</td>
		</>
	);
};

export default Activity;
