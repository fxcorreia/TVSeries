import AppSlice from '@app/features/app/AppSlice'
import PeopleSlice from '@app/features/people/PeopleSlice'
import SeriesSlice from '@app/features/series/SeriesSlice'
import { combineReducers } from '@reduxjs/toolkit'

const RootReducer = combineReducers({
  app: AppSlice.reducer,
  series: SeriesSlice.reducer,
  people: PeopleSlice.reducer,
})

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer
