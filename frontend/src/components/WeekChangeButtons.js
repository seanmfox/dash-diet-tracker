import React, { Component } from 'react';
import { UserConsumer } from './Context';

class WeekChangeButtons extends Component {
	render() {
		return (
			<UserConsumer>
				{({ changeWeek }) => (
					<div className='week-change-buttons'>
						<button value='back' onClick={changeWeek}>
							Previous Week
						</button>
						<button value='forward' onClick={changeWeek}>
							Next Week
						</button>
					</div>
				)}
			</UserConsumer>
		);
	}
}

export default WeekChangeButtons;
