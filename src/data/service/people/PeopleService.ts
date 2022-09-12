import GenericErrorMapper from '@data/model/common/GenericErrorMapper'
import { PeopleCastCreditsModel } from '@data/model/people/PeopleCastCreditsModel'
import { PeopleModel } from '@data/model/people/PeopleModel'
import TvMazeAPI from '@data/network/TvMazeAPI'
import { AppThunk } from '@data/redux/ReduxTypes'
import ServiceHelper from '@data/service/common/ServiceHelper'
import { ServiceResponse } from '@data/service/common/ServiceResponse'

const getPeople =
  (name: string): AppThunk<Promise<ServiceResponse<PeopleModel[], any>>> =>
  async (dispatch) => {
    return dispatch(
      ServiceHelper.makeServiceRequest(async () => {
        const apiResponse = await dispatch(TvMazeAPI.getPeople(name))

        return ServiceHelper.processApiResponse(
          apiResponse,
          (responseData) => responseData!,
          (responseData) => GenericErrorMapper.fromBaseErrorResponse(responseData!),
        )
      }),
    )
  }

const getPeopleCastCredits =
  (id: number): AppThunk<Promise<ServiceResponse<PeopleCastCreditsModel, any>>> =>
  async (dispatch) => {
    return dispatch(
      ServiceHelper.makeServiceRequest(async () => {
        const apiResponse = await dispatch(TvMazeAPI.getPeopleCastCredits(id))

        return ServiceHelper.processApiResponse(
          apiResponse,
          (responseData) => responseData!,
          (responseData) => GenericErrorMapper.fromBaseErrorResponse(responseData!),
        )
      }),
    )
  }

const PeopleService = {
  getPeople,
  getPeopleCastCredits,
}

export default PeopleService
