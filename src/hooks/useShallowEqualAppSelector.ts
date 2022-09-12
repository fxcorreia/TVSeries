import { RootState } from '@data/redux/RootReducer'
import useAppSelector from '@hooks/useAppSelector'
import { shallowEqual } from 'react-redux'

const useShallowEqualAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
): TSelected => {
  return useAppSelector(selector, shallowEqual)
}

export default useShallowEqualAppSelector
