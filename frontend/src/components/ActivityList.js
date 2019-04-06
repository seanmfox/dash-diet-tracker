import React from 'react';
import Activity from './Activity';
import { UserConsumer } from './Context';

const ActivityList = props => {
	return (
		<UserConsumer>
			{({ user, setUser }) => (
				<>
					{props.activitySet.length === 0 ? (
						<p>No activities tracked for this week</p>
					) : (
						<table>
							<tbody>
								{props.activitySet.map(ex => (
									<tr key={ex._id}>
										<Activity
											userId={user.userId}
											exercise={ex}
											setUser={setUser}
										/>
									</tr>
								))}
							</tbody>
							<tfoot>
								<tr>
									<td>Total</td>
									<td>
										{props.activitySet.reduce(
											(acc, curr) => acc + curr.activityDuration,
											0
										)}
									</td>
								</tr>
							</tfoot>
						</table>
					)}
				</>
			)}
		</UserConsumer>
	);
};

export default ActivityList;
