import React, { Component, ReactNode } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

type StartStopControlProps = {
  events: {
    startTriggered: () => void
    stopTriggered: () => void
  },
  started: boolean
}

type StartStopControlState = {}

class StartStopControl extends Component<StartStopControlProps, StartStopControlState> {
  constructor(props: StartStopControlProps) {
    super(props)

    this.onStartClick = this.onStartClick.bind(this)
    this.onStopClick = this.onStopClick.bind(this)
  }

  onStartClick(): void {
    this.props.events.startTriggered()
  }

  onStopClick(): void {
    this.props.events.stopTriggered()
  }

  render(): ReactNode {
    return (
      <ButtonGroup className='form-group-startstop--button-group' variant='contained'>
        {
          this.props.started
            ? <Button color='error' onClick={this.onStopClick}>Stop</Button>
            : <Button color='success' onClick={this.onStartClick}>Start</Button>
        }
      </ButtonGroup>
    )
  }
}

export type { StartStopControlProps }
export { StartStopControl }
