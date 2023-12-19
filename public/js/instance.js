export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://127.0.0.1:3000/',
})