import React, { Component } from 'react'

class FoodForm extends Component {

  render() {
    const { user } = this.props
    return (
      <div>
        {user.fname}
      </div>
    )
  }
}

export default FoodForm