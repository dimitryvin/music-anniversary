import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'


export default class Image extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.prevImage = this.props.src
      this.setState({
        loaded: false
      }, () => {
        setTimeout(this.loadImage.bind(this), 500)
      })
    }
  }

  onImageLoad() {
    if (this.mounted) {
      this.setState({ loaded: true })
    }
  }

  loadImage() {
    // load the image
    let img = new window.Image()
    img.onload = this.onImageLoad.bind(this)
    img.src = this.props.src
  }

  componentDidMount() {
    this.loadImage()

    this.mounted = true // not the best approach
  }

  componentWillMount() {
    this.mounted = false
  }

  render() {
    let { className, ...props } = this.props
    let imgClasses = 'image'
    let rootClassName = classNames(className, 'image', {
      'image-loaded': this.state.loaded
    })

    return <img ref={ img => this.img = img } { ...props } src={ !this.state.loaded ? this.prevImage : this.props.src } className = { rootClassName } />
  }
}