import { ToastOptions, toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

type ToastType = "success" | "error" | "info" | "warning";

export const useToast = () => {
  function showToast(status: ToastType, message: string) {
    const options: ToastOptions<{}> = {
      autoClose: 3000,
      theme: "auto",
      type: status,
      position: "bottom-right",
      dangerouslyHTMLString: true
    }
    return toast(message, options)
  }
  return {
    showToast
  }
}
