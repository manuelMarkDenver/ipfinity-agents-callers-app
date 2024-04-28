import { toast as showToast } from "react-toastify";

export const useToast = () => {
  const showToastMessage = (
    message,
    type = "success",
    position = "bottom-right"
  ) => {
    switch (type) {
      case "success":
        showToast.success(message, { position });
        break;
      case "info":
        showToast.info(message, { position });
        break;
      case "warning":
        showToast.warning(message, { position });
        break;
      case "error":
        showToast.error(message, { position });
        break;
      default:
        showToast(message, { position });
        break;
    }
  };

  return { showToastMessage };
};
