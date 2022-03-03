import cloneDeep from 'lodash/cloneDeep'
import isFunction from 'lodash/isFunction'
import isNil from 'lodash/isNil'
import random from 'lodash/random'
import { Exercise } from '../model/Exercise'

type ConstructorOptions = {
  exercises: Exercise[]
  intervalConfiguration: {
    default: number
    min: number
    max: number
    step: number
  }
}

class Training {
  private _exercises: Exercise[]
  private _intervalConfiguration: ConstructorOptions['intervalConfiguration']
  private _interval: number
  private _timer: ReturnType<typeof setInterval> | null

  constructor(options: ConstructorOptions) {
    this._exercises = cloneDeep(options.exercises)
    this._intervalConfiguration = cloneDeep(options.intervalConfiguration)
    this._interval = options.intervalConfiguration.default
    this._timer = null
  }

  start(): void {
    if (!isNil(this._timer)) {
      return
    }
    this._timer = setInterval(
      this.anounceRandomEnabledExercise.bind(this),
      this._interval,
    )
  }

  stop(): void {
    if (isNil(this._timer)) {
      return
    }
    clearInterval(this._timer)
    this._timer = null
  }

  restart(): void {
    if (isNil(this._timer)) {
      return
    }
    this.stop()
    this.start()
  }

  disableExercise(exerciseId: string): void {
    const exercise = this.getExerciseById(exerciseId)
    exercise.enabled = false
    this.restart()
  }

  enableExercise(exerciseId: string): void {
    const exercise = this.getExerciseById(exerciseId)
    exercise.enabled = true
    this.restart()
  }

  decreaseInterval(): void {
    const decreasedInterval = this._interval - this._intervalConfiguration.step
    if (decreasedInterval < this._intervalConfiguration.min) {
      return
    }
    this._interval = decreasedInterval
    this.restart()
  }

  increaseInterval(): void {
    const increasedInterval = this._interval + this._intervalConfiguration.step
    if (increasedInterval > this._intervalConfiguration.max) {
      return
    }
    this._interval = increasedInterval
    this.restart()
  }

  isStarted(): boolean {
    return !isNil(this._timer)
  }

  anounceExercise(exercise: Exercise): void {
    const lang = 'en-US'
    const voice = speechSynthesis
      .getVoices()
      .find(voice => voice.lang === lang)

    const utterance = new SpeechSynthesisUtterance()
    utterance.text = isFunction(exercise.phrase)
      ? exercise.phrase()
      : exercise.phrase
    utterance.lang = lang
    utterance.voice = voice || null

    speechSynthesis.speak(utterance)
  }

  private getExerciseById(exerciseId: string): Exercise {
    const exercise = this._exercises.find(exercise => exercise.id === exerciseId)
    if (isNil(exercise)) {
      throw new Error('Exercise could not be found')
    }
    return exercise
  }

  private anounceRandomEnabledExercise(): void {
    const enabledExercises = this._exercises.filter(exercise => exercise.enabled)
    const randomIndex = random(0, enabledExercises.length - 1, false)
    const randomExercise = enabledExercises[randomIndex]

    this.anounceExercise(randomExercise)
  }

  get exercises(): Exercise[] {
    return cloneDeep(this._exercises)
  }

  get interval(): number {
    return this._interval
  }
}

export { Training }
