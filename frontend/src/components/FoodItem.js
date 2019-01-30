import React, { Component } from 'react';

class FoodItem extends Component {

	render() {
		const { categoryName, categoryValue } = this.props;
		return (
			<div>
				<p>{categoryName}</p>
				<p>{categoryValue}</p>
        <button value={`${categoryName}-decrement`} onClick={this.props.adjust}>-</button>
        <button value={`${categoryName}-increment`} onClick={this.props.adjust}>+</button>
			</div>
		);
	}
}

export default FoodItem;
