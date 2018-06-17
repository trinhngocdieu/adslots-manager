import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import adslots from "./adslots";

export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer.plugin({
    "adslot_edit": (state, action) => {
      switch(action.type) {
        case "@@router/LOCATION_CHANGE":
          return undefined;
        default:
          return state;
      }
    }
  }),
  adslots: adslots,
});
