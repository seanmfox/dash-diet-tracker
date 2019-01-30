import React, { Component } from 'react';

class FoodItem extends Component {
	displayName = rawName => {
		const nameArray = rawName.split('');
		const capArray = nameArray.filter(
			letter => letter === letter.toUpperCase()
		);
		if (capArray.length === 0) {
			nameArray.splice(0, 1, nameArray[0].toUpperCase());
			return nameArray.join('');
		} else if (
			capArray.length > 0 &&
			rawName.charAt(rawName.indexOf(capArray[0]) - 1) === 's'
		) {
			const capLocation = rawName.indexOf(capArray[0]);
			const firstWord = nameArray.slice(0, capLocation);
			firstWord.splice(0, 1, nameArray[0].toUpperCase());
			const newName = `${firstWord.join('')} and ${nameArray
				.slice(capLocation)
				.join('')}`;
			return newName;
		} else {
			const capLocation = rawName.indexOf(capArray[0]);
			const firstWord = nameArray.slice(0, capLocation);
			firstWord.splice(0, 1, nameArray[0].toUpperCase());
			const newName = `${firstWord.join('')} ${nameArray
				.slice(capLocation)
				.join('')}`;
			return newName;
		}
	};

	setGoal = (category) => {
		const foodGoals = [
			{ name: 'grain', goal: 3 },
			{ name: 'wholeGrain', goal: 3 },
			{ name: 'fruit', goal: 4 },
			{ name: 'veggies', goal: 3 },
			{ name: 'dairy', goal: 2 },
			{ name: 'meats', goal: 2 },
			{ name: 'seedsLegumes', goal: 1 },
			{ name: 'fatsSweets', goal: 3 }
		];
		const food = foodGoals.filter(food => food.name === category)[0]
		return food.goal
	}

	render() {
		const { categoryName, categoryValue } = this.props;
		return (
			<tr>
				<td>{this.displayName(categoryName)}</td>
				<td>{this.setGoal(categoryName)}</td>
				<td className={this.setGoal(categoryName) <= categoryValue ? 'completed' : null}>{categoryValue}</td>
				<td>
					<button
						value={`${categoryName}-decrement`}
						onClick={this.props.adjust}
					>
						-
					</button>
					<button
						value={`${categoryName}-increment`}
						onClick={this.props.adjust}
					>
						+
					</button>
				</td>
			</tr>
		);
	}
}

export default FoodItem;
