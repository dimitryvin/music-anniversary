import React from 'react'

import Image from '../Image'

export default class AlbumMatrix extends React.Component {

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate()
    }, 6000)
  }

  generateMatrix() {
    let style = {
      display: 'inline-block',
      width: 'calc(33% - 3px)',
      marginRight: '3px'
    }

    let usedImages = {}
    let grid = []
    for (let i = 0; i < 9; i++) {
      let index = parseInt((Math.random() * 10000 % 19) + 1)
      
      if (usedImages[index]) {
        grid.push(<div style={ style }></div>)
      } else {
        usedImages[index] = true
        grid.push(<Image style={ style } src={ `/album_art/${index}.jpeg` } />)
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