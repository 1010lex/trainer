import React, { Component, ReactNode } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'

type IntervalControlProps = {
  events: {
    increaseIntervalTriggered: () => void
    decreaseIntervalTriggered: () => void
  }
  interval: number
}

type IntervalControlState = {}

class IntervalControl extends Component<IntervalControlProps, IntervalControlState> {
  constructor(props: IntervalControlProps) {
    super(props)

    this.onDecreaseIntervalClick = this.onDecreaseIntervalClick.bind(this)
    this.onIncreaseIntervalClick = this.onIncreaseIntervalClick.bind(this)
    this.renderDuration = this.renderDuration.bind(this)
  }

  onDecreaseIntervalClick(): void {
    this.props.events.decreaseIntervalTriggered()
  }

  onIncreaseIntervalClick(): void {
    this.props.events.increaseIntervalTriggered()
  }

  renderDuration(): string {
    return `${this.props.interval / 1000}s`
  }

  render(): ReactNode {
    return (
      <FormGroup className='form-group-interval'>
        <FormControlLabel className='form-group-interval--label' labelPlacement='start' label={this.renderDuration()}
          control={
            <ButtonGroup className='form-group-interval--button-group' variant='contained'>
              <Button onClick={this.onDecreaseIntervalClick}><Remove /></Button>
              <Button onClick={this.onIncreaseIntervalClick}><Add /></Button>
            </ButtonGroup>
          }
        />
      </FormGroup>
    )
  }
}

export type { IntervalControlProps }
export { IntervalControl }
