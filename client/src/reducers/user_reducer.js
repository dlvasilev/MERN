import { FETCH_USERDATA } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USERDATA:
      return { ...state, ...action.payload };
  }

  return state;
}
