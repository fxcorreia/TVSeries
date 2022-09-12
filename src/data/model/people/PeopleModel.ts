interface PeopleHrefModel {
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

export interface PersonModel {
  id: number
  url: string
  name: string
  country: PeopleCountryModel
  birthday: string
  deathday: any
  gender: string
  image: PeopleImageModel
  updated: number
  _links: PeopleLinksModel
}

export interface PeopleModel {
  score: number
  person: PersonModel
}
