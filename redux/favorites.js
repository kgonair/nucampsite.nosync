import * as ActionTypes from "./ActionTypes";

export const favorites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      if (state.includes(action.payload)) {
        return state;
      }
      return state.concat(action.payload);

    case ActionTypes.DELETE_FAVORITE:

    /*/ create a new array from the favorite state by 
    filtering through every campsite that does not 
    match the campsite ID in the action payload 
    This effectively creates a new array that no longer contains deleted campsite ID,
    we can return this as a new state.
    */
      return state.filter((favorite) => favorite !== action.payload);

    default:
      return state;
  }
};
