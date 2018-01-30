import React from 'react'
import Radium from 'radium'

import Image from '../Image'

class AlbumMatrix extends React.Component {

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate()
    }, 6000)
  }

  generateMatrix() {
    let style = {
      display: 'inline-block',
      width: 'calc(25% - 3px)',
      marginRight: '3px',
      height: '25%'
    }

    const gridSize = 16
    let usedImages = {}
    let grid = []

    for (let i = 0; i < gridSize; i++) {
      let index = parseInt((Math.random() * 10000 % 19) + 1)
      
      if (usedImages[index]) {
        grid.push(<div key={i} style={ style }></div>)
      } else {
        usedImages[index] = true
        grid.push(<Image key={i} style={ style } src={ `/album_art/${index}.jpeg` } />)
      }
    }

    return grid
  }

  render() {
    return (
      <div style={ this.props.style }>
        { this.generateMatrix() } 
      </div>
    )
  }
}

export default Radium(AlbumMatrix)