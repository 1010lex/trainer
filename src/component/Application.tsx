import React, { Component, ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Exercise from '../model/Exercise'
import { ExerciseControlProps, ExerciseControl } from '../component/ExerciseControl'
import { IntervalControlProps, IntervalControl } from '../component/IntervalControl'
import { StartStopControlProps, StartStopControl } from '../component/StartStopControl'
import './Application.css'

type Configuration = {
  exercises: Exercise[]
  interval: number
  intervalMin: number
  intervalMax: number
  intervalStep: number
}

const configuration: Configuration = {
  exercises: [
    { id: '70f1faeb-dff4-4c46-80a6-478ceb514e56', name: '1 (Jab)', enabled: true },
    { id: '748f947a-efec-4aab-b3f7-b13cd54b8801', name: '2 (Cross-Punch)', enabled: true },
    { id: 'd7ee972a-0442-40a7-b35e-cc11505bad34', name: '3 (Hook)', enabled: true },
    { id: '687e10d9-7c86-44f1-b53f-3f242b3e78a8', name: '4 (Upper-Cut)', enabled: true },
    { id: 'a146490a-eee5-407c-bf7c-50c129224f51', name: '5 (Front-Kick)', enabled: true },
    { id: '5a3c6106-f206-4b35-96a7-ff628c5b6dab', name: '6 (Roundhouse-Kick)', enabled: true },
    { id: 'be9d8b4f-73cd-4c64-bf85-8f18b0c965b2', name: '7 (Side-Kick)', enabled: true },
    { id: '2c692d00-a634-4a23-b9a1-2dd1c9401011', name: '8 (Back-Kick)', enabled: true },
    { id: '050a2209-ad36-414b-a5ef-9b6367468c6d', name: '2 of 1, 2, 3, 4', enabled: true },
    { id: '7d8eb511-9baf-45fd-8c49-19eeeb51803a', name: '5, 8', enabled: true },
    { id: 'e6e73d1c-067a-461f-9f5a-37ce44b1672d', name: 'Switch', enabled: true },
    { id: '7bab60e0-8d27-4c2e-9b27-d406282f3ee8', name: 'Reverse', enabled: true },
    { id: '70155489-85d3-42e4-847b-99cc85241f6c', name: 'Pivot', enabled: true },
  ],
  interval: 5000,
  intervalMin: 1000,
  intervalMax: 10000,
  intervalStep: 1000,
}

type ApplicationProps = {}

type ApplicationState = {
  exercises: { [key: string]: Exercise }
  interval: number
  started: boolean
}

class Application extends Component<ApplicationProps, ApplicationState> {
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
    const decreasedInterval = this.state.interval - configuration.intervalStep
    if (decreasedInterval < configuration.intervalMin) {
      return
    }
    this.setState({
      ...this.state,
      interval: decreasedInterval,
    })
  }

  onIncreaseIntervalTriggered(): void {
    const increasedInterval = this.state.interval + configuration.intervalStep
    if (increasedInterval > configuration.intervalMax) {
      return
    }
    this.setState({
      ...this.state,
      interval: increasedInterval,
    })
  }

  onStartTriggered(): void {
    this.setState({
      ...this.state,
      started: true,
    })
  }

  onStopTriggered(): void {
    this.setState({
      ...this.state,
      started: false,
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

export default Application
