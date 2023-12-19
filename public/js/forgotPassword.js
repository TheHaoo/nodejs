import { showAlert } from './alerts.js'
import { instance } from './instance.js'

export const forgotPassword = async (email) => {
  try {
    const res = await instance({
      method: 'POST',
      url: 'api/v1/users/forgotPassword',
      data: {
        email
      }
    })

    console.log(res.data)

    if (res.data.status === 'success') {
      showAlert('success', 'Email sent successfully!')
      window.setTimeout(() => {
        location.assign('/wait-confirm')
      }, 500)
    }
  } catch (err) {
    showAlert('error', 'Can not find this email!')
  }
}