export interface IApiData {
  url: string
  body: any
  response: {
    error?: string
    data?: any
  }
}
