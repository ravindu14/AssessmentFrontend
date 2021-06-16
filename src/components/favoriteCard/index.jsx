// @flow
import React from "react";

import "./styles.scss";

type FavoriteCardProps = {
  image: String,
  onClick: Function,
  index: number,
};

function FavoriteCard({ image, onClick, index }: FavoriteCardProps) {
  const getPhotoIndex = (index) => {
    switch (index) {
      case 0:
        return "ONE";
      case 1:
        return "TWO";
      case 2:
        return "THREE";
      case 3:
        return "FOUR";
      case 4:
        return "FIVE";
      case 5:
        return "SIX";
      case 6:
        return "SEVEN";
      case 7:
        return "EIGHT";
      case 8:
        return "NINE";
      default:
        return "NONE";
    }
  };

  return (
    <div className="image-card" onClick={onClick}>
      <div className="image-card-title">{getPhotoIndex(index)}</div>
      <img src={image} alt="cardPicture" />
    </div>
  );
}

export default FavoriteCard;
