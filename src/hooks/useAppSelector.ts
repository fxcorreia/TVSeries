import { RootState } from '@data/redux/RootReducer'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
