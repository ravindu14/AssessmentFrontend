// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type FavoriteImage = {
  id: String,
  message: String,
  picture: String,
  pictureSmall: String,
  pictureMedium: String,
  pictureStored: String,
  timestamp: String,
};

export type FavoriteImageList = Array<FavoriteImage>;
