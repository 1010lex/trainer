import { Exercise } from './Exercise'

interface Configuration {
  exercises: Exercise[]
  interval: number
  intervalMin: number
  intervalMax: number
  intervalStep: number
}

export type { Configuration }
