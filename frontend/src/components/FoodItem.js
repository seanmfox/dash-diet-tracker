import React, { Component } from 'react';

class FoodItem extends Component {

	render() {
		const { categoryName, categoryValue } = this.props;
		return (
			<div>
				<p>{categoryName}</p>
				<p>{categoryValue}</p>
        <button value={`${categoryName}-increment`} onClick={this.props.adjust}>Go up</button>
        <button value={`${categoryName}-decrement`} onClick={this.props.adjust}>Go down</button>
			</div>
		);
	}
}

export default FoodItem;
