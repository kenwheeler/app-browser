import { AsyncStorage } from 'react-native';
const UPDATE_URL = 'app/UPDATE_URL';
const UPDATE_LOCATION = 'app/UPDATE_LOCATION';
const UPDATE_HISTORY = 'app/UPDATE_HISTORY';
const BOOTSTRAP_HISTORY = 'app/BOOTSTRAP_HISTORY';
const UPDATE_BACKFORWARD = 'app/UPDATE_BACKFORWARD';

let history = [];

const initialState = {
  url: 'https://www.google.com',
  location: 'https://www.google.com',
  history,
  canGoBack: false,
  canGoForward: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_URL:
      return {
        ...state,
        url: action.data,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.data,
      };
    case BOOTSTRAP_HISTORY:
      return {
        ...state,
        history: action.data,
      };
    case UPDATE_HISTORY:
      let newHistory = [action.data, ...state.history];

      try {
        AsyncStorage.setItem('@AppBrowser:history', JSON.stringify(newHistory));
      } catch (e) {
        console.log(e);
      }

      return {
        ...state,
        history: newHistory,
      };
    case UPDATE_BACKFORWARD:
      return {
        ...state,
        canGoBack: action.data.canGoBack,
        canGoForward: action.data.canGoForward,
      };
    default:
      return state;
  }
}

export function updateURL(url) {
  return {
    type: UPDATE_URL,
    data: url,
  };
}

export function updateLocation(url) {
  return {
    type: UPDATE_LOCATION,
    data: url,
  };
}

export function updateHistory(data) {
  return {
    type: UPDATE_HISTORY,
    data,
  };
}

export function bootstrapHistory(history) {
  return {
    type: BOOTSTRAP_HISTORY,
    data: history,
  };
}

export function updateBackForward(data) {
  return {
    type: UPDATE_BACKFORWARD,
    data,
  };
}
