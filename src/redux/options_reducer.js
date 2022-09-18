// import {InferActionsTypes} from './redux-store';
const SET_DIR_NAME = 'SET_DIR_NAME';
const SET_OPTION = 'SET_OPTION';
export const initialState = {
  from: '2014-04-20',
  to: '2022-02-10',
  firstNumber: undefined,
  secondNumber: undefined, 
  time: undefined,
  physics: true,
  searchDepth: 1,
  numberOfCharacters: 11,
  nodeLines: 1
};

export const actionCreatorSetDir = (name) => {
  return { type: SET_DIR_NAME, dirName: name };
};

export const actionCreatorSetOption= (name, value) => {
  return { type: SET_OPTION, name, value };
};

export const optionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIR_NAME: {
      return { ...state, readingFiles: { dirName: action.dirName } };
    }
    case SET_OPTION: {
      return { ...state, [action.name]: action.value };
    }
    default: {
      return state;
    }
  }
};
