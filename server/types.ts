export interface Module {
    url: string
    loader: string
    sourceHash: string
    hash: string
    deps: DependencyDescriptor[]
    jsFile: string
    bundlingFile: string
    error: Error | null
}

export interface DependencyDescriptor {
    url: string
    hash: string
    isDynamic?: boolean
    isStyle?: boolean
    isData?: boolean
}

export type ImportMap = Record<string, ReadonlyArray<string>>
