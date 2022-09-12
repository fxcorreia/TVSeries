import GenericErrorModel from '@data/model/common/GenericErrorModel'

const GenericErrorMapper = {
  fromBaseErrorResponse: (data: any): GenericErrorModel => {
    return data
  },
}

export default GenericErrorMapper
