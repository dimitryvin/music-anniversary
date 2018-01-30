import React, { Component } from 'react'
import { StyleRoot } from 'radium'

class App extends Component {
  render() {
    return (
      <StyleRoot style={{ height: '100%' }}>
        {this.props.children}
      </StyleRoot>
    )
  }
}

export default App
