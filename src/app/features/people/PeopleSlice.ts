import AppSlice from '@app/features/app/AppSlice'
import { PeopleCastCreditsModel } from '@data/model/people/PeopleCastCreditsModel'
import { PeopleModel } from '@data/model/people/PeopleModel'
import { AppCreateAsyncThunkConfig } from '@data/redux/ReduxTypes'
import PeopleService from '@data/service/people/PeopleService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const SLICE_NAME = 'series'

type PeopleSliceState = {
  searchedPeople: PeopleModel[] | []
  peopleCastCredits: PeopleCastCreditsModel | null
}

const initialState: PeopleSliceState = {
  searchedPeople: [],
  peopleCastCredits: null,
}

const getPeople = createAsyncThunk<PeopleModel[], string, AppCreateAsyncThunkConfig>(
  `${SLICE_NAME}/getPeople`,
  async (args, ThunkAPI) => {
    ThunkAPI.dispatch(AppSlice.actions.addLoadingState({ stateId: 'work' }))

    const data = await ThunkAPI.dispatch(PeopleService.getPeople(args))

    ThunkAPI.dispatch(AppSlice.actions.removeLoadingState('work'))
    if (data.ok) {
      ThunkAPI.dispatch(PeopleSlice.actions.setSearchedPeopleList(data.data))
      return data.data
    } else {
      return ThunkAPI.rejectWithValue(null)
    }
  },
)

const getPeopleCastCredits = createAsyncThunk<
  PeopleCastCreditsModel,
  number,
  AppCreateAsyncThunkConfig
>(`${SLICE_NAME}/getPeopleCastCredits`, async (args, ThunkAPI) => {
  ThunkAPI.dispatch(AppSlice.actions.addLoadingState({ stateId: 'work' }))

  const data = await ThunkAPI.dispatch(PeopleService.getPeopleCastCredits(args))

  ThunkAPI.dispatch(AppSlice.actions.removeLoadingState('work'))
  if (data.ok) {
    ThunkAPI.dispatch(PeopleSlice.actions.setPeople(data.data))
    return data.data
  } else {
    return ThunkAPI.rejectWithValue(null)
  }
})

const PeopleSliceThunks = {
  getPeople,
  getPeopleCastCredits,
}

const PeopleSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setSearchedPeopleList: (state, action: PayloadAction<PeopleModel[]>) => {
      state.searchedPeople = action.payload
    },
    setPeople: (state, action: PayloadAction<PeopleCastCreditsModel | null>) => {
      state.peopleCastCredits = action.payload
    },
    clearSearchedPeopleList: (state) => {
      state.searchedPeople = []
    },
  },
})

export { PeopleSliceThunks }

export default PeopleSlice
