// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import gallery, { type GalleryStateType } from "reducers/gallery";

export type ApplicationState = {
  gallery: GalleryStateType,
};

const reducers = (history: History) =>
  combineReducers({
    gallery,
    router: connectRouter(history),
  });

export default reducers;
