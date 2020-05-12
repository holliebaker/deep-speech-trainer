import React from 'react'

import ErrorScreen from '../ErrorScreen'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)

    this.state = { error: null }
  }

  static getDerivedStateFromError (error) {
    return { error }
  }

  componentDidCatch (error, errorInfo) {
    console.log(error, errorInfo)
  }

  render () {
    if (this.state.error) {
      return <ErrorScreen error={this.state.error} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
