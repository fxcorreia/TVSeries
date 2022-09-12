import AppSlice from '@app/features/app/AppSlice'
import { EpisodeModel } from '@data/model/series/EpisodeModel'
import { SearchSeriesModel } from '@data/model/series/SearchSeriesModel'
import { SerieModel } from '@data/model/series/SerieModel'
import { AppCreateAsyncThunkConfig } from '@data/redux/ReduxTypes'
import SeriesService from '@data/service/series/SeriesService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const SLICE_NAME = 'series'

type SeriesSliceState = {
  seriesList: SerieModel[] | []
  searchedSeries: SearchSeriesModel[] | []
  episodesList: EpisodeModel[] | []
  favouriteList: SerieModel[]
}

const initialState: SeriesSliceState = {
  seriesList: [],
  searchedSeries: [],
  episodesList: [],
  favouriteList: [],
}

const fetchSeries = createAsyncThunk<SerieModel[], number, AppCreateAsyncThunkConfig>(
  `${SLICE_NAME}/fetchSeries`,
  async (args, ThunkAPI) => {
    ThunkAPI.dispatch(AppSlice.actions.addLoadingState({ stateId: 'work' }))

    const data = await ThunkAPI.dispatch(SeriesService.fetchSeries(args))

    ThunkAPI.dispatch(AppSlice.actions.removeLoadingState('work'))
    if (data.ok) {
      ThunkAPI.dispatch(SeriesSlice.actions.setSeriesList(data.data))
      return data.data
    } else {
      return ThunkAPI.rejectWithValue(null)
    }
  },
)

const searchSeries = createAsyncThunk<SearchSeriesModel[], string, AppCreateAsyncThunkConfig>(
  `${SLICE_NAME}/searchSeries`,
  async (args, ThunkAPI) => {
    ThunkAPI.dispatch(AppSlice.actions.addLoadingState({ stateId: 'work' }))

    const data = await ThunkAPI.dispatch(SeriesService.searchSeries(args))

    ThunkAPI.dispatch(AppSlice.actions.removeLoadingState('work'))
    if (data.ok) {
      ThunkAPI.dispatch(SeriesSlice.actions.setSearchedSeriesList(data.data))
      return data.data
    } else {
      return ThunkAPI.rejectWithValue(null)
    }
  },
)

const getEpisodes = createAsyncThunk<EpisodeModel[], number, AppCreateAsyncThunkConfig>(
  `${SLICE_NAME}/getEpisodes`,
  async (args, ThunkAPI) => {
    ThunkAPI.dispatch(AppSlice.actions.addLoadingState({ stateId: 'work' }))

    const data = await ThunkAPI.dispatch(SeriesService.getEpisodes(args))

    ThunkAPI.dispatch(AppSlice.actions.removeLoadingState('work'))
    if (data.ok) {
      ThunkAPI.dispatch(SeriesSlice.actions.setEpisodesList(data.data))
      return data.data
    } else {
      return ThunkAPI.rejectWithValue(null)
    }
  },
)

const getFavouriteList = createAsyncThunk<any, void, AppCreateAsyncThunkConfig>(
  `${SLICE_NAME}/initializeMediasList`,
  async (args, ThunkAPI) => {
    const data = await ThunkAPI.dispatch(SeriesService.getFavouriteList())
    if (data.ok) {
      ThunkAPI.dispatch(SeriesSlice.actions.setFavouriteList(data.data))
      return data.data
    } else {
      return ThunkAPI.rejectWithValue(null)
    }
  },
)

const setFavouriteList = createAsyncThunk<any, SerieModel[], AppCreateAsyncThunkConfig>(
  `${SLICE_NAME}/initializeMediasList`,
  async (args, ThunkAPI) => {
    const data = await ThunkAPI.dispatch(SeriesService.setFavouriteList(args))
    if (data.ok) {
      return true
    } else {
      return ThunkAPI.rejectWithValue(null)
    }
  },
)

const SeriesSliceThunks = {
  fetchSeries,
  searchSeries,
  getEpisodes,
  getFavouriteList,
  setFavouriteList,
}

const SeriesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearLoadingStates: (state) => {
      state.seriesList = []
    },
    setSeriesList: (state, action: PayloadAction<SerieModel[]>) => {
      state.seriesList = action.payload
    },
    setSearchedSeriesList: (state, action: PayloadAction<SearchSeriesModel[]>) => {
      state.searchedSeries = action.payload
    },
    clearSearchedSeries: (state) => {
      state.searchedSeries = []
    },
    setEpisodesList: (state, action: PayloadAction<EpisodeModel[]>) => {
      state.episodesList = action.payload
    },
    setFavouriteList: (state, action: PayloadAction<any>) => {
      state.favouriteList = action.payload
    },
  },
})

export { SeriesSliceThunks }

export default SeriesSlice
