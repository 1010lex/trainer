import React, { Component, ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import { Training } from '../application/Training'
import { Exercise } from '../model/Exercise'
import { ExerciseControlProps, ExerciseControl } from '../component/ExerciseControl'
import { IntervalControlProps, IntervalControl } from '../component/IntervalControl'
import { StartStopControlProps, StartStopControl } from '../component/StartStopControl'
import { configuration } from '../configuration'
import './Application.css'

type ApplicationProps = {}

type ApplicationState = {
  exercises: { [key: string]: Exercise }
  interval: number
  started: boolean
}

class Application extends Component<ApplicationProps, ApplicationState> {
  private _training = new Training({
    exercises: configuration.exercises,
    intervalConfiguration: {
      default: configuration.interval,
      min: configuration.intervalMin,
      max: configuration.intervalMax,
      step: configuration.intervalStep,
    }
  })

  constructor(props: ApplicationProps) {
    super(props)

    this.state = {
      exercises: configuration.exercises
        .reduce((accumulator: ApplicationState['exercises'], exercise: Exercise) => {
          accumulator[exercise.id] = exercise
          return accumulator
        }, {}),
      interval: configuration.interval,
      started: false,
    }

    this.onExerciseDisableTriggered = this.onExerciseDisableTriggered.bind(this)
    this.onExerciseEnableTriggered = this.onExerciseEnableTriggered.bind(this)
    this.onDecreaseIntervalTriggered = this.onDecreaseIntervalTriggered.bind(this)
    this.onIncreaseIntervalTriggered = this.onIncreaseIntervalTriggered.bind(this)
    this.onStartTriggered = this.onStartTriggered.bind(this)
    this.onStopTriggered = this.onStopTriggered.bind(this)
  }

  onExerciseDisableTriggered(id: string): void {
    const exercises = { ...this.state.exercises }
    exercises[id].enabled = false
    this.setState({
      ...this.state,
      exercises,
    })
  }

  onExerciseEnableTriggered(id: string): void {
    const exercises = { ...this.state.exercises }
    exercises[id].enabled = true
    this.setState({
      ...this.state,
      exercises,
    })
  }

  onDecreaseIntervalTriggered(): void {
    this.setState({
      ...this.state,
      interval: this._training.decreaseInterval(),
    })
  }

  onIncreaseIntervalTriggered(): void {
    this.setState({
      ...this.state,
      interval: this._training.increaseInterval(),
    })
  }

  onStartTriggered(): void {
    this._training.start()
    this.setState({
      ...this.state,
      started: this._training.isStarted(),
    })
  }

  onStopTriggered(): void {
    this._training.stop()
    this.setState({
      ...this.state,
      started: this._training.isStarted(),
    })
  }

  render(): ReactNode {
    const exerciseControlEvents: ExerciseControlProps['events'] = {
      exerciseDisableTriggered: this.onExerciseDisableTriggered,
      exerciseEnableTriggered: this.onExerciseEnableTriggered,
    }
    const intervalControlEvents: IntervalControlProps['events'] = {
      decreaseIntervalTriggered: this.onDecreaseIntervalTriggered,
      increaseIntervalTriggered: this.onIncreaseIntervalTriggered,
    }
    const startStopControlEvents: StartStopControlProps['events'] = {
      startTriggered: this.onStartTriggered,
      stopTriggered: this.onStopTriggered,
    }

    return (
      <Stack className="app-layout--wrapper" direction={'row'} alignItems='center' justifyContent={'center'}>
        <Stack className="app-layout--main" direction={'column'} alignItems='center' justifyContent={'center'}>
          <ExerciseControl events={exerciseControlEvents} exercises={configuration.exercises} />
          <IntervalControl events={intervalControlEvents} interval={this.state.interval} />
          <StartStopControl events={startStopControlEvents} started={this.state.started} />
        </Stack>
      </Stack>
    )
  }
}

export { Application }
