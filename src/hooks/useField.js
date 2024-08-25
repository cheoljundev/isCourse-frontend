import {useCallback, useReducer} from "react";

const SET_FIELD = 'SET_FIELD';
const RESET_FIELDS = 'RESET_FIELDS';

function formReducer(state, action) {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case RESET_FIELDS:
      return action.initialState; // 필드를 초기 상태로 리셋
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useField(initialState) {
  const [fields, dispatch] = useReducer(formReducer, initialState);

  const handleFieldChange = useCallback(event => {
    dispatch({
      type: SET_FIELD,
      field: event.target.name,
      value: event.target.value,
    });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({
      type: RESET_FIELDS,
      initialState,
    });
  }, [initialState]);

  return [fields, handleFieldChange, handleReset];
}

export default useField;