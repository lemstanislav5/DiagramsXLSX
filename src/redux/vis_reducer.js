/* eslint-disable no-restricted-properties */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
//enableVisNetwork
const ENABLE_VIS_NETWORK = 'ENABLE_VIS_NETWORK';
const SET_NETWORK = 'SET_NETWORK';
const SET_ID_SELECT_NODE = 'SET_ID_SELECT_NODE';
const DELETE_POINT_FOR_ID = 'DELETE_POINT_FOR_ID';

export const initialState = {
  enableVisNetwork: false,
  networkLink: {body:{nodes:{}}},
  idSelectNode: [undefined, undefined],
};

export const actionEnableVisNetwork = (bool) => {
  return { type: ENABLE_VIS_NETWORK, bool };
};
export const actionCreatorNetworkLink = (network) => {
  return { type: SET_NETWORK, network };
};
export const actionCreatorIdSelectNode = (id) => {
  return { type: SET_ID_SELECT_NODE, id };
};
export const actionCreatorDeletePointForId = (id) => {
  return { type: DELETE_POINT_FOR_ID, id };
};

//!networkLink.clustering.body.nodes

export const visReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_VIS_NETWORK: {
      return { ...state, enableVisNetwork: action.bool };
    }
    case SET_NETWORK: {
      return { ...state, networkLink: action.network };
    }
    case SET_ID_SELECT_NODE: {
      if(action.id !== state.idSelectNode[0]){
        return { ...state, idSelectNode: [action.id, state.idSelectNode[0]] };
      } else {
        return state;
      }
    }
    case  DELETE_POINT_FOR_ID: {
      return { ...state, points: state.points.filter(item => {
        if(item.id !== action.id) return item;
      }) };
    }
    default: {
      return state;
    }
  }
};
