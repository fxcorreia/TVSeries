import { AppDispatch } from '@data/redux/ReduxTypes'
import { useDispatch } from 'react-redux'

const useAppDispatch = () => useDispatch<AppDispatch>()

export default useAppDispatch
