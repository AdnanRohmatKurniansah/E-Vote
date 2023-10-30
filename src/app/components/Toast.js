import { toast } from "react-toastify"

export const alert = (message, type) => {
    toast[type](message, {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }