export type SeedDataStruct = {
  seeds: Array<string>
  seedMap: Record<string, SeedMapStruct>
  dependencies: string
}

export type SeedMapStruct = {
  name: string
  shortName?: string
  installed?: boolean
  dev?: boolean
  choice?: string
  version: string
  main: string
}

export type SeedItemStruct = Omit<SeedMapStruct, 'version' | 'main'>