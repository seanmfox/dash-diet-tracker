import React, { Component } from 'react';
import FoodItem from './FoodItem';
import { createFoodRecord, updateFoodRecord } from '../lib/DBAPI';

class FoodForm extends Component {
	state = {
		grain: 0,
		wholeGrain: 0,
		fruit: 0,
		veggies: 0,
		dairy: 0,
		meats: 0,
		seedsLegumes: 0,
		fatsSweets: 0
	};

	componentDidMount = () => {
		this.setState({
			grain: this.props.set.grain,
			wholeGrain: this.props.set.wholeGrain,
			fruit: this.props.set.fruit,
			veggies: this.props.set.veggies,
			dairy: this.props.set.dairy,
			meats: this.props.set.meats,
			seedsLegumes: this.props.set.seedsLegumes,
			fatsSweets: this.props.set.fatsSweets
		});
	};

	changeCount = e => {
		const changeArray = e.target.value.split('-');
		const selectedCategory = changeArray[0];
		const selectedChange = changeArray[1];
		const changeType = selectedChange === 'increment' ? 1 : -1;
		this.setState(prevState => ({
			[selectedCategory]: prevState[selectedCategory] + Number([changeType])
		}));
		this.props.changeMade();
	};

	saveData = () => {
		this.props.changeSaved();
		if (this.props.set.newRecord) {
			this.addNewRecord(
				this.props.user.userId,
				this.state,
				this.props.set.trackDate
			);
		} else {
			this.updateRecord(this.props.user.userId, this.props.set._id, this.state);
		}
	};

	async addNewRecord(userId, state, trackDate) {
		const res = await createFoodRecord(userId, state, trackDate);
		this.props.setUser(res.user);
	}

	async updateRecord(userId, recordId, foodData) {
		const res = await updateFoodRecord(userId, recordId, foodData);
		this.props.setUser(res.user);
	}

	render() {
		const categoryChoices = Object.keys(this.state);
		return (
			<div>
				<table>
          <tbody>
					<tr>
						<th>Food Type</th>
						<th>Goal</th>
						<th>Count</th>
					</tr>
					{categoryChoices.map(category => (
						<FoodItem
							adjust={this.changeCount}
							key={category}
							categoryName={category}
							categoryValue={this.state[category]}
						/>
          ))}
          </tbody>
				</table>
				<button onClick={this.saveData}>Save Groups</button>
			</div>
		);
	}
}

export default FoodForm;
