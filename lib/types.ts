export interface Toast {
  message: string
  isError?: boolean
  delay?: number
}

export interface ToastItem extends Toast {
  createdAt: number
}

export type Timeout = ReturnType<typeof setTimeout>
export type ToastTimeouts = Record<number, Timeout>
