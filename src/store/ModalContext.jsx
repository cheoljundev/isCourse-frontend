import {createContext, useContext, useRef, useState} from "react";

const ModalContext = createContext(
  {
    loginModal: null,
    courseConfirmModal: null,
    isShowLoginModal: false,
    setIsShowLoginModal: () => {}
  }
);

export function ModalProvider({children}) {
  const loginModal = useRef();
  const courseConfirmModal = useRef();
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  return <ModalContext.Provider value={{loginModal, courseConfirmModal, isShowLoginModal, setIsShowLoginModal}}>
    {children}
  </ModalContext.Provider>;
}

export function useModal() {
  return useContext(ModalContext);
}