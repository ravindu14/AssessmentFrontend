// @flow
import {
  ASYNC_AUTH_INIT,
  HANDLE_NOTIFICATION,
  UPDATE_FAVORITES,
} from "actionTypes/gallery";
import Alert from "components/Alert";
import { GalleryService } from "services/gallery";

function asyncAuthInit() {
  return {
    type: ASYNC_AUTH_INIT,
  };
}

function notificationHandler(isSuccess, message) {
  return {
    type: HANDLE_NOTIFICATION,
    payload: {
      isSuccess,
      notification: {
        type: isSuccess ? Alert.TYPE.SUCCESS : Alert.TYPE.ERROR,
        message,
      },
    },
  };
}

/**
 * re-arrange favorite images of a selected user
 * @param {object} payload
 * @returns
 */
export function arrangeFavorites(payload: Object) {
  return (dispatch) => {
    dispatch(asyncAuthInit());

    let galleryService = new GalleryService();

    galleryService
      .arrangeFavorites(payload)
      .then((response) => {
        let {
          success,
          data: { favorites },
        } = response.data;
        if (success) {
          dispatch({ type: UPDATE_FAVORITES, payload: favorites });
        }
        dispatch(
          notificationHandler(
            success,
            success
              ? "Favorites re-arranged successfully"
              : "Something went wrong. Please try again"
          )
        );
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}

/**
 * get saved favorite images from a selected user
 * @param {string} userId
 * @returns
 */
export function getFavorites(userId: String) {
  return (dispatch) => {
    dispatch(asyncAuthInit());

    let galleryService = new GalleryService();

    galleryService
      .getFavorites(userId)
      .then((response) => {
        let {
          success,
          data: { favorites },
        } = response.data;
        if (success) {
          dispatch({ type: UPDATE_FAVORITES, payload: favorites });
        }
        dispatch(
          notificationHandler(
            success,
            success
              ? "Favorites fetched successfully"
              : "Something went wrong. Please try again"
          )
        );
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}
