import ReduxStore from '@data/redux/ReduxStore'
import { RootState } from '@data/redux/RootReducer'
import { Action, Dispatch, ThunkAction } from '@reduxjs/toolkit'

export type AppReduxStore = typeof ReduxStore

export type AppDispatch = typeof ReduxStore.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

// Extracted from node_modules/@reduxjs/toolkit/dist/createAsyncThunk.d.ts
type AsyncThunkConfig = {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}

export interface AppCreateAsyncThunkConfig extends AsyncThunkConfig {
  state: RootState
  dispatch: AppDispatch
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEDED = 'SUCCEDED',
  FAILED = 'FAILED',
}
