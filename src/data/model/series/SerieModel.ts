interface scheduleModel {
  time: string
  days: []
}

interface ratingModel {
  average: number
}

interface countryNetworkModel {
  name: string
  code: string
  timezone: string
}

interface networkModel {
  id: number
  name: string
  country: countryNetworkModel
  officialSite: string
}

interface externalsModel {
  tvrage: number
  thetvdb: number
  imdb: string
}

interface imageModel {
  medium: string
  original: string
}

interface selfLinksModel {
  href: string
}

interface previousepisodeLinksModel {
  href: string
}

interface linksModel {
  self: selfLinksModel
  previousepisode: previousepisodeLinksModel
}

export interface SerieModel {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: []
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string
  officialSite: string
  schedule: scheduleModel
  rating: ratingModel
  weight: number
  network: networkModel
  webChannel: any
  dvdCountry: any
  externals: externalsModel
  image: imageModel
  summary: string
  updated: number
  _links: linksModel
}
