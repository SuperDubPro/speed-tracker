export type AnyObject = Record<string, unknown>

export type EmptyObject = {
  [K in any]: never
}
