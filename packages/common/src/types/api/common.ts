export type IdType = string | number

export enum IdKeys {
  mongoose = '_id',
}

export type AnyObject = Record<string, unknown>

// export type EmptyObject = Record<any, never>
export type EmptyObject = {
  [K in any]: never
}
