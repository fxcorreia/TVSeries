import TvMazeAPI from '@data/network/TvMazeAPI'
import RootReducer from '@data/redux/RootReducer'
import { configureStore } from '@reduxjs/toolkit'

const ReduxStore = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})

TvMazeAPI.setReduxStore(ReduxStore)

export default ReduxStore
