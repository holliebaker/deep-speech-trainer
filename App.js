import React from 'react'

import Main from './Main'
import ErrorBoundary from './ErrorBoundary'

export default () => (
  <ErrorBoundary>
    <Main />
  </ErrorBoundary>
)
