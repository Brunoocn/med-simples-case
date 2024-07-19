import { toast } from "react-toastify";

interface CustomToastProps {
  message: string;
  type: "success" | "error";
}

const customToast = ({ message, type }: CustomToastProps) => {
  return toast[type](message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { customToast };
