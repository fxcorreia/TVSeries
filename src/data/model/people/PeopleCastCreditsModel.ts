export interface PeopleHrefModel {
  href: string
}

interface PeopleLinksModel {
  self: PeopleHrefModel
}

interface PeopleImageModel {
  medium: string
  original: string
}

interface PeopleCountryModel {
  name: string
  code: string
  timezone: string
}

interface PeopleCreditsLinkModel {
  show: PeopleHrefModel
  character: PeopleHrefModel
}

interface PeopleCastCreditsDataModel {
  self: boolean
  voice: boolean
  _links: PeopleCreditsLinkModel
}

interface PeopleEmbeddedModel {
  castcredits: PeopleCastCreditsDataModel[]
}

export interface PeopleCastCreditsModel {
  id: number
  url: string
  name: string
  country: PeopleCountryModel
  birthday: string
  deathday: null
  gender: string
  image: PeopleImageModel
  updated: number
  _links: PeopleLinksModel
  _embedded: PeopleEmbeddedModel
}
