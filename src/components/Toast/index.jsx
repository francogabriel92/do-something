import { ToastContainer } from 'react-toastify';

const Toast = () => {
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    theme: 'dark',
  };

  return <ToastContainer {...toastOptions} />;
};

export default Toast;
