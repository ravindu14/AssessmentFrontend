// @flow
import {
  type Action,
  type FavoriteImageList,
} from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";
import {
  ASYNC_AUTH_INIT,
  HANDLE_NOTIFICATION,
  UPDATE_FAVORITES,
} from "actionTypes/gallery";

export type GalleryStateType = {
  status: AsyncStatusType,
  notification: NotificationType,
  useId: String,
  profilePicture: String,
  userName: String,
  userEmail: String,
  favorites: FavoriteImageList,
};

const initialState: GalleryStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  userId: 2270,
  favorites: [null, null, null, null, null, null, null, null, null],
  profilePicture: "https://placeimg.com/640/640/people",
  userName: "John Doe",
  userEmail: "help@pastbook.com",
};

function asyncAuthInit(state: GalleryStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function handleNotification(
  state: GalleryStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

function updatedFavorites(state: GalleryStateType, payload) {
  return {
    ...state,
    favorites: payload,
  };
}

const reducer = (
  state: GalleryStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case ASYNC_AUTH_INIT:
      return asyncAuthInit(state);
    case HANDLE_NOTIFICATION:
      return handleNotification(state, payload);
    case UPDATE_FAVORITES:
      return updatedFavorites(state, payload);
    default:
      return state;
  }
};

export default reducer;
