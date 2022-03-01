import React, { ChangeEvent, Component, ReactNode } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Exercise from '../model/Exercise'

type ExerciseControlProps = {
  exercises: Exercise[]
}

type ExerciseControlState = {
  exerciseStates: { [key: string]: boolean }
}

class ExerciseControl extends Component<ExerciseControlProps, ExerciseControlState> {
  constructor(props: ExerciseControlProps) {
    super(props)
    this.state = {
      exerciseStates: props.exercises
        .reduce((accumulator: ExerciseControlState['exerciseStates'], exercise: Exercise) => {
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

export default ExerciseControl
