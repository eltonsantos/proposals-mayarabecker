import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenErrors'

export function setupAPIClient(ctx = undefined) {
  const isProduction = process.env.NODE_ENV === 'production';
  
  const baseURL = isProduction
    ? 'https://proposals-mayarabecker-new-backend.vercel.app'
    : 'http://localhost:3333';

  console.log(isProduction)
  
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${cookies['@proposalsmayarabecker.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if (error.response.status === 401) {
      if (typeof window !== undefined) {
        // signOut()
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error)
  })

  return api

}