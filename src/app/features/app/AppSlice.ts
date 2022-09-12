import { LoadingState } from '@data/redux/ReduxTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const SLICE_NAME = 'app'

type AddLoadingStatePayload = {
  stateId: string
}

type AppSliceState = {
  loadingStates: {
    [loadingStateId: string]: LoadingState | undefined
  }
}

const initialState: AppSliceState = {
  loadingStates: {},
}

const AppSliceThunks = {}

const AppSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addLoadingState: (state, action: PayloadAction<AddLoadingStatePayload>) => {
      state.loadingStates[action.payload.stateId] = LoadingState.LOADING
    },
    removeLoadingState: (state, action: PayloadAction<string>) => {
      state.loadingStates[action.payload] = undefined
    },
    clearLoadingStates: (state) => {
      state.loadingStates = {}
    },
  },
})

export { AppSliceThunks }

export default AppSlice
