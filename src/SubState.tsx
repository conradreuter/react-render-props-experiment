import * as React from 'react'

/**
 * Makes a sub-tree dependent on a substate of the parent.
 */
class SubState<TState, TSubState> extends React.Component<Props<TState, TSubState>> {
  subState: TSubState = undefined as any // initialized later

  shouldComponentUpdate(nextProps: Props<TState, TSubState>) {
    const subState = nextProps.get(nextProps.parent.state)
    return this.subState !== subState
  }

  render() {
    this.subState = this.props.get(this.props.parent.state)
    return this.props.children({
      state: this.subState,
      setState: this.setSubState,
    })
  }

  setSubState: React.Component<any, TSubState>['setState'] = subStateUpdate =>
    this.props.parent.setState((parentState, parentProps) => {
      const subState =
        typeof subStateUpdate === 'function'
          ? subStateUpdate(this.props.get(parentState), parentProps)
          : subStateUpdate
      if (subState === null) return null
      return this.props.set(parentState, subState as TSubState)
    })
}

interface Props<TState, TSubState> {
  /**
   * Render the sub-tree that uses the substate.
   */
  children: (subState: SubStateProps<TSubState>) => React.ReactNode

  /**
   * The parent component.
   */
  parent: React.Component<any, TState>

  /**
   * Extract the sub-state from the parent state.
   */
  get: (state: TState) => TSubState

  /**
   * Immutably set the sub-state inside the parent state.
   */
  set: (state: TState, subState: TSubState) => void
}

type SubStateProps<TSubState> = Pick<React.Component<any, TSubState>, 'state' | 'setState'>

export default SubState
export { Props, SubState }
