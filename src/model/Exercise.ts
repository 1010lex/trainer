interface Exercise {
  id: string
  label: string
  phrase: string | (() => string)
  enabled: boolean
}

export type { Exercise }
