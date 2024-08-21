export const SET_MESSAGE = "modal/SET_MESSAGE";
export const SET_IS_SHOW_LOGIN_MODAL = "modal/SET_IS_SHOW_LOGIN_MODAL";

export const setMessage = (message) => {
  return { type: SET_MESSAGE, payload: { message } };
}

export const setIsShowLoginModal = (isShowLoginModal) => {
  return {type: SET_IS_SHOW_LOGIN_MODAL, payload: {isShowLoginModal}};
}

const initState = {
  message: {
    title: "",
    message: "",
    isError : false,
    isShow : false,
  },
  isShowLoginModal: false,
}

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          ...action.payload.message,
        },
      };
    case SET_IS_SHOW_LOGIN_MODAL:
      return {
        ...state,
        isShowLoginModal: action.payload.isShowLoginModal,
      };
    default:
      return state;
  }
};

export default modalReducer;