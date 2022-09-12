import { HEADERS, PROBLEM_CODE } from 'apisauce'

interface ServiceErrorResponse<T> {
  ok: false
  problem: PROBLEM_CODE | 'AUTH_ERROR' | 'SERVICE_ERROR'
  data: T
  headers?: HEADERS
  status?: number
}

interface ServiceSuccessResponse<T> {
  ok: true
  problem: null
  data: T
  headers?: HEADERS
  status?: number
}

export type ServiceResponse<T, U = T> = ServiceErrorResponse<U> | ServiceSuccessResponse<T>
