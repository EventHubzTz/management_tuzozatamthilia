import { combineReducers } from "redux";
import SettingsReducer from "./settings-reducers";
import FormInformationReducer from "./form-dialog";

const reducers = combineReducers({
    SettingsReducer,
    FormInformationReducer,
});

export default reducers;