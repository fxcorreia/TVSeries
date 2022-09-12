import { AppDispatch, AppThunk } from '@data/redux/ReduxTypes'
import { ServiceResponse } from '@data/service/common/ServiceResponse'
import { ApiResponse } from 'apisauce'
import _ from 'lodash'

const makeServiceRequest =
  <T, U>(
    service: () => Promise<ServiceResponse<T, U>>,
    authRefreshHandler?: (
      service: () => Promise<ServiceResponse<T, U>>,
    ) => AppThunk<Promise<ServiceResponse<T, U>>>,
  ): AppThunk<Promise<ServiceResponse<T, U>>> =>
  async (dispatch: AppDispatch) => {
    if (!_.isNil(authRefreshHandler)) {
      return dispatch(authRefreshHandler(service))
    } else {
      return dispatch(service)
    }
  }

const processApiResponse = <ApiSuccessT, ApiErrorT, ServiceSuccessT, ServiceErrorT>(
  apiResponse: ApiResponse<ApiSuccessT, ApiErrorT>,
  successDataMapper: (data: ApiSuccessT | undefined) => ServiceSuccessT,
  errorDataMapper: (data: ApiErrorT | undefined) => ServiceErrorT,
): ServiceResponse<ServiceSuccessT, ServiceErrorT> => {
  let serviceResponse: ServiceResponse<ServiceSuccessT, ServiceErrorT>

  if (apiResponse.ok) {
    const newData = successDataMapper(apiResponse.data)

    serviceResponse = {
      ok: apiResponse.ok,
      problem: apiResponse.problem,
      data: newData,
      headers: apiResponse.headers,
      status: apiResponse.status,
    }
  } else {
    const newData = errorDataMapper(apiResponse.data)

    serviceResponse = {
      ok: apiResponse.ok,
      problem: apiResponse.problem,
      data: newData,
      headers: apiResponse.headers,
      status: apiResponse.status,
    }
  }

  return serviceResponse
}

const ServiceHelper = {
  makeServiceRequest,
  processApiResponse,
}

export default ServiceHelper
