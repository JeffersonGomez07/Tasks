import 'axios'

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    skipGlobalErrorHandler?: boolean
  }
}