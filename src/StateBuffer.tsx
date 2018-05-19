import * as React from 'react'

/**
 * Buffers calls to setState within a sub-tree.
 */
class StateBuffer<TState> extends React.Component<Props<TState>, TState> {
  buffer = [] as any[]
  parentState = this.props.parent.state
  state = this.props.parent.state

  componentDidUpdate() {
    if (this.parentState === this.props.parent.state) return
    this.buffer = []
    this.parentState = this.props.parent.state
    this.setState(this.props.parent.state)
  }

  render() {
    return this.props.children(this)
  }

  write: BufferProps<TState>['write'] = (stateUpdate, callback) => {
    this.setState(stateUpdate, callback)
    this.buffer.push(stateUpdate)
  }

  flush: BufferProps<TState>['flush'] = callback => {
    const stateUpdates = this.buffer
    this.buffer = []
    for (const stateUpdate of stateUpdates) {
      this.props.parent.setState(stateUpdate)
    }
    this.props.parent.setState({}, callback)
  }
}

interface Props<TState> {
  /**
   * Render the buffered sub-tree.
   */
  children: (buffer: BufferProps<TState>) => React.ReactNode

  /**
   * The parent component.
   */
  parent: React.Component<any, TState>
}

interface BufferProps<TState> {
  /**
   * The buffered state.
   */
  state: TState

  /**
   * Set the state inside the buffer.
   * Works the same way as setState, but buffers the state changes.
   */
  write: React.Component<any, TState>['setState']

  /**
   * Flush the state changes to the parent.
   */
  flush: (callback?: () => void) => void
}

export default StateBuffer
export { Props, BufferProps }
