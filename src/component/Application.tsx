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
  exercises: Exercise[]
  interval: number
  started: boolean
}

class Application extends Component<ApplicationProps, ApplicationState> {
  private _training: Training

  constructor(props: ApplicationProps) {
    super(props)

    this._training = new Training({
      exercises: configuration.exercises,
      intervalConfiguration: {
        default: configuration.interval,
        min: configuration.intervalMin,
        max: configuration.intervalMax,
        step: configuration.intervalStep,
      }
    })

    this.state = {
      exercises: this._training.exercises,
      interval: this._training.interval,
      started: false,
    }

    this.onExerciseDisableTriggered = this.onExerciseDisableTriggered.bind(this)
    this.onExerciseEnableTriggered = this.onExerciseEnableTriggered.bind(this)
    this.onDecreaseIntervalTriggered = this.onDecreaseIntervalTriggered.bind(this)
    this.onIncreaseIntervalTriggered = this.onIncreaseIntervalTriggered.bind(this)
    this.onStartTriggered = this.onStartTriggered.bind(this)
    this.onStopTriggered = this.onStopTriggered.bind(this)
  }

  onExerciseDisableTriggered(exerciseId: string): void {
    this._training.disableExercise(exerciseId)
    const exercises = this._training.exercises

    this.setState({
      ...this.state,
      exercises,
    })
  }

  onExerciseEnableTriggered(exerciseId: string): void {
    this._training.enableExercise(exerciseId)
    const exercises = this._training.exercises

    this.setState({
      ...this.state,
      exercises,
    })
  }

  onDecreaseIntervalTriggered(): void {
    this._training.decreaseInterval()
    const interval = this._training.interval

    this.setState({
      ...this.state,
      interval,
    })
  }

  onIncreaseIntervalTriggered(): void {
    this._training.increaseInterval()
    const interval = this._training.interval

    this.setState({
      ...this.state,
      interval,
    })
  }

  onStartTriggered(): void {
    this._training.start()
    const started = this._training.isStarted()

    this.setState({
      ...this.state,
      started,
    })
  }

  onStopTriggered(): void {
    this._training.stop()
    const started = this._training.isStarted()

    this.setState({
      ...this.state,
      started,
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
          <ExerciseControl events={exerciseControlEvents} exercises={this.state.exercises} />
          <IntervalControl events={intervalControlEvents} interval={this.state.interval} />
          <StartStopControl events={startStopControlEvents} started={this.state.started} />
        </Stack>
      </Stack>
    )
  }
}

export { Application }
