export type MovieEntity = {
  id: number
  name: string
  platformId: number
  genreId: number
}

export type Movie = Omit<MovieEntity, "id">

export type Watched = {
  watchedStatus: boolean
}

export type Platform = {
  name: string
}

export type Genre = {
  name: string
}

export type TotalMovies = {
  totalMovies: number
}