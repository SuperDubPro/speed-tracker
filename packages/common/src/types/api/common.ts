export type IdType = string

export type AnyObject = Record<string, unknown>

// export type EmptyObject = Record<any, never>
export type EmptyObject = {
  [K in any]: never
}

export type Create<T> = Omit<T, 'id'>
