export interface CreateTrackDto {
    readonly name: string
    readonly artist: string
    readonly text?: string
    readonly listens: number
    readonly duration: number,
    readonly convertedDuration: string
}

export interface CreateTrackFilesDto {
    readonly image: Express.Multer.File[]
    readonly audio: Express.Multer.File[]
}