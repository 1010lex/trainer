import React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
// import InputLabel from '@mui/material/InputLabel'
import FormGroup from '@mui/material/FormGroup'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'
import './App.css'

function App () {
  type Exercise = {
    id: number
    name: string
  }

  const exercises: Exercise[] = [
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

  const duration: number = 5000

  const started: boolean = false

  function ExerciseControlGroup (props: { exercises: Exercise[] }) {
    const { exercises } = props
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

  function IntervalButtonGroup () {
    return (
      <FormGroup className='form-group-interval'>
        <FormControlLabel className='form-group-interval--label' key={123} labelPlacement='start' label={duration} control={
          <ButtonGroup className='form-group-interval--button-group' variant='contained'>
            <Button><Remove /></Button>
            <Button><Add /></Button>
          </ButtonGroup>
        } />
      </FormGroup>
    )
  }

  function StartStopButtonGroup () {
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

  return (
    <Stack className="app-layout--wrapper" direction={'row'} alignItems='center' justifyContent={'center'}>
      <Stack className="app-layout--main" direction={'column'} alignItems='center' justifyContent={'center'}>
        <ExerciseControlGroup exercises={exercises} />
        <IntervalButtonGroup />
        <StartStopButtonGroup />
      </Stack>
    </Stack>
  )
}

export default App
