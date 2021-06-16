// @flow
import React from "react";

import "./styles.scss";

type ImageCardProps = {
  image: String,
  onClick: Function,
};

function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div className="photo-card" onClick={onClick}>
      <img src={image} alt="cardPicture" />
    </div>
  );
}

export default ImageCard;
