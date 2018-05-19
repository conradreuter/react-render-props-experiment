import * as React from 'react'

import StateBuffer from './StateBuffer'

class StateBufferUsage extends React.Component<{}, State> {
  state = {
    counter: 0,
  }

  render(): React.ReactNode {
    return (
      <div>
        <p>Counter (global): {this.state.counter}</p>
        <StateBuffer<State> parent={this}>
          {({ state, write, flush }) => (
            <React.Fragment>
              <p>Counter (local): {state.counter}</p>
              <button onClick={() => write(s => ({ counter: s.counter + 1 }))}>Increment</button>
              <button onClick={() => flush()}>Flush</button>
            </React.Fragment>
          )}
        </StateBuffer>
        <button onClick={() => this.setState(s => ({ counter: s.counter + 1 }))}>Increment (global)</button>
      </div>
    )
  }
}

interface State {
  counter: number
}

export default StateBufferUsage