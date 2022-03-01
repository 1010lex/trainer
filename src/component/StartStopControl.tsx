import React, { Component, ReactNode } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

type StartStopButtonControlProps = {}

type StartStopButtonControlState = {
  started: boolean
}

class StartStopButtonControl extends Component<StartStopButtonControlProps, StartStopButtonControlState> {
  constructor(props: StartStopButtonControlProps) {
    super(props)
    this.state = {
      started: false,
    }

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  render(): ReactNode {
    return (
      <ButtonGroup className='form-group-startstop--button-group' variant='contained'>
        {
          this.state.started
            ? <Button color='error' onClick={this.stop}>Stop</Button>
            : <Button color='success' onClick={this.start}>Start</Button>
        }
      </ButtonGroup>
    )
  }

  start(): void {
    this.setState({ started: true })
  }

  stop(): void {
    this.setState({ started: false })
  }
}

export default StartStopButtonControl
