import React, { Component, ReactNode } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'

type IntervalControlProps = {
  defaultDuration: number
}

type IntervalControlState = {
  duration: number
}

class IntervalControl extends Component<IntervalControlProps, IntervalControlState> {
  private _durationMin: number = 1000
  private _durationMax: number = 10000
  private _durationStep: number = 1000

  constructor(props: IntervalControlProps) {
    super(props)
    this.state = {
      duration: props.defaultDuration
    }

    this.renderDuration = this.renderDuration.bind(this)
    this.decreaseDuration = this.decreaseDuration.bind(this)
    this.increaseDuration = this.increaseDuration.bind(this)
  }

  render(): ReactNode {
    return (
      <FormGroup className='form-group-interval'>
        <FormControlLabel className='form-group-interval--label' labelPlacement='start' label={this.renderDuration()}
          control={
            <ButtonGroup className='form-group-interval--button-group' variant='contained'>
              <Button onClick={this.decreaseDuration}><Remove /></Button>
              <Button onClick={this.increaseDuration}><Add /></Button>
            </ButtonGroup>
          }
        />
      </FormGroup>
    )
  }

  renderDuration(): string {
    return `${this.state.duration / 1000}s`
  }

  decreaseDuration(): void {
    const decreasedDuration = this.state.duration - this._durationStep
    if (decreasedDuration < this._durationMin) {
      return
    }
    this.setState({ duration: decreasedDuration })
  }

  increaseDuration(): void {
    const increasedDuration = this.state.duration + this._durationStep
    if (increasedDuration > this._durationMax) {
      return
    }
    this.setState({ duration: increasedDuration })
  }
}

export default IntervalControl
