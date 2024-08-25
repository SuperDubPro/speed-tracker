export type Create<T> = Omit<T, 'id'>

export interface Req<T> {
  data?: T
}
