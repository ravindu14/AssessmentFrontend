// @flow
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { type FavoriteImageList } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Header from "components/header";
import FavoriteCard from "components/favoriteCard";
import ImageCard from "components/imageCard";
import Modal from "components/Modal";
import uploadedImages from "constants/uploadedImages";
import placeHolder from "assets/placeholder.jpeg";
import Alert from "components/Alert";
import Loader from "components/loader";

import { arrangeFavorites, getFavorites } from "action/gallery";
import { ASYNC_STATUS } from "constants/async";

import "./styles.scss";

type GalleryPageProps = {
  userId: String,
  favorites: FavoriteImageList,
  profilePicture: String,
  userName: String,
  userEmail: String,
  arrangeFavorites: Function,
  status: AsyncStatusType,
  notification: NotificationType,
  getFavorites: Function,
};

const GalleryPage = (props: GalleryPageProps) => {
  const {
    userId,
    favorites,
    profilePicture,
    userName,
    userEmail,
    arrangeFavorites,
    status,
    notification,
    getFavorites,
  } = props;

  const [showModal, setOrderModal] = useState(false);
  const [selectedImage, selectImage] = useState(null);
  const [prevOrder, selectPrevFavorite] = useState(null);

  useEffect(() => {
    getFavorites(userId);
    // eslint-disable-next-line
  }, []);

  /**
   * update existing favorite images with new selected image and call update function
   * @param {number} order
   */
  const selectFavorites = (order) => {
    const updatedFavorites = favorites.map((favorite, index) => {
      return index === order ? selectedImage : favorite;
    });

    arrangeFavorites({
      id: userId,
      favorites: updatedFavorites,
    });
    setOrderModal(!showModal);
    selectImage(null);
  };

  /**
   * swipe the places of favorite images
   * @param {number} order
   */
  const reSelectFavorites = (order) => {
    const updatedFavorites = favorites.map((favorite, index) => {
      return index === order
        ? selectedImage
        : index === prevOrder
        ? null
        : favorite;
    });

    arrangeFavorites({
      id: userId,
      favorites: updatedFavorites,
    });
    setOrderModal(!showModal);
    selectImage(null);
    selectPrevFavorite(null);
  };

  /**
   * remove images from favorites
   */
  const removeFavorites = () => {
    const updatedFavorites = favorites.map((favorite, index) => {
      return index === prevOrder ? null : favorite;
    });

    arrangeFavorites({
      id: userId,
      favorites: updatedFavorites,
    });
    setOrderModal(!showModal);
    selectImage(null);
    selectPrevFavorite(null);
  };

  /**
   * onSelect images from collection
   *
   */
  const onSelectImage = (image) => {
    selectImage(image);
    setOrderModal(!showModal);
  };

  /**
   * onSelect images from favorites
   *
   */
  const onSelectFavorite = (image, order) => {
    selectImage(image);
    selectPrevFavorite(order);
    setOrderModal(!showModal);
  };

  //use to create selection numbers in the modal
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="gallery">
      <Header
        profilePicture={profilePicture}
        userName={userName}
        userEmail={userEmail}
      />
      {notification && (
        <Alert type={notification.type}>{notification.message}</Alert>
      )}
      <div className="gallery-section">
        <div className="gallery-section-title">Favorites</div>
        {status === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
          <div className="gallery-section-images">
            {favorites.map((favorite, index) => {
              return (
                <FavoriteCard
                  key={index}
                  image={favorite ? favorite.picture : placeHolder}
                  index={index}
                  onClick={() => onSelectFavorite(favorite, index)}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="gallery-section">
        <div className="gallery-section-title">Your Collection</div>
        <div className="gallery-section-photos">
          {uploadedImages.map((image) => {
            return (
              <ImageCard
                key={image.id}
                image={image.picture}
                onClick={() => onSelectImage(image)}
              />
            );
          })}
        </div>
      </div>
      <Modal showModal={showModal}>
        <div className="ordering">
          <div className="ordering-header">Select favorite place</div>
          <div className="ordering-container">
            {options.map((option) => {
              return (
                <button
                  key={option}
                  className="ordering-container-option"
                  onClick={
                    prevOrder
                      ? () => reSelectFavorites(option - 1)
                      : () => selectFavorites(option - 1)
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>
          {prevOrder !== null && (
            <div className="ordering-remove">
              <button onClick={removeFavorites}>Remove from favorites</button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ gallery }) => {
  return {
    status: gallery.status,
    notification: gallery.notification,
    userId: gallery.userId,
    favorites: gallery.favorites,
    profilePicture: gallery.profilePicture,
    userName: gallery.userName,
    userEmail: gallery.userEmail,
  };
};

const Actions = { arrangeFavorites, getFavorites };

export default connect(mapStateToProps, Actions)(GalleryPage);
