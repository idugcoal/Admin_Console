import React, { Component } from 'react'

export default class Table extends Component {
  render () {
    return (
      <div>
        Table. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}