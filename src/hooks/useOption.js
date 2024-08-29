import ky from "ky";
import {useCallback, useReducer} from "react";

const SET_OPTION = 'SET_OPTION';

function optionsReducer(state, action) {
  switch (action.type) {
    case 'SET_OPTION': {
      return {
        ...state,
        [action.payload.option]: action.payload.data,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

async function fetchOptions(option, parent) {
  let apiName = '';
  switch (option) {
    case 'placeTypeOptions':
      apiName = 'place-type';
      break;
    case 'largeCategoryOptions':
      apiName = 'large-category';
      break;
    case 'middleCategoryOptions':
      apiName = 'middle-category';
      break;
    case 'tagOptions':
      apiName = 'tag';
      break;
    case 'stateOptions':
      apiName = 'state';
      break;
    case 'cityOptions':
      apiName = 'city';
      break;
  }

  const data = await ky.get(`http://localhost:8080/api/manager/${apiName}?parent=${parent}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  }).json();

  return { option, data };
};

function useOption(initialState) {
  const [options, dispatch] = useReducer(optionsReducer, initialState);

  const setOption = useCallback(async (option, parent) => {
    try {
      const { option : fetchedOption, data } = await fetchOptions(option, parent);
      dispatch({
        type: 'SET_OPTION',
        payload: {
          option : fetchedOption,
          data,
        },
      });
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  }, []);

  return {
    options,
    setOption,
  };
}

export default useOption;