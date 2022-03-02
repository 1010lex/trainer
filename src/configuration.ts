import random from 'lodash/random'
import { Configuration } from './model/Configuration'

const configuration: Configuration = {
  exercises: [
    {
      id: '70f1faeb-dff4-4c46-80a6-478ceb514e56',
      label: '1 (Jab)',
      phrase: '1',
      enabled: true,
    },
    {
      id: '748f947a-efec-4aab-b3f7-b13cd54b8801',
      label: '2 (Cross-Punch)',
      phrase: '2',
      enabled: true,
    },
    {
      id: 'd7ee972a-0442-40a7-b35e-cc11505bad34',
      label: '3 (Hook)',
      phrase: '3',
      enabled: true,
    },
    {
      id: '687e10d9-7c86-44f1-b53f-3f242b3e78a8',
      label: '4 (Upper-Cut)',
      phrase: '4',
      enabled: true,
    },
    {
      id: 'a146490a-eee5-407c-bf7c-50c129224f51',
      label: '5 (Front-Kick)',
      phrase: '5',
      enabled: true,
    },
    {
      id: '5a3c6106-f206-4b35-96a7-ff628c5b6dab',
      label: '6 (Roundhouse-Kick)',
      phrase: '6',
      enabled: true,
    },
    {
      id: 'be9d8b4f-73cd-4c64-bf85-8f18b0c965b2',
      label: '7 (Side-Kick)',
      phrase: '7',
      enabled: true,
    },
    {
      id: '2c692d00-a634-4a23-b9a1-2dd1c9401011',
      label: '8 (Back-Kick)',
      phrase: '8',
      enabled: true,
    },
    {
      id: '050a2209-ad36-414b-a5ef-9b6367468c6d',
      label: '2 of 1, 2, 3, 4',
      phrase: (): string => {
        const parts = ['1', '2', '3', '4']
        const part1 = parts[random(0, parts.length - 1, false)]
        const part2 = parts[random(0, parts.length - 1, false)]
        return `${part1}, ${part2}`
      },
      enabled: true,
    },
    {
      id: '7d8eb511-9baf-45fd-8c49-19eeeb51803a',
      label: '5, 8',
      phrase: '5',
      enabled: true,
    },
    {
      id: 'e6e73d1c-067a-461f-9f5a-37ce44b1672d',
      label: 'Switch',
      phrase: 'Switch',
      enabled: true,
    },
    {
      id: '7bab60e0-8d27-4c2e-9b27-d406282f3ee8',
      label: 'Reverse',
      phrase: 'Reverse',
      enabled: true,
    },
    {
      id: '70155489-85d3-42e4-847b-99cc85241f6c',
      label: 'Pivot',
      phrase: 'Pivot',
      enabled: true,
    },
  ],
  interval: 2000,
  intervalMin: 1000,
  intervalMax: 10000,
  intervalStep: 1000,
}

export { configuration }
