import React, { ChangeEvent, Component, ReactNode } from 'react'
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

type ExerciseControlGroupState = {
  exerciseStates: { [key: string]: boolean }
}

class ExerciseControlGroup extends Component<ExerciseControlGroupProps, ExerciseControlGroupState> {
  constructor(props: ExerciseControlGroupProps) {
    super(props)
    this.state = {
      exerciseStates: props.exercises
        .reduce((accumulator: ExerciseControlGroupState['exerciseStates'], exercise: Exercise) => {
          accumulator[exercise.id] = exercise.defaultEnabled
          return accumulator
        }, {})
    }

    this.isEnabledExercise = this.isEnabledExercise.bind(this)
    this.changeExerciseState = this.changeExerciseState.bind(this)
  }

  render(): ReactNode {
    const { exercises } = this.props
    return (
      <FormGroup className='form-group-exercise'>
        {
          exercises.map((exercise) => {
            return (
              <FormControlLabel
                className='form-group-exercise--label'
                key={exercise.id}
                labelPlacement='start'
                control={
                  <Switch
                    className='form-group-exercise--switch'
                    checked={this.isEnabledExercise(exercise)}
                    value={exercise.id}
                    onChange={this.changeExerciseState}
                  />
                }
                label={exercise.name}
              />
            )
          })
        }
      </FormGroup>
    )
  }

  isEnabledExercise(exercise: Exercise): boolean {
    return this.state.exerciseStates[exercise.id]
  }

  changeExerciseState(event: ChangeEvent<HTMLInputElement>): void {
    const exerciseId = event.target.value
    const nextState = { ...this.state }
    nextState.exerciseStates[exerciseId] = !nextState.exerciseStates[exerciseId]
    this.setState(nextState)
  }
}

type IntervalButtonGroupProps = {
  defaultDuration: number
}

type IntervalButtonGroupState = {
  duration: number
}

class IntervalButtonGroup extends Component<IntervalButtonGroupProps, IntervalButtonGroupState> {
  private _durationMin: number = 1000
  private _durationMax: number = 10000
  private _durationStep: number = 1000

  constructor(props: IntervalButtonGroupProps) {
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

type StartStopButtonGroupProps = {}

type StartStopButtonGroupState = {
  started: boolean
}

class StartStopButtonGroup extends Component<StartStopButtonGroupProps, StartStopButtonGroupState> {
  constructor(props: StartStopButtonGroupProps) {
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

type Exercise = {
  id: string
  name: string
  defaultEnabled: boolean
}

class App extends Component {
  private exercises: Exercise[] = [
    { id: '70f1faeb-dff4-4c46-80a6-478ceb514e56', name: '1 (Jab)', defaultEnabled: true },
    { id: '748f947a-efec-4aab-b3f7-b13cd54b8801', name: '2 (Cross-Punch)', defaultEnabled: true },
    { id: 'd7ee972a-0442-40a7-b35e-cc11505bad34', name: '3 (Hook)', defaultEnabled: true },
    { id: '687e10d9-7c86-44f1-b53f-3f242b3e78a8', name: '4 (Upper-Cut)', defaultEnabled: true },
    { id: 'a146490a-eee5-407c-bf7c-50c129224f51', name: '5 (Front-Kick)', defaultEnabled: true },
    { id: '5a3c6106-f206-4b35-96a7-ff628c5b6dab', name: '6 (Roundhouse-Kick)', defaultEnabled: true },
    { id: 'be9d8b4f-73cd-4c64-bf85-8f18b0c965b2', name: '7 (Side-Kick)', defaultEnabled: true },
    { id: '2c692d00-a634-4a23-b9a1-2dd1c9401011', name: '8 (Back-Kick)', defaultEnabled: true },
    { id: '050a2209-ad36-414b-a5ef-9b6367468c6d', name: '2 of 1, 2, 3, 4', defaultEnabled: true },
    { id: '7d8eb511-9baf-45fd-8c49-19eeeb51803a', name: '5, 8', defaultEnabled: true },
    { id: 'e6e73d1c-067a-461f-9f5a-37ce44b1672d', name: 'Switch', defaultEnabled: true },
    { id: '7bab60e0-8d27-4c2e-9b27-d406282f3ee8', name: 'Reverse', defaultEnabled: true },
    { id: '70155489-85d3-42e4-847b-99cc85241f6c', name: 'Pivot', defaultEnabled: true },
  ]

  render(): ReactNode {
    return (
      <Stack className="app-layout--wrapper" direction={'row'} alignItems='center' justifyContent={'center'}>
        <Stack className="app-layout--main" direction={'column'} alignItems='center' justifyContent={'center'}>
          <ExerciseControlGroup exercises={this.exercises} />
          <IntervalButtonGroup defaultDuration={5000} />
          <StartStopButtonGroup />
        </Stack>
      </Stack>
    )
  }
}

export default App
