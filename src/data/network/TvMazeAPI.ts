/* eslint-disable @typescript-eslint/no-unused-vars */
import { PeopleCastCreditsModel } from '@data/model/people/PeopleCastCreditsModel'
import { PeopleModel } from '@data/model/people/PeopleModel'
import { EpisodeModel } from '@data/model/series/EpisodeModel'
import { SearchSeriesModel } from '@data/model/series/SearchSeriesModel'
import { SerieModel } from '@data/model/series/SerieModel'
import { AppReduxStore, AppThunk } from '@data/redux/ReduxTypes'
import { TVMAZE_URL } from '@utils/Constants'
import { ApiResponse, create } from 'apisauce'

let reduxStore: AppReduxStore | undefined

const client = create({
  baseURL: TVMAZE_URL,
  timeout: 30000,
})

client.addAsyncRequestTransform(async (_request) => {
  // const userCredentials = reduxStore?.getState().auth.userCredentials
  // if (!_.isNil(userCredentials)) {
  //   request.baseURL = userCredentials.instance.url
  //   request.headers.Authorization = `Bearer ${userCredentials.accessToken}`
  // } else {
  //   throw new Error()
  // }
})

const setReduxStore = (store: AppReduxStore) => {
  reduxStore = store
}

const fetchSeries =
  (page: number): AppThunk<Promise<ApiResponse<SerieModel[], any>>> =>
  async (_dispatch, _getState) => {
    return client.get<any, any>(`shows?page=${page}`)
  }

const searchSeries =
  (name: string): AppThunk<Promise<ApiResponse<SearchSeriesModel[], any>>> =>
  async (_dispatch, _getState) => {
    return client.get<any, any>(`search/shows?q=${name}`)
  }

const getSerieById =
  (id: number): AppThunk<Promise<ApiResponse<SerieModel, any>>> =>
  async (_dispatch, _getState) => {
    return client.get<any, any>(`shows/${id}`)
  }

const getEpisodes =
  (id: number): AppThunk<Promise<ApiResponse<EpisodeModel[], any>>> =>
  async (_dispatch, _getState) => {
    return client.get<any, any>(`shows/${id}/episodes`)
  }

const getPeople =
  (name: string): AppThunk<Promise<ApiResponse<PeopleModel[], any>>> =>
  async (_dispatch, _getState) => {
    return client.get<any, any>(`search/people?q=${name}`)
  }

const getPeopleCastCredits =
  (id: number): AppThunk<Promise<ApiResponse<PeopleCastCreditsModel, any>>> =>
  async (_dispatch, _getState) => {
    return client.get<any, any>(`people/${id}?embed=castcredits`)
  }

const TvMazeAPI = {
  client,
  setReduxStore,
  fetchSeries,
  searchSeries,
  getSerieById,
  getEpisodes,
  getPeople,
  getPeopleCastCredits,
}

export default TvMazeAPI
