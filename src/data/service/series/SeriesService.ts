import AsyncStorage from '@data/database/async-storage/AsyncStorage'
import GenericErrorMapper from '@data/model/common/GenericErrorMapper'
import { EpisodeModel } from '@data/model/series/EpisodeModel'
import { SearchSeriesModel } from '@data/model/series/SearchSeriesModel'
import { SerieModel } from '@data/model/series/SerieModel'
import TvMazeAPI from '@data/network/TvMazeAPI'
import { AppThunk } from '@data/redux/ReduxTypes'
import ServiceHelper from '@data/service/common/ServiceHelper'
import { ServiceResponse } from '@data/service/common/ServiceResponse'
import _ from 'lodash'

const fetchSeries =
  (page: number): AppThunk<Promise<ServiceResponse<SerieModel[], any>>> =>
  async (dispatch) => {
    return dispatch(
      ServiceHelper.makeServiceRequest(async () => {
        const apiResponse = await dispatch(TvMazeAPI.fetchSeries(page))

        return ServiceHelper.processApiResponse(
          apiResponse,
          (responseData) => responseData!,
          (responseData) => GenericErrorMapper.fromBaseErrorResponse(responseData!),
        )
      }),
    )
  }

const searchSeries =
  (name: string): AppThunk<Promise<ServiceResponse<SearchSeriesModel[], any>>> =>
  async (dispatch) => {
    return dispatch(
      ServiceHelper.makeServiceRequest(async () => {
        const apiResponse = await dispatch(TvMazeAPI.searchSeries(name))

        return ServiceHelper.processApiResponse(
          apiResponse,
          (responseData) => responseData!,
          (responseData) => GenericErrorMapper.fromBaseErrorResponse(responseData!),
        )
      }),
    )
  }

const getSerieById =
  (id: number): AppThunk<Promise<ServiceResponse<SerieModel, any>>> =>
  async (dispatch) => {
    return dispatch(
      ServiceHelper.makeServiceRequest(async () => {
        const apiResponse = await dispatch(TvMazeAPI.getSerieById(id))

        return ServiceHelper.processApiResponse(
          apiResponse,
          (responseData) => responseData!,
          (responseData) => GenericErrorMapper.fromBaseErrorResponse(responseData!),
        )
      }),
    )
  }

const getEpisodes =
  (id: number): AppThunk<Promise<ServiceResponse<EpisodeModel[], any>>> =>
  async (dispatch) => {
    return dispatch(
      ServiceHelper.makeServiceRequest(async () => {
        const apiResponse = await dispatch(TvMazeAPI.getEpisodes(id))

        return ServiceHelper.processApiResponse(
          apiResponse,
          (responseData) => responseData!,
          (responseData) => GenericErrorMapper.fromBaseErrorResponse(responseData!),
        )
      }),
    )
  }

const getFavouriteList =
  (): AppThunk<Promise<ServiceResponse<SerieModel[], void>>> => async (_dispatch) => {
    const value = await AsyncStorage.getFavouriteList()

    if (!_.isNil(value) && !_.isNaN(value)) {
      return { ok: true, problem: null, data: value }
    } else {
      return { ok: false, problem: 'SERVICE_ERROR', data: undefined }
    }
  }

const setFavouriteList =
  (value: SerieModel[]): AppThunk<Promise<ServiceResponse<void, void>>> =>
  async (_dispatch) => {
    const result = await AsyncStorage.setFavouriteList(value)
    return { ok: true, problem: null, data: result }
  }

const SeriesService = {
  fetchSeries,
  searchSeries,
  getSerieById,
  getEpisodes,
  getFavouriteList,
  setFavouriteList,
}

export default SeriesService
