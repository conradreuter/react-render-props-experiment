import * as React from 'react'

import StateBufferUsage from './StateBufferUsage'
import SubStateUsage from './SubStateUsage'

/**
 * The main component.
 */
class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <h1>State Buffer</h1>
        <StateBufferUsage />
        <br />
        <br />
        <h1>Sub-state</h1>
        <SubStateUsage />
      </div>
    )
  }
}

export default App
