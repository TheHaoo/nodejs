/* eslint-disable*/
import { showAlert } from "./alerts"
import { instance } from './instance.js'

export const login = async (email, password) => {
  try {
    const res = await instance({
      method: 'POST',
      url: 'api/v1/users/login',
      data: {
        email,
        password
      }
    })

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!')
      window.setTimeout(() => {
        location.assign('/')
      }, 1000)
    }

  } catch (err) {
    showAlert('error', err.response.data.message)
  }  
}

export const logout = async () => {
  try {
    const res = await instance({
      method: 'GET',
      url: 'api/v1/users/logout'
    })
    // if (res.data.status = 'success') location.reload(true)
    if (res.data.status = 'success') 
      window.setTimeout(() => {
        location.assign('/')
      }, 1000)
  } catch (err) {
    showAlert('error', 'Error logging out! Try again')
  }
}