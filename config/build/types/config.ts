export type BuildMode = 'production' | 'development'

export interface BuildPaths {
    entry: string,
    build: string,
    html: string,
    src: string
}

export type ProjectType = 'storybook' | 'frontend' | 'jest';

export interface BuildOptions {
    mode: BuildMode,
    paths: BuildPaths,
    isDev: boolean,
    port: number,
    apiUrl: string,
    project: ProjectType,
}

export interface BuildEnv {
    mode: BuildMode,
    port: number,
    apiUrl: string,
}
