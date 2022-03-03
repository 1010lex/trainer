import React, { ChangeEvent, Component, ReactNode } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import { Exercise } from '../model/Exercise'

type ExerciseControlProps = {
  events: {
    exerciseEnableTriggered: (exerciseId: string) => void
    exerciseDisableTriggered: (exerciseId: string) => void
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
    const {
      value: exerciseId,
      checked: enableTriggered,
    } = event.target

    enableTriggered
      ? this.props.events.exerciseEnableTriggered(exerciseId)
      : this.props.events.exerciseDisableTriggered(exerciseId)
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
                label={exercise.label}
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
