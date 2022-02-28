import React, { Component } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'
import './App.css'

type ExerciseControlGroupProps = {
  exercises: Exercise[]
}

class ExerciseControlGroup extends Component<ExerciseControlGroupProps> {
  render () {
    const { exercises } = this.props
    return (
      <FormGroup className='form-group-exercise'>
        {
          exercises.map((exercise) => {
            return <FormControlLabel className='form-group-exercise--label' key={exercise.id} labelPlacement='start' control={<Switch className='form-group-exercise--switch' defaultChecked />} label={exercise.name} />
          })
        }
      </FormGroup>
    )
  }
}

type IntervalButtonGroupProps = {
  duration: number
}

class IntervalButtonGroup extends Component<IntervalButtonGroupProps> {
  render () {
    const { duration } = this.props
    return (
      <FormGroup className='form-group-interval'>
        <FormControlLabel className='form-group-interval--label' labelPlacement='start' label={duration}
          control={
            <ButtonGroup className='form-group-interval--button-group' variant='contained'>
              <Button><Remove /></Button>
              <Button><Add /></Button>
            </ButtonGroup>
          }
        />
      </FormGroup>
    )
  }
}

type StartStopButtonGroupProps = {
  started: boolean
}

class StartStopButtonGroup extends Component<StartStopButtonGroupProps> {
  render () {
    const { started } = this.props
    return (
      <ButtonGroup className='form-group-startstop--button-group' variant='contained'>
        {
          started
            ? <Button color='error'>Stop</Button>
            : <Button color='success'>Start</Button>
        }
      </ButtonGroup>
    )
  }
}

type Exercise = {
  id: number
  name: string
}

class App extends Component {
  private exercises: Exercise[] = [
    { id: 0, name: '1 (Jab)' },
    { id: 1, name: '2 (Cross-Punch)' },
    { id: 2, name: '3 (Hook)' },
    { id: 3, name: '4 (Upper-Cut)' },
    { id: 4, name: '5 (Front-Kick)' },
    { id: 5, name: '6 (Roundhouse-Kick)' },
    { id: 6, name: '7 (Side-Kick)' },
    { id: 7, name: '8 (Back-Kick)' },
    { id: 8, name: '2 of 1, 2, 3, 4' },
    { id: 9, name: '5, 8' },
    { id: 10, name: 'Switch' },
    { id: 11, name: 'Reverse' },
    { id: 12, name: 'Pivot' },
  ]

  private duration: number = 5000

  private started: boolean = false

  render () {
    return (
      <Stack className="app-layout--wrapper" direction={'row'} alignItems='center' justifyContent={'center'}>
        <Stack className="app-layout--main" direction={'column'} alignItems='center' justifyContent={'center'}>
          <ExerciseControlGroup exercises={this.exercises} />
          <IntervalButtonGroup duration={this.duration} />
          <StartStopButtonGroup started={this.started} />
        </Stack>
      </Stack>
    )
  }
}

export default App
