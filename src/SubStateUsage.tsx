import { fromPairs, map, range, sum, values } from 'lodash/fp'
import * as React from 'react'

import SubState from './SubState'

const KEYS = map(key => `entry-${key}`)(range(0)(10))

class SubStateUsage extends React.Component<{}, State> {
  initialState = fromPairs(map(key => [key, 0])(KEYS))
  state = this.initialState

  render(): React.ReactNode {
    return (
      <div>
        <p>Sum: {sum(values(this.state))}</p>
        <table>
          <tbody>
            {KEYS.map(key => (
              <tr key={key}>
                <td>{key}</td>
                <SubState<State, number>
                  parent={this}
                  get={s => s[key]}
                  set={(s, x) => ({ ...s, [key]: x })}
                >
                  {({ state, setState }) => (
                    <React.Fragment>
                      <td>{state}</td>
                      <td><button onClick={() => setState(s => s + 1)}>+</button></td>
                      <td>{Math.random()}</td>
                    </React.Fragment>
                  )}
                </SubState>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => this.setState(this.initialState)}>Reset</button>
      </div>
    )
  }
}

type State = { [key: string]: number }

export default SubStateUsage