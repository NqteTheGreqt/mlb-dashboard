import { legacy_createStore as createStore } from "redux";
import authReducer from "./reducers/authReducer";

function configureStore() {
  return createStore(authReducer);
}

export default configureStore;