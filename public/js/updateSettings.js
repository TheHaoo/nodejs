import { showAlert } from "./alerts"
import { instance } from "./instance"

// Type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url = 
      type === 'Password'
        ? 'api/v1/users/updateMyPassword'
        : 'api/v1/users/updateMe'

    const res = await instance({
      method: 'PATCH',
      url,
      data
    })

    if (res.data.status === 'success') {
      showAlert('success', `${type} updated successfully!`)
      window.setTimeout(() => location.assign('/'), 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message)
  }
}