// @flow
import React from "react";

import Row from "components/Row";
import Col from "components/Col";

import "./styles.scss";

type HeaderProps = {
  profilePicture: String,
  userName: String,
  userEmail: String,
};

const Header = ({ profilePicture, userEmail, userName }: HeaderProps) => {
  return (
    <div className="header">
      <Row>
        <Col size="4">
          <div className="header-profile">
            <img src={profilePicture} alt="profilePic" />
            <div className="header-profile-contact">
              <div className="header-profile-contact-name">{userName}</div>
              <div className="header-profile-contact-email">{userEmail}</div>
            </div>
          </div>
        </Col>
        <Col size="4">
          <div className="header-title">Image Gallery</div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
