import React, { ChangeEvent, Component, ReactNode } from 'react'
import isNil from 'lodash/isNil'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Exercise from '../model/Exercise'

type ExerciseControlProps = {
  events: {
    exerciseEnableTriggered: (id: string) => void
    exerciseDisableTriggered: (id: string) => void
  }
  exercises: Exercise[]
}

type ExerciseControlState = {}

class ExerciseControl extends Component<ExerciseControlProps, ExerciseControlState> {
  constructor(props: ExerciseControlProps) {
    super(props)

    this.changeExerciseState = this.changeExerciseState.bind(this)
  }

  changeExerciseState(event: ChangeEvent<HTMLInputElement>): void {
    const exerciseId = event.target.value
    const exercise = this.props.exercises.find(exercise => exercise.id === exerciseId)
    if (isNil(exercise)) {
      return
    }
    exercise.enabled
      ? this.props.events.exerciseDisableTriggered(exerciseId)
      : this.props.events.exerciseEnableTriggered(exerciseId)
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
                    checked={exercise.enabled}
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
}

export type { ExerciseControlProps }
export { ExerciseControl }
