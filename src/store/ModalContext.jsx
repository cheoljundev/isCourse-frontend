import {createContext, useContext, useRef, useState} from "react";

const ModalContext = createContext(
  {
    loginModal: null,
    messageModal: null,
    message: {
      title: "",
      message: "",
      error : false,
    },
    setMessage: () => {},
    isShowLoginModal: false,
    setIsShowLoginModal: () => {},
  }
);

export function ModalProvider({children}) {
  const loginModal = useRef();
  const messageModal = useRef();
  const [message, setMessage] = useState({
    title: "",
    message: "",
    error: false,
  });
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  return <ModalContext.Provider value={{
    isShowLoginModal,
    loginModal,
    message,
    messageModal,
    setIsShowLoginModal,
    setMessage
  }}>
    {children}
  </ModalContext.Provider>;
}

export function useModal() {
  return useContext(ModalContext);
}