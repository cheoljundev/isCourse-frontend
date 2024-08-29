import {useCallback, useReducer} from "react";

const SET_FIELD = 'SET_FIELD';
const SET_FIELD_ONE = 'SET_FIELD_ONE';
const SET_FIELDS = 'SET_FIELDS';
const RESET_FIELDS = 'RESET_FIELDS';
const RESET_ARRAY_FIELDS = 'RESET_ARRAY_FIELDS';

function formReducer(state, action) {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case SET_FIELD_ONE:
      return {
        ...state,
        [action.field]: action.value,
      };
    case SET_FIELDS:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_FIELDS:
      return {
        ...state,
        ...action.payload,
      }
    case RESET_ARRAY_FIELDS:
      return action.payload.fields.reduce((acc, field) => {
        acc[field] = action.payload.initialState[field];
        return acc;
      }, { ...state });
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

  const handleFieldNumber = useCallback(event => {
    dispatch({
      type: SET_FIELD,
      field: event.target.name,
      value: Number(event.target.value.replace(/[^0-9]/g, '')),
    });
  }, []);

  const setField = useCallback((field, value) => {
    dispatch({
      type: SET_FIELD_ONE,
      field,
      value,
    });
  });

  const setFields = useCallback((newFields) => {
    dispatch({
      type: SET_FIELDS,
      payload: newFields,
    });
  }, []);

  const resetFields = useCallback(() => {
    dispatch({
      type: SET_FIELDS,
      payload: initialState,
    });
  }, [initialState]);

  const resetArrayFields = useCallback((fields) => {
    dispatch({
      type: RESET_ARRAY_FIELDS,
      payload: {
        fields,
        initialState,
      },
    });
  }, [initialState]);

  return {fields, handleFieldChange, handleFieldNumber, setField, setFields, resetFields, resetArrayFields};
}

export default useField;