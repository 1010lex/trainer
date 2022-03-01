import React, { Component, ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Exercise from '../model/Exercise'
import ExerciseControlGroup from '../component/ExerciseControlGroup'
import IntervalButtonGroup from '../component/IntervalButtonGroup'
import StartStopButtonGroup from '../component/StartStopButtonGroup'
import './Application.css'

class Application extends Component {
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

export default Application
